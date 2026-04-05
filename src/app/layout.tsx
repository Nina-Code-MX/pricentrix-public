import type { ReactNode } from 'react';
import { headers } from 'next/headers';
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
      {/* Cookie consent — deferred until page is idle to avoid blocking FCP/LCP */}
      <Script
        src="//cdn.cookie-script.com/s/a9a7c1108716be3f699041c34369b200.js"
        strategy="lazyOnload"
        charSet="UTF-8"
      />
      {/* Google Analytics — loaded after idle to keep it off the critical path */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
      <Script id="google-analytics" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </html>
  );
}
