import { createEmailWebhookHandler } from 'npm:@lovable.dev/email-js@0.1.0'
import { createClient } from 'npm:@supabase/supabase-js@2'

const REASON_MESSAGES: Record<string, string> = {
  bounce: 'Permanent bounce — email address is invalid or rejected',
  complaint: 'Spam complaint — recipient marked email as spam',
  unsubscribe: 'Recipient unsubscribed',
}

const REASON_STATUS: Record<string, 'bounced' | 'complained' | 'suppressed'> = {
  bounce: 'bounced',
  complaint: 'complained',
  unsubscribe: 'suppressed',
}

function serviceClient() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  return createClient(supabaseUrl, supabaseServiceKey)
}

// Notification-only bookkeeping: Lovable enforces suppression at send time.
async function record(
  reason: 'bounce' | 'complaint' | 'unsubscribe',
  event: { event_id: string; data: { recipient: string; message_id?: string } }
) {
  const supabase = serviceClient()
  const normalizedEmail = event.data.recipient.toLowerCase()

  const { error: suppressError } = await supabase
    .from('suppressed_emails')
    .upsert({ email: normalizedEmail, reason, metadata: null }, { onConflict: 'email' })

  if (suppressError) {
    console.error('Failed to upsert suppressed email', {
      event_id: event.event_id,
      code: suppressError.code,
      message: suppressError.message,
    })
    throw new Error('Failed to write suppression')
  }

  const { error: insertError } = await supabase.from('email_send_log').insert({
    message_id: event.data.message_id ?? null,
    template_name: 'system',
    recipient_email: normalizedEmail,
    status: REASON_STATUS[reason],
    error_message: REASON_MESSAGES[reason],
    metadata: null,
  })

  if (insertError) {
    console.error('Failed to write email send log', {
      event_id: event.event_id,
      code: insertError.code,
      message: insertError.message,
    })
    throw new Error('Failed to write send log')
  }
}

const handler = createEmailWebhookHandler({
  apiKey: Deno.env.get('LOVABLE_API_KEY')!,
  on: {
    'email.bounced': async (event) => {
      await record('bounce', event as any)
    },
    'email.complaint': async (event) => {
      await record('complaint', event as any)
    },
    'email.unsubscribed': async (event) => {
      await record('unsubscribe', event as any)
    },
  },
})

Deno.serve((req) => handler(req))
