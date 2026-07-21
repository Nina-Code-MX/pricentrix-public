import { NextRequest, NextResponse } from 'next/server';
import { verifyRecaptcha } from '@/lib/recaptcha';

const THANK_YOU_COOKIE = 'post_register_thank_you';

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
  const response = NextResponse.json(data, { status: res.status });

  if (res.ok && !data.error) {
    response.cookies.set(THANK_YOU_COOKIE, '1', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 10,
      path: '/',
    });
  }

  return response;
}
