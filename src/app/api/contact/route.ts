import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { NextRequest, NextResponse } from 'next/server';

const ses = new SESClient({
  region: process.env.AWS_SES_REGION ?? 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY!,
  },
});

const FROM_EMAIL = process.env.SES_FROM_EMAIL ?? 'noreply@pricentrix.com';
const TO_EMAIL = process.env.CONTACT_EMAIL ?? 'hola@pricentrix.com';

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await ses.send(
      new SendEmailCommand({
        ConfigurationSetName: process.env.SES_CONFIGURATION_SET,
        Source: `Pricentrix Contact <${FROM_EMAIL}>`,
        Destination: { ToAddresses: [TO_EMAIL] },
        ReplyToAddresses: [email],
        Message: {
          Subject: {
            Data: `[Pricentrix] Nuevo mensaje de ${name}${company ? ` — ${company}` : ''}`,
          },
          Body: {
            Text: {
              Data: `Nombre: ${name}\nEmail: ${email}\nEmpresa: ${company || '—'}\n\nMensaje:\n${message}`,
            },
          },
        },
      })
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
