import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendTemplateEmail } from './transactional-email-templates/send-email.ts'

const TEMPLATE_NAME = 'enquiry-notification'

export interface LeadNotificationData {
  name?: string
  email?: string
  phone?: string
  company?: string
  service?: string
  message?: string
  submittedAt?: string
}

function serviceClient() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !supabaseServiceKey) {
    return null
  }
  return createClient(supabaseUrl, supabaseServiceKey)
}

async function logSend(
  recipient: string,
  status: 'sent' | 'suppressed' | 'failed',
  errorMessage?: string
) {
  const supabase = serviceClient()
  if (!supabase) return
  const { error } = await supabase.from('email_send_log').insert({
    message_id: null,
    template_name: TEMPLATE_NAME,
    recipient_email: recipient,
    status,
    error_message: errorMessage ?? null,
  })
  if (error) {
    console.error('Failed to write email send log', { code: error.code, message: error.message })
  }
}

/**
 * Sends the team notification for a submitted lead and records the outcome
 * in email_send_log. The template defines the fixed team recipient.
 */
export async function notifyTeamOfLead(
  templateData: LeadNotificationData,
  idempotencyKey: string
): Promise<{ sent: boolean; reason?: string }> {
  const recipient =
    Deno.env.get('TEAM_NOTIFICATION_EMAIL') || 'ads@consultwithprofessionals.com'

  try {
    const result = await sendTemplateEmail(TEMPLATE_NAME, recipient, {
      templateData,
      idempotencyKey,
      replyTo: templateData.email && templateData.email.includes('@') ? templateData.email : undefined,
    })

    if (!result.sent) {
      await logSend(recipient, 'suppressed')
      return { sent: false, reason: result.reason }
    }

    await logSend(recipient, 'sent')
    return { sent: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Lead notification send failed', { message })
    await logSend(recipient, 'failed', message.slice(0, 1000))
    throw error
  }
}
