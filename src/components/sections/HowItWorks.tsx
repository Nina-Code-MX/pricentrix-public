import { useTranslations } from 'next-intl';

export function HowItWorks() {
  const t = useTranslations('howItWorks');
  const steps = [
    { num: 1, title: t('s1Title'), desc: t('s1Desc') },
    { num: 2, title: t('s2Title'), desc: t('s2Desc') },
    { num: 3, title: t('s3Title'), desc: t('s3Desc') },
    { num: 4, title: t('s4Title'), desc: t('s4Desc') },
  ];

  return (
    <section className="py-20 px-5 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-content-primary mb-4">{t('title')}</h2>
          <p className="text-content-secondary">{t('description')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="w-12 h-12 rounded-full bg-brand-700 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                {step.num}
              </div>
              <h3 className="font-semibold text-content-primary mb-2">{step.title}</h3>
              <p className="text-content-secondary text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
