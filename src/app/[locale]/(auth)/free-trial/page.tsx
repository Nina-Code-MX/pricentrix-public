'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocale, useTranslations } from 'next-intl';

type FormValues = {
  account_name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export default function FreeTrialPage() {
  const t = useTranslations('register');
  const locale = useLocale();
  const [serverError, setServerError] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  // Side-effect redirect lives in useEffect to satisfy React Compiler rules
  useEffect(() => {
    if (redirectUrl) window.location.href = redirectUrl;
  }, [redirectUrl]);

  const schema = z
    .object({
      account_name: z.string().min(1, t('required')),
      first_name: z.string().min(1, t('required')),
      last_name: z.string().min(1, t('required')),
      email: z.string().min(1, t('required')).email(t('emailInvalid')),
      password: z
        .string()
        .min(8, t('passwordMin'))
        .regex(/[A-Z]/, t('passwordUpper'))
        .regex(/[0-9]/, t('passwordNumber'))
        .regex(/[^A-Za-z0-9]/, t('passwordSymbol')),
      confirm_password: z.string().min(1, t('required')),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: t('passwordMatch'),
      path: ['confirm_password'],
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const { confirm_password, ...fields } = values;
      void confirm_password;
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, locale }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setServerError(data.error ?? t('errorTitle'));
        return;
      }
      if (data.redirect_url) {
        setRedirectUrl(data.redirect_url);
      }
    } catch {
      setServerError(t('errorTitle'));
    }
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      {/* Left — marketing panel */}
      <div className="lg:w-1/2 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white flex items-center justify-center p-10 lg:p-16">
        <div className="max-w-md">
          <p className="text-brand-200 text-sm font-medium mb-4 uppercase tracking-wide">
            {t('tagline')}
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">{t('heroTitle')}</h1>
          <p className="text-brand-100/80 text-lg mb-10">{t('heroSubtitle')}</p>
          <ul className="space-y-4">
            {(['benefit1', 'benefit2', 'benefit3', 'benefit4'] as const).map((key) => (
              <li key={key} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-400/30 flex items-center justify-center">
                  <svg className="w-3 h-3 text-brand-300" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                  </svg>
                </span>
                <span className="text-brand-100/90">{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-content-primary mb-1">{t('formTitle')}</h2>
          <p className="text-content-secondary text-sm mb-8">{t('formSubtitle')}</p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <Field label={t('accountNameLabel')} error={errors.account_name?.message}>
              <input
                {...register('account_name')}
                type="text"
                placeholder={t('accountNamePlaceholder')}
                className={inputClass(!!errors.account_name)}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label={t('firstNameLabel')} error={errors.first_name?.message}>
                <input
                  {...register('first_name')}
                  type="text"
                  placeholder={t('firstNamePlaceholder')}
                  className={inputClass(!!errors.first_name)}
                />
              </Field>
              <Field label={t('lastNameLabel')} error={errors.last_name?.message}>
                <input
                  {...register('last_name')}
                  type="text"
                  placeholder={t('lastNamePlaceholder')}
                  className={inputClass(!!errors.last_name)}
                />
              </Field>
            </div>

            <Field label={t('emailLabel')} error={errors.email?.message}>
              <input
                {...register('email')}
                type="email"
                placeholder={t('emailPlaceholder')}
                className={inputClass(!!errors.email)}
              />
            </Field>

            <Field label={t('passwordLabel')} error={errors.password?.message}>
              <input
                {...register('password')}
                type="password"
                placeholder={t('passwordPlaceholder')}
                className={inputClass(!!errors.password)}
              />
            </Field>

            <Field label={t('confirmPasswordLabel')} error={errors.confirm_password?.message}>
              <input
                {...register('confirm_password')}
                type="password"
                placeholder={t('confirmPasswordPlaceholder')}
                className={inputClass(!!errors.confirm_password)}
              />
            </Field>

            {serverError && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                <strong>{t('errorTitle')}:</strong> {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-content-muted">
            {t('loginLink')}{' '}
            <a
              href="https://app.pricentrix.com/auth/login"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              {t('loginLinkAction')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-content-primary mb-1">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 rounded-xl border text-content-primary placeholder:text-content-muted bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors ${
    hasError ? 'border-red-400 focus:ring-red-400' : 'border-surface-tertiary'
  }`;
}
