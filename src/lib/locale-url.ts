import { routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';

type PathnameConfigValue = string | Record<string, string>;

/**
 * Computes the fully-prefixed, locale-localized URL for a given internal pathname.
 *
 * Works with:
 *  - Simple paths: '/', '/blog', '/contact'
 *  - Translated paths: '/contact' → '/contacto' (es) or '/contact' (en)
 *  - Dynamic paths: '/blog/my-post' matched against '/blog/[slug]'
 *
 * Respects `localePrefix: 'as-needed'` — default locale gets no prefix.
 */
export function getLocalizedUrl(pathname: string, locale: Locale): string {
  const pathnameMap = routing.pathnames as Record<string, PathnameConfigValue>;

  let localizedPath: string | undefined;

  // Direct match (static routes)
  const config = pathnameMap[pathname];
  if (config !== undefined) {
    localizedPath = typeof config === 'string' ? config : (config[locale] ?? pathname);
  }

  // Pattern match for dynamic routes (e.g., /blog/my-post → /blog/[slug])
  if (localizedPath === undefined) {
    for (const [pattern, patternConfig] of Object.entries(pathnameMap)) {
      if (!pattern.includes('[')) continue;
      const regex = new RegExp('^' + pattern.replace(/\[([^\]]+)\]/g, '([^/]+)') + '$');
      const match = regex.exec(pathname);
      if (match) {
        const paramValues = match.slice(1);
        const resolveTemplate = (tpl: string) =>
          tpl.replace(/\[([^\]]+)\]/g, () => paramValues.shift()!);

        if (typeof patternConfig === 'string') {
          localizedPath = resolveTemplate(patternConfig);
        } else {
          localizedPath = resolveTemplate(patternConfig[locale] ?? pattern);
        }
        break;
      }
    }
  }

  if (localizedPath === undefined) {
    localizedPath = pathname;
  }

  // localePrefix: 'as-needed' — default locale has no prefix
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${prefix}${localizedPath}`;
}
