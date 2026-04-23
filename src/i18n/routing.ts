import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed', // / = es, /en = en
  localeDetection: false, // never redirect based on Accept-Language header
  pathnames: {
    '/': '/',
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/documentation': {
      es: '/documentacion',
      en: '/documentation',
    },
    '/contact': {
      es: '/contacto',
      en: '/contact',
    },
    '/free-trial': {
      es: '/prueba-gratis',
      en: '/free-trial',
    },
    '/pricing': {
      es: '/precios',
      en: '/pricing',
    },
    '/privacy': {
      es: '/privacidad',
      en: '/privacy',
    },
    '/terms': {
      es: '/terminos',
      en: '/terms',
    },
  },
});

export type Locale = (typeof routing.locales)[number];

// Locale-aware navigation helpers — use these instead of next/link / next/navigation
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
