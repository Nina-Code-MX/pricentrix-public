import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function FinalCta() {
  const t = useTranslations('cta');

  return (
    <section className="py-24 px-5 bg-dark-900 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">{t('title')}</h2>
        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">{t('description')}</p>

        {/* Dashboard placeholder */}
        <div className="rounded-2xl bg-white/5 border border-white/10 h-64 flex items-center justify-center text-slate-400 text-sm mb-10 mx-auto max-w-2xl">
          Dashboard / Insights screenshot
        </div>

        <Link
          href="/contacto"
          className="inline-block px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg transition-colors shadow-lg"
        >
          {t('button')}
        </Link>
        <p className="mt-4 text-sm text-slate-400">{t('noCreditCard')}</p>
      </div>
    </section>
  );
}
