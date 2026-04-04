import { NextIntlClientProvider } from 'next-intl';
import { headers } from 'next/headers';
import { NotFoundContent } from '@/components/NotFoundContent';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import esMessages from '../../messages/es.json';
import enMessages from '../../messages/en.json';

// Root-level 404: triggered when [locale]/layout.tsx calls notFound() for invalid locales.
// The HTML shell always shows __next_error__ but the RSC payload / browser renders this component.
export default async function RootNotFound() {
  let locale = 'es';
  try {
    const h = await headers();
    const detected = h.get('x-next-intl-locale');
    if (detected === 'en') locale = 'en';
  } catch {
    // default to Spanish
  }

  const messages = locale === 'en' ? enMessages : esMessages;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      <main className="pt-16">
        <NotFoundContent />
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}
