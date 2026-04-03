import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const base = locale === 'es' ? '' : `/${locale}`;

  return (
    <section
      className="relative overflow-hidden text-white py-24 px-5"
      style={{
        background:
          'radial-gradient(circle at top center, rgba(59,130,246,.16), transparent 30%), linear-gradient(135deg, #0b1220 0%, #111827 55%, #1e293b 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/10 text-blue-100 text-sm mb-6 backdrop-blur-sm">
          <span className="w-5 h-5 rounded-full bg-brand-500/30 flex items-center justify-center text-xs">✦</span>
          {t('eyebrow')}
        </div>

        {/* Mini card */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/6 border border-white/10 backdrop-blur-sm shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-brand-600 flex items-center justify-center text-lg flex-shrink-0">
              📊
            </div>
            <div className="text-left">
              <strong className="block text-sm text-white">{t('miniCardTitle')}</strong>
              <span className="text-xs text-slate-300">{t('miniCardSubtitle')}</span>
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 leading-tight">
          {t('title')}
        </h1>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto mb-7">{t('description')}</p>

        {/* Benefit pills */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {(['benefit1', 'benefit2', 'benefit3', 'benefit4'] as const).map((key) => (
            <div
              key={key}
              className="flex items-center gap-2 bg-white/8 px-4 py-2 rounded-full text-gray-200 text-sm border border-white/10 backdrop-blur-sm"
            >
              <span className="text-brand-400">✓</span>
              {t(key)}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href={`${base}/contacto`}
            className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold transition-colors shadow-lg"
          >
            {t('ctaPrimary')}
          </Link>
          <Link
            href={`${base}/contacto`}
            className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 font-semibold transition-colors backdrop-blur-sm"
          >
            {t('ctaSecondary')}
          </Link>
        </div>
      </div>

      {/* Dashboard placeholder */}
      <div className="max-w-4xl mx-auto mt-14 rounded-2xl bg-white/5 border border-white/10 h-72 flex items-center justify-center text-slate-400 text-sm">
        {t('dashboardAlt')}
      </div>
    </section>
  );
}
