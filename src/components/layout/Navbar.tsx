'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Link, usePathname } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { getLocalizedUrl } from '@/lib/locale-url';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPageScrolled, setIsPageScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  const switchLocale = (next: Locale) => router.replace(getLocalizedUrl(pathname, next));

  // Pages with a full-bleed dark Hero start transparent; all others start opaque white.
  const hasHero = (pathname as string) === '/';

  // Track scroll position — only updated from the event callback (no direct setState in effect body).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setIsPageScrolled(false);
  }

  useEffect(() => {
    const onScroll = () => setIsPageScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrolled = !hasHero || isPageScrolled;

  const headerBg = scrolled
    ? 'bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm'
    : 'bg-transparent border-b border-transparent';
  const linkColor = scrolled
    ? 'text-content-secondary hover:text-brand-600'
    : 'text-white/90 hover:text-white';
  const logoColor = scrolled ? 'text-content-primary' : 'text-white';
  const burgerColor = scrolled ? 'text-content-secondary' : 'text-white';
  const localeActive = scrolled ? 'bg-brand-100 text-brand-700' : 'bg-white/20 text-white';
  const localeInactive = scrolled
    ? 'text-content-muted hover:text-content-primary'
    : 'text-white/70 hover:text-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link
          href="/"
          className={`font-bold text-xl tracking-tight transition-colors duration-300 ${logoColor}`}
        >
          <Image
            src={scrolled ? '/images/logo/logo-256x73.png' : '/images/logo/logo-256x73-light.png'}
            alt="Pricentrix logo"
            width={175}
            height={50}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href={{ pathname: '/', hash: 'features' }}
            className={`text-sm transition-colors duration-300 ${linkColor}`}
          >
            {t('product')}
          </Link>
          <Link
            href="/documentation"
            className={`text-sm transition-colors duration-300 ${linkColor}`}
          >
            {t('documentation')}
          </Link>
          <Link href="/blog" className={`text-sm transition-colors duration-300 ${linkColor}`}>
            {t('blog')}
          </Link>
          <Link href="/pricing" className={`text-sm transition-colors duration-300 ${linkColor}`}>
            {t('pricing')}
          </Link>
          <Link href="/contact" className={`text-sm transition-colors duration-300 ${linkColor}`}>
            {t('contact')}
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-medium">
            <button
              onClick={() => switchLocale('es')}
              className={`px-2 py-1 rounded transition-colors duration-300 ${locale === 'es' ? localeActive : localeInactive}`}
            >
              ES
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={`px-2 py-1 rounded transition-colors duration-300 ${locale === 'en' ? localeActive : localeInactive}`}
            >
              EN
            </button>
          </div>
          <Link
            href="/free-trial"
            className={`text-sm px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              scrolled
                ? 'bg-brand-700 text-white hover:bg-brand-800'
                : 'bg-white text-brand-700 hover:bg-white/90'
            }`}
          >
            {t('start')}
          </Link>
        </div>

        <button
          className={`md:hidden p-2 transition-colors duration-300 ${burgerColor}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-current mb-1 transition-transform ${open ? 'rotate-45 translate-y-1.5' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-current mb-1 transition-opacity ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-current transition-transform ${open ? '-rotate-45 -translate-y-1.5' : ''}`}
          />
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-5 py-4 flex flex-col gap-4">
          <Link
            href={{ pathname: '/', hash: 'features' }}
            className="text-sm text-content-secondary"
            onClick={() => setOpen(false)}
          >
            {t('product')}
          </Link>
          <Link
            href="/documentation"
            className="text-sm text-content-secondary"
            onClick={() => setOpen(false)}
          >
            {t('documentation')}
          </Link>
          <Link
            href="/blog"
            className="text-sm text-content-secondary"
            onClick={() => setOpen(false)}
          >
            {t('blog')}
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-content-secondary"
            onClick={() => setOpen(false)}
          >
            {t('pricing')}
          </Link>
          <Link
            href="/contact"
            className="text-sm text-content-secondary"
            onClick={() => setOpen(false)}
          >
            {t('contact')}
          </Link>
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            <button
              onClick={() => {
                switchLocale('es');
                setOpen(false);
              }}
              className={`text-xs px-2 py-1 rounded ${locale === 'es' ? 'bg-brand-100 text-brand-700' : 'text-content-muted'}`}
            >
              ES
            </button>
            <button
              onClick={() => {
                switchLocale('en');
                setOpen(false);
              }}
              className={`text-xs px-2 py-1 rounded ${locale === 'en' ? 'bg-brand-100 text-brand-700' : 'text-content-muted'}`}
            >
              EN
            </button>
          </div>
          <Link
            href="/free-trial"
            className="text-sm px-4 py-2 rounded-lg bg-brand-700 text-white text-center font-medium"
            onClick={() => setOpen(false)}
          >
            {t('start')}
          </Link>
        </div>
      )}
    </header>
  );
}
