import { getLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Link } from '@/i18n/routing';

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'notFound' });

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-[calc(100vh-4rem)] flex items-center justify-center px-5 py-20">
        <div className="text-center max-w-lg mx-auto">
          {/* Large decorative 404 */}
          <div
            className="text-[10rem] leading-none font-extrabold select-none"
            style={{
              background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 60%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            aria-hidden="true"
          >
            {t('code')}
          </div>

          {/* Divider dot */}
          <div className="w-2 h-2 rounded-full bg-brand-400 mx-auto -mt-4 mb-8" />

          <h1 className="text-3xl font-bold text-content-primary mb-3">{t('title')}</h1>
          <p className="text-content-secondary leading-relaxed mb-10">{t('description')}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-semibold transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              {t('goHome')}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-content-secondary hover:bg-gray-50 font-medium transition-colors"
            >
              {t('contactUs')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
