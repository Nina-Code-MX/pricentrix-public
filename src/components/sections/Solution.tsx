import { useTranslations } from 'next-intl';

export function Solution() {
  const t = useTranslations('solution');

  return (
    <section className="py-20 px-5 bg-surface-secondary">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl bg-surface-tertiary border border-gray-200 h-80 flex items-center justify-center text-content-muted text-sm order-last md:order-first">
          {t('imageAlt')}
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-content-primary mb-5 leading-tight">
            {t('title')}
          </h2>
          <p className="text-content-secondary mb-4">{t('p1')}</p>
          <p className="text-content-secondary mb-4">{t('p2')}</p>
          <p className="text-content-secondary">{t('p3')}</p>
        </div>
      </div>
    </section>
  );
}
