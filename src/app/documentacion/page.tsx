import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import esMessages from '../../../messages/es.json';
import { DocumentationView } from '@/components/docs/DocumentationView';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { getDocumentationSeoKeywords } from '@/lib/documentation';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.pricentrix.com';

export const metadata: Metadata = {
  title: 'Documentación — Pricentrix',
  description:
    'Documentación completa de Pricentrix sobre configuración, importaciones, matching de productos, reportes, facturación y soporte.',
  keywords: getDocumentationSeoKeywords('es'),
  alternates: {
    canonical: `${SITE_URL}/documentacion`,
    languages: {
      es: `${SITE_URL}/documentacion`,
      en: `${SITE_URL}/en/documentation`,
      'x-default': `${SITE_URL}/documentacion`,
    },
  },
};

export default function SpanishDocumentationPage() {
  setRequestLocale('es');

  return (
    <NextIntlClientProvider locale="es" messages={esMessages}>
      <Navbar />
      <main className="pt-16">
        <DocumentationView locale="es" />
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}
