import { useTranslations } from 'next-intl';

export function Features() {
  const t = useTranslations('features');
  const cards = [
    { key: 'f1', icon: '🔍' },
    { key: 'f2', icon: '🧩' },
    { key: 'f3', icon: '📋' },
    { key: 'f4', icon: '⚖️' },
    { key: 'f5', icon: '📈' },
    { key: 'f6', icon: '📊' },
    { key: 'f7', icon: '🆕' },
    { key: 'f8', icon: '🔔' },
    { key: 'f9', icon: '🚀' },
  ] as const;

  return (
    <section id="features" className="py-20 px-5 bg-surface-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-content-primary mb-4">{t('title')}</h2>
          <p className="text-content-secondary">{t('description')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(({ key, icon }) => (
            <div key={key} className="bg-surface border border-surface-tertiary rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-36 bg-surface-tertiary flex items-center justify-center text-content-muted text-sm border-b border-surface-tertiary">
                {icon} Screenshot
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
