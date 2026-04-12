'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

type BillingCycle = 'monthly' | 'yearly';
type PlanKey = 'trial' | 'starter' | 'ecommerce' | 'enterprise';

type Plan = {
  key: PlanKey;
  monthlyPrice: number;
  periodDays?: number;
  products: string;
  competitors: string;
  supportKey: 'supportStandard' | 'supportFast';
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    key: 'trial',
    monthlyPrice: 0,
    periodDays: 30,
    products: '20',
    competitors: '5',
    supportKey: 'supportStandard',
  },
  {
    key: 'starter',
    monthlyPrice: 19,
    products: '50',
    competitors: '5',
    supportKey: 'supportStandard',
  },
  {
    key: 'ecommerce',
    monthlyPrice: 49,
    products: '500',
    competitors: '30',
    supportKey: 'supportFast',
    highlighted: true,
  },
  {
    key: 'enterprise',
    monthlyPrice: 159,
    products: '5,000',
    competitors: '50',
    supportKey: 'supportFast',
  },
];

function getDisplayedPrice(monthlyPrice: number, cycle: BillingCycle) {
  if (cycle === 'monthly') return monthlyPrice;
  return monthlyPrice * 10;
}

function getOriginalYearlyPrice(monthlyPrice: number) {
  return monthlyPrice * 12;
}

export function PricingPlans() {
  const t = useTranslations('pricing');
  const [cycle, setCycle] = useState<BillingCycle>('yearly');
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('ecommerce');

  return (
    <section className="px-5 py-16 sm:py-20 bg-gradient-to-b from-surface-secondary via-white to-surface-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-brand-700 uppercase tracking-widest">
            {t('eyebrow')}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-content-primary leading-tight">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-content-secondary">{t('description')}</p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-2xl border border-surface-tertiary bg-white p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => setCycle('monthly')}
              className={`px-4 sm:px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                cycle === 'monthly'
                  ? 'bg-brand-700 text-white'
                  : 'text-content-secondary hover:text-content-primary'
              }`}
            >
              {t('monthly')}
            </button>
            <button
              type="button"
              onClick={() => setCycle('yearly')}
              className={`px-4 sm:px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                cycle === 'yearly'
                  ? 'bg-brand-700 text-white'
                  : 'text-content-secondary hover:text-content-primary'
              }`}
            >
              {t('yearly')}
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.key;
            const displayedPrice = getDisplayedPrice(plan.monthlyPrice, cycle);
            const originalYearlyPrice = getOriginalYearlyPrice(plan.monthlyPrice);
            return (
              <article
                key={plan.key}
                className={`relative h-full rounded-2xl border bg-white p-6 shadow-sm transition-all flex flex-col ${
                  isSelected
                    ? 'border-brand-600 ring-2 ring-brand-100 shadow-md'
                    : 'border-surface-tertiary hover:border-brand-200'
                }`}
                onClick={() => setSelectedPlan(plan.key)}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 right-4 rounded-full bg-brand-700 px-3 py-1 text-xs font-semibold text-white">
                    {t('mostPopular')}
                  </span>
                )}

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-content-primary">
                    {t(`plans.${plan.key}.name`)}
                  </h2>
                  {cycle === 'yearly' && (
                    <div className="mt-3 h-5 flex items-center gap-2">
                      {plan.monthlyPrice > 0 ? (
                        <>
                          <p className="text-[11px] text-content-muted opacity-80 line-through">
                            ${originalYearlyPrice}
                          </p>
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700 uppercase tracking-wide">
                            {t('saveBadge')}
                          </span>
                        </>
                      ) : (
                        <span className="invisible text-[11px]">placeholder</span>
                      )}
                    </div>
                  )}
                  <div className="mt-4 flex items-end gap-1">
                    <p className="text-4xl font-extrabold text-content-primary">
                      ${displayedPrice}
                    </p>
                    <p className="text-sm text-content-muted mb-1">
                      {t(cycle === 'yearly' ? 'perYear' : 'perMonth')}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm text-content-secondary">
                    {plan.periodDays ? (
                      <li className="flex items-center gap-2">
                        <span className="text-brand-700">•</span>
                        {t('periodDays', { days: plan.periodDays })}
                      </li>
                    ) : (
                      <li className="flex items-center gap-2">
                        <span className="text-brand-700">•</span>
                        {t(cycle === 'yearly' ? 'periodYearly' : 'periodMonthly')}
                      </li>
                    )}
                    <li className="flex items-center gap-2">
                      <span className="text-brand-700">•</span>
                      {t('products', { count: plan.products })}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-brand-700">•</span>
                      {t('competitors', { count: plan.competitors })}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-brand-700">•</span>
                      {t(plan.supportKey)}
                    </li>
                  </ul>
                </div>

                <Link
                  href="/free-trial"
                  className="mt-7 inline-flex w-full justify-center rounded-xl bg-brand-700 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-800 transition-colors"
                >
                  {t('startFreeTrial')}
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl border border-surface-tertiary bg-white/90 p-8 sm:p-10 text-center shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-bold text-content-primary">
            {t('contactCtaTitle')}
          </h3>
          <p className="mt-3 text-content-secondary max-w-2xl mx-auto">
            {t('contactCtaDescription')}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-xl border border-brand-600 px-6 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
          >
            {t('contactCtaButton')}
          </Link>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-surface-tertiary bg-white p-6">
            <h4 className="text-base font-semibold text-content-primary">{t('faq.q1')}</h4>
            <p className="mt-2 text-sm text-content-secondary">{t('faq.a1')}</p>
          </div>
          <div className="rounded-2xl border border-surface-tertiary bg-white p-6">
            <h4 className="text-base font-semibold text-content-primary">{t('faq.q2')}</h4>
            <p className="mt-2 text-sm text-content-secondary">{t('faq.a2')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
