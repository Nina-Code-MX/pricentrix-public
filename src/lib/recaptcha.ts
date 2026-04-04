/**
 * Verifies a reCAPTCHA v3 token server-side.
 * Returns true if the score is acceptable (≥ 0.5) or if reCAPTCHA is not configured.
 */
export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true; // reCAPTCHA not configured — allow through

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  });

  const data = await res.json();
  // score: 1.0 = very likely human, 0.0 = very likely bot. Threshold: 0.5
  return data.success === true && (data.score ?? 0) >= 0.5;
}
