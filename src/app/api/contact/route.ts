import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';
import { verifyRecaptcha } from '@/lib/recaptcha';

// AWS SES SMTP transport — credentials are SMTP-specific (not IAM SDK keys)
const transporter = nodemailer.createTransport({
  host: `email-smtp.${process.env.AWS_SES_REGION ?? 'us-east-1'}.amazonaws.com`,
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.AWS_SES_ACCESS_KEY_ID,
    pass: process.env.AWS_SES_SECRET_ACCESS_KEY,
  },
});

const FROM_EMAIL = process.env.SES_FROM_EMAIL ?? 'noreply@pricentrix.com';
const TO_EMAIL = process.env.CONTACT_EMAIL ?? 'hola@pricentrix.com';

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message, recaptchaToken } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!(await verifyRecaptcha(recaptchaToken ?? ''))) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    await transporter.sendMail({
      from: `Pricentrix Contact <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Pricentrix] Nuevo mensaje de ${name}${company ? ` — ${company}` : ''}`,
      text: `Nombre: ${name}\nEmail: ${email}\nEmpresa: ${company || '—'}\n\nMensaje:\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
