'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname(); // current path without locale prefix
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-content-primary tracking-tight">
          Pricentrix
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/#features"
            className="text-sm text-content-secondary hover:text-brand-600 transition-colors"
          >
            {t('product')}
          </Link>
          <Link
            href="/blog"
            className="text-sm text-content-secondary hover:text-brand-600 transition-colors"
          >
            {t('blog')}
          </Link>
          <Link
            href="/contacto"
            className="text-sm text-content-secondary hover:text-brand-600 transition-colors"
          >
            {t('contact')}
          </Link>
        </div>

        {/* Right side: locale toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Locale switcher — preserves current page */}
          <div className="flex items-center gap-1 text-xs font-medium">
            <Link
              href={pathname}
              locale="es"
              className={`px-2 py-1 rounded transition-colors ${locale === 'es' ? 'bg-brand-100 text-brand-700' : 'text-content-muted hover:text-content-primary'}`}
            >
              ES
            </Link>
            <Link
              href={pathname}
              locale="en"
              className={`px-2 py-1 rounded transition-colors ${locale === 'en' ? 'bg-brand-100 text-brand-700' : 'text-content-muted hover:text-content-primary'}`}
            >
              EN
            </Link>
          </div>
          <Link
            href="/contacto"
            className="text-sm px-4 py-2 rounded-lg bg-brand-700 text-white hover:bg-brand-800 transition-colors font-medium"
          >
            {t('start')}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-content-secondary"
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

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-5 py-4 flex flex-col gap-4">
          <Link
            href="/#features"
            className="text-sm text-content-secondary"
            onClick={() => setOpen(false)}
          >
            {t('product')}
          </Link>
          <Link
            href="/blog"
            className="text-sm text-content-secondary"
            onClick={() => setOpen(false)}
          >
            {t('blog')}
          </Link>
          <Link
            href="/contacto"
            className="text-sm text-content-secondary"
            onClick={() => setOpen(false)}
          >
            {t('contact')}
          </Link>
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            <Link
              href={pathname}
              locale="es"
              className={`text-xs px-2 py-1 rounded ${locale === 'es' ? 'bg-brand-100 text-brand-700' : 'text-content-muted'}`}
            >
              ES
            </Link>
            <Link
              href={pathname}
              locale="en"
              className={`text-xs px-2 py-1 rounded ${locale === 'en' ? 'bg-brand-100 text-brand-700' : 'text-content-muted'}`}
            >
              EN
            </Link>
          </div>
          <Link
            href="/contacto"
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
