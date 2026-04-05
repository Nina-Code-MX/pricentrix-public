import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function Features() {
  const t = useTranslations('features');
  const cards = [
    { key: 'f1', icon: '🔍', image: '/images/brand/automatic-product-and-price-scanning.webp' },
    {
      key: 'f2',
      icon: '🧩',
      image: '/images/brand/assistant-to-identify-equivalent-products.webp',
    },
    { key: 'f3', icon: '📋', image: '/images/brand/reports-to-detect-pricing-gaps.webp' },
    { key: 'f4', icon: '⚖️', image: '/images/brand/per-product-comparisons.webp' },
    { key: 'f5', icon: '📈', image: '/images/brand/trend-tracking.webp' },
    { key: 'f6', icon: '📊', image: '/images/brand/dashboards-and-actionable-insights.webp' },
    { key: 'f7', icon: '🆕', image: '/images/brand/discover-new-competitor-products.webp' },
    { key: 'f8', icon: '🔔', image: '/images/brand/competitor-price-change-alerts.webp' },
    { key: 'f9', icon: '🚀', image: '/images/brand/easy-to-get-started.webp' },
  ] as const;

  return (
    <section id="features" className="py-20 px-5 bg-surface-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-content-primary mb-4">{t('title')}</h2>
          <p className="text-content-secondary">{t('description')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(({ key, icon, image }) => (
            <div
              key={key}
              className="bg-surface border border-surface-tertiary rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-36 bg-surface-tertiary flex items-center justify-center text-content-muted text-sm border-b border-surface-tertiary overflow-hidden">
                <Image
                  src={image}
                  alt={t(`${key}Title` as Parameters<typeof t>[0])}
                  width={366}
                  height={144}
                  className="object-fit"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-content-primary mb-2 text-sm leading-snug">
                  {t(`${key}Title` as Parameters<typeof t>[0])}
                </h3>
                <p className="text-content-muted text-sm leading-relaxed">
                  {t(`${key}Desc` as Parameters<typeof t>[0])}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
