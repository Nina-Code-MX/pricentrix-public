'use client';

import { useLocale, useTranslations } from 'next-intl';
import NextLink from 'next/link';
import { usePathname, useRouter } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const year = new Date().getFullYear();

  const switchLocale = (next: Locale) => router.replace(pathname, { locale: next });

  return (
    <footer className="bg-dark-800 text-gray-400 pt-16 pb-8 mt-auto">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          <div className="col-span-2 md:col-span-1">
            <p className="text-white font-bold text-lg mb-3">Pricentrix</p>
            <p className="text-sm leading-relaxed">{t('tagline')}</p>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-3">{t('product')}</p>
            <div className="flex flex-col gap-2 text-sm">
              <NextLink href="/#features" className="hover:text-white transition-colors">
                {t('monitoring')}
              </NextLink>
              <NextLink href="/#features" className="hover:text-white transition-colors">
                {t('matching')}
              </NextLink>
              <NextLink href="/#features" className="hover:text-white transition-colors">
                {t('reports')}
              </NextLink>
            </div>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-3">{t('company')}</p>
            <div className="flex flex-col gap-2 text-sm">
              <NextLink href="/contacto" className="hover:text-white transition-colors">
                {t('contact')}
              </NextLink>
              <NextLink href="/contacto" className="hover:text-white transition-colors">
                {t('demo')}
              </NextLink>
              <NextLink href="/contacto" className="hover:text-white transition-colors">
                {t('support')}
              </NextLink>
            </div>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-3">{t('account')}</p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="https://app.pricentrix.com/login"
                className="hover:text-white transition-colors"
              >
                {t('login')}
              </a>
              <a
                href="https://app.pricentrix.com/signup"
                className="hover:text-white transition-colors"
              >
                {t('signup')}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
          <p>
            © {year} Pricentrix. {t('rights')}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => switchLocale('es')}
              className={`px-2 py-1 rounded transition-colors ${locale === 'es' ? 'text-white' : 'hover:text-white'}`}
            >
              ES
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={`px-2 py-1 rounded transition-colors ${locale === 'en' ? 'text-white' : 'hover:text-white'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
