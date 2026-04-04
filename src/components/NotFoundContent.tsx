'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function NotFoundContent() {
  const t = useTranslations('notFound');

  return (
    <div className="max-w-2xl mx-auto px-5 py-20">
      <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">
        {t('code')}
      </p>
      <h1 className="text-4xl font-bold text-content-primary mb-3">{t('title')}</h1>
      <p className="text-content-secondary text-lg mb-10">{t('description')}</p>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-semibold transition-colors"
        >
          {t('goHome')}
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-xl border border-gray-200 text-content-secondary hover:bg-gray-50 font-medium transition-colors"
        >
          {t('contactUs')}
        </Link>
      </div>
    </div>
  );
}
