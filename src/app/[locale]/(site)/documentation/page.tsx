import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { DocumentationView, getDocumentationPath } from '@/components/docs/DocumentationView';
import { getDocumentationSeoKeywords } from '@/lib/documentation';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.pricentrix.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const base = locale === 'es' ? SITE_URL : `${SITE_URL}/${locale}`;
  const path = getDocumentationPath(locale);
  const keywords = getDocumentationSeoKeywords(locale);

  return {
    title: t('documentationTitle'),
    description: t('documentationDescription'),
    keywords,
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        es: `${SITE_URL}/documentacion`,
        en: `${SITE_URL}/en/documentation`,
        'x-default': `${SITE_URL}/documentacion`,
      },
    },
  };
}

export default async function DocumentationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DocumentationView locale={locale} />;
}
