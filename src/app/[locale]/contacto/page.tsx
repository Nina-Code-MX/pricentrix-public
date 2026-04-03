'use client';

import { useTranslations } from 'next-intl';
import { useState, FormEvent } from 'react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-20">
      <h1 className="text-4xl font-bold text-content-primary mb-3">{t('title')}</h1>
      <p className="text-content-secondary text-lg mb-10">{t('description')}</p>

      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <p className="text-2xl mb-2">✅</p>
          <h2 className="font-bold text-content-primary mb-1">{t('successTitle')}</h2>
          <p className="text-content-secondary">{t('successDesc')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-content-primary mb-1">
                {t('nameLabel')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder={t('namePlaceholder')}
                className="w-full px-4 py-3 rounded-xl border border-surface-tertiary bg-surface text-content-primary placeholder:text-content-muted focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-content-primary mb-1">
                {t('emailLabel')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder={t('emailPlaceholder')}
                className="w-full px-4 py-3 rounded-xl border border-surface-tertiary bg-surface text-content-primary placeholder:text-content-muted focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-content-primary mb-1">
              {t('companyLabel')}
            </label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder={t('companyPlaceholder')}
              className="w-full px-4 py-3 rounded-xl border border-surface-tertiary bg-surface text-content-primary placeholder:text-content-muted focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-content-primary mb-1">
              {t('messageLabel')}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder={t('messagePlaceholder')}
              className="w-full px-4 py-3 rounded-xl border border-surface-tertiary bg-surface text-content-primary placeholder:text-content-muted focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm resize-none"
            />
          </div>

          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
              <strong>{t('errorTitle')}</strong> — {t('errorDesc')}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-6 py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? t('sending') : t('submit')}
          </button>
        </form>
      )}
    </div>
  );
}
