import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function Problem() {
  const t = useTranslations('problem');
  const items = ['item1', 'item2', 'item3', 'item4', 'item5'] as const;

  return (
    <section className="py-20 px-5 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-content-primary mb-4">{t('title')}</h2>
          <p className="text-content-secondary text-lg">{t('description')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-3">
            {items.map((key) => (
              <div
                key={key}
                className="flex items-start gap-3 bg-surface-secondary border border-surface-tertiary rounded-xl p-4"
              >
                <span className="text-error mt-0.5 flex-shrink-0">✗</span>
                <p className="text-content-secondary text-sm">{t(key)}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-surface-tertiary border border-gray-200 h-72 flex items-center justify-center text-content-muted text-sm">
            <Image
              src="/images/brand/why-monitoring-competitor-prices-is-no-longer-optional.webp"
              alt={t('title')}
              width={558}
              height={372}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
