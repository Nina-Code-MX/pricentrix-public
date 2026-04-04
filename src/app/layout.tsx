import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import './globals.css';

// Root layout: provides <html>/<body> for the entire app including not-found.tsx.
// The [locale]/layout.tsx handles NextIntlClientProvider but no longer wraps html/body.
// We read the locale from the middleware header to set the lang attribute.
export default async function RootLayout({ children }: { children: ReactNode }) {
  let lang = 'es';
  try {
    const h = await headers();
    const detected = h.get('x-next-intl-locale');
    if (detected) lang = detected;
  } catch {
    // default to Spanish
  }

  return (
    <html lang={lang} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
