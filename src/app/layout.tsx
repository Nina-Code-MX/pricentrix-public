import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import './globals.css';

const GA_ID = 'G-HF11WJ47XL';

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
      <Script
        src="//cdn.cookie-script.com/s/a9a7c1108716be3f699041c34369b200.js"
        strategy="beforeInteractive"
        charSet="UTF-8"
      />
      <GoogleAnalytics gaId={GA_ID} />
    </html>
  );
}
