import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { JsonLd } from '@/components/ui/JsonLd';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { Solution } from '@/components/sections/Solution';
import { Benefits } from '@/components/sections/Benefits';
import { Features } from '@/components/sections/Features';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { FinalCta } from '@/components/sections/FinalCta';
import { organizationSchema, websiteSchema, softwareAppSchema } from '@/lib/schemas';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pricentrix.com';
  const altLocale = locale === 'es' ? 'en' : 'es';
  const altUrl = altLocale === 'es' ? siteUrl : `${siteUrl}/${altLocale}`;

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    alternates: {
      canonical: locale === 'es' ? siteUrl : `${siteUrl}/${locale}`,
      languages: { [altLocale]: altUrl, 'x-default': siteUrl },
    },
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
      url: locale === 'es' ? siteUrl : `${siteUrl}/${locale}`,
      type: 'website',
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd schema={organizationSchema()} />
      <JsonLd schema={websiteSchema(locale)} />
      <JsonLd schema={softwareAppSchema(locale)} />
      <Hero />
      <Problem />
      <Solution />
      <Benefits />
      <Features />
      <HowItWorks />
      <FinalCta />
    </>
  );
}
