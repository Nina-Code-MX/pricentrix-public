import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pricentrix.com';
  const base = locale === 'es' ? siteUrl : `${siteUrl}/${locale}`;
  const path = locale === 'es' ? '/terminos' : '/terms';

  return {
    title: t('title'),
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        es: `${siteUrl}/terminos`,
        en: `${siteUrl}/en/terms`,
        'x-default': `${siteUrl}/terminos`,
      },
    },
  };
}

function Divider() {
  return <hr className="border-surface-tertiary my-10" />;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-content-primary mb-4 pb-2 border-b border-surface-tertiary">
      {children}
    </h2>
  );
}

function SubSectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-content-primary mt-6 mb-2">{children}</h3>;
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-content-secondary text-sm leading-relaxed mb-3">{children}</p>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside space-y-1.5 text-sm text-content-secondary mb-3 pl-1">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'terms' });

  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      {/* Header */}
      <header className="mb-10">
        <p className="text-xs text-content-muted uppercase tracking-widest mb-3">
          {t('lastUpdated')}
        </p>
        <h1 className="text-4xl font-extrabold text-content-primary leading-tight">{t('title')}</h1>
      </header>

      {/* Section 1 */}
      <section>
        <SectionTitle>{t('s1Title')}</SectionTitle>
        <Body>{t('s1p1')}</Body>
        <Body>{t('s1p2')}</Body>
      </section>

      <Divider />

      {/* Section 2 */}
      <section>
        <SectionTitle>{t('s2Title')}</SectionTitle>
        <Body>{t('s2intro')}</Body>
        <BulletList items={t.raw('s2items') as string[]} />
      </section>

      <Divider />

      {/* Section 3 */}
      <section>
        <SectionTitle>{t('s3Title')}</SectionTitle>
        <Body>{t('s3intro')}</Body>
        <BulletList items={t.raw('s3items') as string[]} />
      </section>

      <Divider />

      {/* Section 4 */}
      <section>
        <SectionTitle>{t('s4Title')}</SectionTitle>
        <Body>{t('s4intro')}</Body>
        <BulletList items={t.raw('s4items') as string[]} />
      </section>

      <Divider />

      {/* Section 5 */}
      <section>
        <SectionTitle>{t('s5Title')}</SectionTitle>
        <SubSectionTitle>{t('s51Title')}</SubSectionTitle>
        <BulletList items={t.raw('s51items') as string[]} />
        <SubSectionTitle>{t('s52Title')}</SubSectionTitle>
        <BulletList items={t.raw('s52items') as string[]} />
      </section>

      <Divider />

      {/* Section 6 */}
      <section>
        <SectionTitle>{t('s6Title')}</SectionTitle>
        <Body>{t('s6p1')}</Body>
        <Body>{t('s6intro')}</Body>
        <BulletList items={t.raw('s6items') as string[]} />
      </section>

      <Divider />

      {/* Section 7 */}
      <section>
        <SectionTitle>{t('s7Title')}</SectionTitle>
        <Body>{t('s7p1')}</Body>
        <BulletList items={t.raw('s7items') as string[]} />
        <Body>{t('s7p2')}</Body>
      </section>

      <Divider />

      {/* Section 8 */}
      <section>
        <SectionTitle>{t('s8Title')}</SectionTitle>
        <Body>{t('s8intro')}</Body>
        <BulletList items={t.raw('s8items') as string[]} />
      </section>

      <Divider />

      {/* Section 9 */}
      <section>
        <SectionTitle>{t('s9Title')}</SectionTitle>
        <Body>{t('s9p1')}</Body>
        <Body>{t('s9intro')}</Body>
        <BulletList items={t.raw('s9items') as string[]} />
      </section>

      <Divider />

      {/* Section 10 */}
      <section>
        <SectionTitle>{t('s10Title')}</SectionTitle>
        <Body>{t('s10intro')}</Body>
        <BulletList items={t.raw('s10items') as string[]} />
        <Body>{t('s10p1')}</Body>
      </section>

      <Divider />

      {/* Section 11 */}
      <section>
        <SectionTitle>{t('s11Title')}</SectionTitle>
        <Body>{t('s11intro')}</Body>
        <BulletList items={t.raw('s11items') as string[]} />
      </section>

      <Divider />

      {/* Section 12 */}
      <section>
        <SectionTitle>{t('s12Title')}</SectionTitle>
        <Body>{t('s12p1')}</Body>
        <Body>{t('s12intro')}</Body>
        <BulletList items={t.raw('s12items') as string[]} />
      </section>

      <Divider />

      {/* Section 13 */}
      <section>
        <SectionTitle>{t('s13Title')}</SectionTitle>
        <Body>{t('s13p1')}</Body>
      </section>

      <Divider />

      {/* Section 14 */}
      <section>
        <SectionTitle>{t('s14Title')}</SectionTitle>
        <Body>{t('s14p1')}</Body>
      </section>

      <Divider />

      {/* Section 15 — Contact */}
      <section>
        <SectionTitle>{t('s15Title')}</SectionTitle>
        <Body>{t('s15p1')}</Body>
        <div className="mt-4 rounded-2xl bg-surface border border-surface-tertiary px-6 py-5 text-sm text-content-secondary space-y-1">
          <p>
            <span className="font-medium text-content-primary">Email: </span>
            <a href="mailto:soporte@pricentrix.com" className="text-brand-600 hover:underline">
              {t('s15email')}
            </a>
          </p>
          <p>
            <span className="font-medium text-content-primary">Company: </span>
            {t('s15company')}
          </p>
        </div>
      </section>
    </div>
  );
}
