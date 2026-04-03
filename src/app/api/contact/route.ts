import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_EMAIL ?? 'hola@pricentrix.com';

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Pricentrix Contact <noreply@pricentrix.com>',
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
