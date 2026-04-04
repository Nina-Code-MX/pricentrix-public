import { NextRequest, NextResponse } from 'next/server';
import { verifyRecaptcha } from '@/lib/recaptcha';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { locale, recaptchaToken, ...fields } = body;

  if (!(await verifyRecaptcha(recaptchaToken ?? ''))) {
    return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
  }

  const res = await fetch(
    `https://app.pricentrix.com/api/auth/public-register?locale=${locale ?? 'es'}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-public-register-key': process.env.PUBLIC_REGISTER_KEY ?? '',
      },
      body: JSON.stringify(fields),
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
