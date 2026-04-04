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

const passwordRules = [
  { key: 'passwordReqMin', test: (v: string) => v.length >= 8 },
  { key: 'passwordReqUpper', test: (v: string) => /[A-Z]/.test(v) },
  { key: 'passwordReqNumber', test: (v: string) => /[0-9]/.test(v) },
  { key: 'passwordReqSymbol', test: (v: string) => /[^A-Za-z0-9]/.test(v) },
] as const;

export default function FreeTrialPage() {
  const t = useTranslations('register');
  const locale = useLocale();
  const [serverError, setServerError] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const passwordValue = watch('password', '');

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
              <PasswordInput
                registration={register('password')}
                placeholder={t('passwordPlaceholder')}
                hasError={!!errors.password}
                show={showPassword}
                onToggle={() => setShowPassword((v) => !v)}
                ariaLabel={showPassword ? t('hidePassword') : t('showPassword')}
              />
              <PasswordChecklist value={passwordValue} t={t} />
            </Field>

            <Field label={t('confirmPasswordLabel')} error={errors.confirm_password?.message}>
              <PasswordInput
                registration={register('confirm_password')}
                placeholder={t('confirmPasswordPlaceholder')}
                hasError={!!errors.confirm_password}
                show={showConfirm}
                onToggle={() => setShowConfirm((v) => !v)}
                ariaLabel={showConfirm ? t('hidePassword') : t('showPassword')}
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

function PasswordInput({
  registration,
  placeholder,
  hasError,
  show,
  onToggle,
  ariaLabel,
}: {
  registration: ReturnType<ReturnType<typeof useForm<FormValues>>['register']>;
  placeholder: string;
  hasError: boolean;
  show: boolean;
  onToggle: () => void;
  ariaLabel: string;
}) {
  return (
    <div className="relative">
      <input
        {...registration}
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        className={`${inputClass(hasError)} pr-11`}
      />
      <button
        type="button"
        onClick={onToggle}
        aria-label={ariaLabel}
        className="absolute inset-y-0 right-3 flex items-center text-content-muted hover:text-content-secondary transition-colors"
      >
        {show ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

function PasswordChecklist({
  value,
  t,
}: {
  value: string;
  t: ReturnType<typeof useTranslations<'register'>>;
}) {
  if (!value) return null;
  return (
    <ul className="mt-2 space-y-1">
      <li className="text-xs font-medium text-content-muted mb-1">{t('passwordReqTitle')}</li>
      {passwordRules.map(({ key, test }) => {
        const met = test(value);
        return (
          <li
            key={key}
            className={`flex items-center gap-2 text-xs ${met ? 'text-green-600' : 'text-content-muted'}`}
          >
            <span
              className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${met ? 'bg-green-100' : 'bg-gray-100'}`}
            >
              {met ? (
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
              ) : (
                <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="3" />
                </svg>
              )}
            </span>
            {t(key)}
          </li>
        );
      })}
    </ul>
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
