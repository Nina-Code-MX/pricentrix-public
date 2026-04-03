import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const base = locale === 'es' ? '' : `/${locale}`;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-800 text-gray-400 pt-16 pb-8 mt-auto">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-white font-bold text-lg mb-3">Pricentrix</p>
            <p className="text-sm leading-relaxed">{t('tagline')}</p>
          </div>

          {/* Product */}
          <div>
            <p className="text-white font-semibold text-sm mb-3">{t('product')}</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href={`${base}/#features`} className="hover:text-white transition-colors">{t('monitoring')}</Link>
              <Link href={`${base}/#features`} className="hover:text-white transition-colors">{t('matching')}</Link>
              <Link href={`${base}/#features`} className="hover:text-white transition-colors">{t('reports')}</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-white font-semibold text-sm mb-3">{t('company')}</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href={`${base}/contacto`} className="hover:text-white transition-colors">{t('contact')}</Link>
              <Link href={`${base}/contacto`} className="hover:text-white transition-colors">{t('demo')}</Link>
              <Link href={`${base}/contacto`} className="hover:text-white transition-colors">{t('support')}</Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <p className="text-white font-semibold text-sm mb-3">{t('account')}</p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="https://app.pricentrix.com/login" className="hover:text-white transition-colors">{t('login')}</a>
              <a href="https://app.pricentrix.com/signup" className="hover:text-white transition-colors">{t('signup')}</a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
          <p>© {year} Pricentrix. {t('rights')}</p>
          <div className="flex gap-3">
            <Link href="/" className={`px-2 py-1 rounded transition-colors ${locale === 'es' ? 'text-white' : 'hover:text-white'}`}>ES</Link>
            <Link href="/en" className={`px-2 py-1 rounded transition-colors ${locale === 'en' ? 'text-white' : 'hover:text-white'}`}>EN</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
