import { useTranslations } from 'next-intl';

const icons = ['🎯', '🛒', '💸', '⚡', '🤖', '📊'];

export function Benefits() {
  const t = useTranslations('benefits');
  const cards = [
    { title: t('b1Title'), desc: t('b1Desc') },
    { title: t('b2Title'), desc: t('b2Desc') },
    { title: t('b3Title'), desc: t('b3Desc') },
    { title: t('b4Title'), desc: t('b4Desc') },
    { title: t('b5Title'), desc: t('b5Desc') },
    { title: t('b6Title'), desc: t('b6Desc') },
  ];

  return (
    <section className="py-20 px-5 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-content-primary mb-4">{t('title')}</h2>
          <p className="text-content-secondary">{t('description')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="bg-surface border border-surface-tertiary rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{icons[i]}</div>
              <h3 className="font-semibold text-content-primary mb-2">{card.title}</h3>
              <p className="text-content-secondary text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
