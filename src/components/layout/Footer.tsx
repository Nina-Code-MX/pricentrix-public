'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Link, routing, usePathname } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { getLocalizedUrl } from '@/lib/locale-url';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const year = new Date().getFullYear();

  const resolveSwitchTarget = async (next: Locale): Promise<string> => {
    if (pathname !== '/blog/[slug]') {
      return getLocalizedUrl(pathname, next);
    }

    const segments = window.location.pathname.split('/').filter(Boolean);
    const withoutLocale =
      segments.length > 0 && routing.locales.includes(segments[0] as Locale)
        ? segments.slice(1)
        : segments;

    const rawSlug = withoutLocale[0] === 'blog' ? withoutLocale[1] : undefined;
    if (!rawSlug) {
      return getLocalizedUrl('/blog', next);
    }

    const slug = decodeURIComponent(rawSlug);

    try {
      const query = new URLSearchParams({ slug, from: locale, to: next });
      const res = await fetch(`/api/blog/translate-slug?${query.toString()}`, {
        method: 'GET',
        cache: 'no-store',
      });

      if (res.ok) {
        const data = (await res.json()) as { slug?: string | null };
        if (data.slug) {
          return getLocalizedUrl(`/blog/${data.slug}`, next);
        }
      }
    } catch {
      // Ignore and fallback below.
    }

    return getLocalizedUrl('/blog', next);
  };

  const switchLocale = async (next: Locale) => {
    const target = await resolveSwitchTarget(next);
    router.replace(target);
  };

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
              <Link
                href={{ pathname: '/', hash: 'features' }}
                className="hover:text-white transition-colors"
              >
                {t('monitoring')}
              </Link>
              <Link
                href={{ pathname: '/', hash: 'features' }}
                className="hover:text-white transition-colors"
              >
                {t('matching')}
              </Link>
              <Link
                href={{ pathname: '/', hash: 'features' }}
                className="hover:text-white transition-colors"
              >
                {t('reports')}
              </Link>
            </div>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-3">{t('company')}</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/contact" className="hover:text-white transition-colors">
                {t('contact')}
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                {t('demo')}
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                {t('support')}
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                {t('privacy')}
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                {t('terms')}
              </Link>
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
              <Link href="/free-trial" className="hover:text-white transition-colors">
                {t('signup')}
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
          <p>© 2024 Pricentrix. {t('rights')}</p>
          <div className="flex gap-3">
            <button
              onClick={() => void switchLocale('es')}
              className={`cursor-pointer px-2 py-1 rounded transition-colors ${locale === 'es' ? 'text-white' : 'hover:text-white'}`}
            >
              ES
            </button>
            <button
              onClick={() => void switchLocale('en')}
              className={`cursor-pointer px-2 py-1 rounded transition-colors ${locale === 'en' ? 'text-white' : 'hover:text-white'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
