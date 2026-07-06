/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  phone?: string
  company?: string
  service?: string
  message?: string
  submittedAt?: string
}

const Email = ({
  name = '—',
  email = '—',
  phone = '—',
  company = '—',
  service = '—',
  message = '',
  submittedAt = '',
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New enquiry from {name} at {company}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New enquiry received</Heading>
        <Text style={sub}>A new lead just submitted the enquiry form on consultwithprofessionals.com/enquiry.</Text>

        <Section style={card}>
          <Row label="Name" value={name} />
          <Row label="Work email" value={email} />
          <Row label="Phone" value={phone} />
          <Row label="Company" value={company} />
          <Row label="Service" value={service} />
          {submittedAt ? <Row label="Submitted" value={submittedAt} /> : null}
        </Section>

        {message ? (
          <>
            <Heading as="h2" style={h2}>Goals / message</Heading>
            <Text style={messageBox}>{message}</Text>
          </>
        ) : null}

        <Hr style={hr} />
        <Text style={footer}>
          Reply within 24 hours to keep response-time promises. Lead source: enquiry_landing (Google Ads).
        </Text>
      </Container>
    </Body>
  </Html>
)

const Row = ({ label, value }: { label: string; value: string }) => (
  <Section style={row}>
    <Text style={rowLabel}>{label}</Text>
    <Text style={rowValue}>{value}</Text>
  </Section>
)

export const template = {
  component: Email,
  subject: (data: Props) =>
    `New enquiry: ${data?.name || 'Lead'}${data?.company ? ` — ${data.company}` : ''}`,
  displayName: 'Enquiry notification (team)',
  to: Deno.env.get('TEAM_NOTIFICATION_EMAIL') || 'ads@consultwithprofessionals.com',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@brand.com',
    phone: '+91 98765 43210',
    company: 'Acme Co.',
    service: 'Performance Marketing (Google/Meta Ads)',
    message: 'We want to scale our D2C brand from ₹5L/mo to ₹50L/mo revenue.',
    submittedAt: new Date().toISOString(),
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 700, color: '#0b1220', margin: '0 0 8px' }
const h2 = { fontSize: '15px', fontWeight: 600, color: '#0b1220', margin: '20px 0 6px' }
const sub = { fontSize: '14px', color: '#4b5563', margin: '0 0 20px' }
const card = {
  border: '1px solid #e5e7eb',
  borderRadius: '10px',
  padding: '8px 16px',
  backgroundColor: '#f9fafb',
}
const row = { padding: '10px 0', borderBottom: '1px solid #eef2f7' }
const rowLabel = { fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: '#6b7280', margin: '0 0 2px' }
const rowValue = { fontSize: '14px', color: '#111827', margin: 0, fontWeight: 500 }
const messageBox = {
  fontSize: '14px',
  color: '#111827',
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '10px',
  padding: '14px 16px',
  whiteSpace: 'pre-wrap' as const,
}
const hr = { borderColor: '#e5e7eb', margin: '24px 0 12px' }
const footer = { fontSize: '12px', color: '#6b7280', margin: 0 }
