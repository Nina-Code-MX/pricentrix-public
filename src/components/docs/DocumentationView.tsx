import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { JsonLd } from '@/components/ui/JsonLd';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { MdxContent } from '@/components/blog/MdxContent';
import { breadcrumbSchema, documentationPageSchema } from '@/lib/schemas';
import { getDocumentationPage } from '@/lib/documentation';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.pricentrix.com';

export function getDocumentationPath(locale: string) {
  return locale === 'es' ? '/documentacion' : '/documentation';
}

export async function DocumentationView({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'docs' });
  const docs = getDocumentationPage(locale);
  const pagePath = getDocumentationPath(locale);
  const pageUrl = `${locale === 'es' ? SITE_URL : `${SITE_URL}/${locale}`}${pagePath}`;

  const breadcrumbs = [
    { name: 'Home', url: locale === 'es' ? SITE_URL : `${SITE_URL}/${locale}` },
    { name: t('breadcrumbLabel'), url: pageUrl },
  ];

  return (
    <>
      <JsonLd
        schema={documentationPageSchema({
          locale,
          title: docs.title,
          description: docs.description,
          path: pagePath,
        })}
      />
      <JsonLd schema={breadcrumbSchema(breadcrumbs)} />

      <div id="top" className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <div className="rounded-[2rem] border border-surface-tertiary bg-white px-6 py-8 shadow-sm md:px-10 md:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
            {t('eyebrow')}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-content-primary md:text-5xl">
            {docs.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-content-secondary">
            {docs.description || t('description')}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-surface-tertiary bg-surface-secondary p-1">
            <span className="px-2 text-xs font-medium uppercase tracking-[0.12em] text-content-muted">
              {t('languageSwitchLabel')}
            </span>
            <Link
              href="/documentacion"
              aria-current={locale === 'es' ? 'page' : undefined}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                locale === 'es'
                  ? 'bg-brand-700 text-white'
                  : 'text-content-secondary hover:bg-white hover:text-content-primary'
              }`}
            >
              {t('languageSpanish')}
            </Link>
            <Link
              href="/en/documentation"
              aria-current={locale === 'en' ? 'page' : undefined}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                locale === 'en'
                  ? 'bg-brand-700 text-white'
                  : 'text-content-secondary hover:bg-white hover:text-content-primary'
              }`}
            >
              {t('languageEnglish')}
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
          <div className="hidden lg:block">
            <DocsSidebar
              title={t('sidebarTitle')}
              description={t('sidebarDescription')}
              sections={docs.sections}
            />
          </div>

          <div className="min-w-0">
            <nav
              aria-label={t('mobileNavTitle')}
              className="mb-6 rounded-3xl border border-surface-tertiary bg-white p-4 shadow-sm lg:hidden"
            >
              <p className="text-sm font-semibold text-content-primary">{t('mobileNavTitle')}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {docs.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="rounded-full border border-surface-tertiary bg-surface-secondary px-3 py-1.5 text-sm text-content-secondary transition-colors hover:border-brand-200 hover:text-brand-800"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </nav>

            <div className="rounded-[2rem] border border-surface-tertiary bg-white p-6 shadow-sm md:p-10">
              <div className="space-y-10">
                {docs.sections.map((section) => (
                  <section
                    key={section.key}
                    id={section.id}
                    className="scroll-mt-24 border-b border-surface-tertiary pb-10 last:border-b-0 last:pb-0"
                  >
                    <MdxContent source={section.content} />
                  </section>
                ))}
              </div>

              <div className="mt-10 border-t border-surface-tertiary pt-6">
                <a
                  href="#top"
                  className="text-sm font-medium text-brand-700 transition-colors hover:text-brand-900"
                >
                  {t('backToTop')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#top"
        aria-label={t('backToTop')}
        className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-surface-tertiary bg-white text-brand-700 shadow-lg transition-all hover:-translate-y-0.5 hover:text-brand-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 7-7 7 7" />
        </svg>
      </a>
    </>
  );
}
