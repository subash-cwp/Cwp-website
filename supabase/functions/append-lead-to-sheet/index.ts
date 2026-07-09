import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_sheets/v4';

interface LeadPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  source?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const lovableKey = Deno.env.get('LOVABLE_API_KEY');
    const connectionKey = Deno.env.get('GOOGLE_SHEETS_API_KEY');
    const spreadsheetId = Deno.env.get('LEADS_SPREADSHEET_ID');

    if (!lovableKey || !connectionKey || !spreadsheetId) {
      return new Response(
        JSON.stringify({ error: 'Google Sheets integration not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Prevent CSV/formula injection: prefix any value that Google Sheets could
    // interpret as a formula (=, +, -, @, tab, CR) with a single quote.
    const sanitizeForSheet = (value: string): string => {
      if (!value) return value;
      return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
    };

    const body = (await req.json()) as LeadPayload;
    const name = sanitizeForSheet((body.name ?? '').toString().slice(0, 200));
    const email = sanitizeForSheet((body.email ?? '').toString().slice(0, 200));
    const phone = sanitizeForSheet((body.phone ?? '').toString().slice(0, 60));
    const company = sanitizeForSheet((body.company ?? '').toString().slice(0, 200));
    const message = sanitizeForSheet((body.message ?? '').toString().slice(0, 5000));
    const source = sanitizeForSheet((body.source ?? '').toString().slice(0, 200));

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: 'name and email are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const timestamp = new Date().toISOString();
    const row = [[timestamp, name, email, company, phone, message, source]];

    const url =
      `${GATEWAY_URL}/spreadsheets/${spreadsheetId}/values/Leads!A:G:append` +
      `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const gwRes = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        'X-Connection-Api-Key': connectionKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: row }),
    });

    if (!gwRes.ok) {
      const text = await gwRes.text();
      console.error('Sheets append failed', gwRes.status, text);
      return new Response(
        JSON.stringify({ error: 'sheets_append_failed', status: gwRes.status, body: text }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('append-lead-to-sheet error', e);
    return new Response(
      JSON.stringify({ error: (e as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
