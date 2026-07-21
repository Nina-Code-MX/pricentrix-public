import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'thankYou' });

  return {
    title: t('pageTitle'),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ThankYouPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'thankYou' });

  return (
    <div className="flex-1 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.16),_transparent_36%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] px-6 py-12 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto w-full max-w-3xl">
        <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
          <div className="border-b border-slate-100 bg-slate-950 px-8 py-8 text-white sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              {t('eyebrow')}
            </p>
            <div className="mt-5 flex items-start gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-cyan-400/15 ring-1 ring-inset ring-cyan-300/30">
                <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-cyan-300">
                  <path
                    d="M4 7.5A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v9a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 16.5v-9zm2.24-.5L12 11.2 17.76 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('title')}</h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  {t('description')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 px-8 py-8 sm:px-10 lg:grid-cols-[1.25fr_0.9fr]">
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                {t('tipTitle')}
              </h2>
              <ol className="mt-5 space-y-4">
                {[t('step1'), t('step2'), t('step3')].map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-sm leading-6 text-slate-700 sm:text-base">{step}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-900">
                {t('note')}
              </p>
            </section>

            <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="rounded-2xl bg-brand-50 px-5 py-5">
                <p className="text-sm leading-6 text-slate-700">{t('support')}</p>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="https://app.pricentrix.com/auth/login"
                  className="inline-flex items-center justify-center rounded-2xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                >
                  {t('primaryCta')}
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  {t('secondaryCta')}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
                >
                  {t('supportCta')}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
