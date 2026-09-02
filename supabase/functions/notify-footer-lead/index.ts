import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'
import { notifyTeamOfLead } from '../_shared/lead-notification.ts'

const BodySchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(50).optional(),
  company: z.string().trim().max(200).optional(),
  service: z.string().trim().max(500).optional(),
  message: z.string().trim().max(5000).optional(),
  submittedAt: z.string().trim().max(100).optional(),
  idempotencyKey: z.string().trim().max(200).optional(),
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const { idempotencyKey, ...templateData } = parsed.data

  try {
    const result = await notifyTeamOfLead(
      templateData,
      idempotencyKey ||
        `footer-notification-${templateData.email.toLowerCase()}-${templateData.submittedAt ?? Date.now()}`
    )
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to send notification' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
