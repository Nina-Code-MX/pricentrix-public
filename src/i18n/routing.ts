import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed', // / = es, /en = en
  pathnames: {
    '/': '/',
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/contact': {
      es: '/contacto',
      en: '/contact',
    },
    '/free-trial': {
      es: '/prueba-gratis',
      en: '/free-trial',
    },
  },
});

export type Locale = (typeof routing.locales)[number];

// Locale-aware navigation helpers — use these instead of next/link / next/navigation
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
