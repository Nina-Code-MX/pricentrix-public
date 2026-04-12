import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { JsonLd } from '@/components/ui/JsonLd';
import { PricingPlans } from '@/components/sections/PricingPlans';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.pricentrix.com';

  const localizedPath = locale === 'es' ? '/precios' : '/en/pricing';

  return {
    title: t('pricingTitle'),
    description: t('pricingDescription'),
    alternates: {
      canonical: `${siteUrl}${localizedPath}`,
      languages: {
        es: `${siteUrl}/precios`,
        en: `${siteUrl}/en/pricing`,
        'x-default': `${siteUrl}/precios`,
      },
    },
    openGraph: {
      title: t('pricingTitle'),
      description: t('pricingDescription'),
      url: `${siteUrl}${localizedPath}`,
      type: 'website',
    },
  };
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pricing' });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.pricentrix.com';
  const pageUrl = `${siteUrl}${locale === 'es' ? '/precios' : '/en/pricing'}`;

  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Pricentrix',
          description: t('description'),
          brand: { '@type': 'Brand', name: 'Pricentrix' },
          offers: {
            '@type': 'AggregateOffer',
            url: pageUrl,
            priceCurrency: 'USD',
            lowPrice: '0',
            highPrice: '1590',
            offerCount: 4,
          },
        }}
      />
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: t('faq.q1'),
              acceptedAnswer: { '@type': 'Answer', text: t('faq.a1') },
            },
            {
              '@type': 'Question',
              name: t('faq.q2'),
              acceptedAnswer: { '@type': 'Answer', text: t('faq.a2') },
            },
          ],
        }}
      />
      <PricingPlans />
    </>
  );
}
