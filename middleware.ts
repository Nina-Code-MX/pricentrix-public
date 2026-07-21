import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './src/i18n/routing';

const handleI18nRouting = createMiddleware(routing);
const THANK_YOU_COOKIE = 'post_register_thank_you';

function stripLocalePrefix(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);

  if (
    segments.length > 0 &&
    routing.locales.includes(segments[0] as (typeof routing.locales)[number])
  ) {
    return `/${segments.slice(1).join('/')}` || '/';
  }

  return pathname;
}

function isThankYouPath(pathname: string) {
  const normalizedPath = stripLocalePrefix(pathname);
  return normalizedPath === '/gracias' || normalizedPath === '/thank-you';
}

function getFreeTrialPath(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const localeSegment =
    segments.length > 0 && routing.locales.includes(segments[0] as (typeof routing.locales)[number])
      ? segments[0]
      : null;

  if (localeSegment === 'en') {
    return '/en/free-trial';
  }

  return '/prueba-gratis';
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/prueba-gratuita' || pathname === '/prueba-gratuita/') {
    const url = request.nextUrl.clone();
    url.pathname = '/prueba-gratis';
    return NextResponse.redirect(url, 301);
  }

  if (pathname === '/documentacion' || pathname === '/documentacion/') {
    const url = request.nextUrl.clone();
    url.pathname = '/es/documentation';
    return NextResponse.rewrite(url);
  }

  if (isThankYouPath(pathname)) {
    const hasThankYouAccess = request.cookies.get(THANK_YOU_COOKIE)?.value === '1';

    if (!hasThankYouAccess) {
      const url = request.nextUrl.clone();
      url.pathname = getFreeTrialPath(pathname);
      url.search = '';
      return NextResponse.redirect(url, 302);
    }

    const response = handleI18nRouting(request);
    response.cookies.delete(THANK_YOU_COOKIE);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    response.headers.set('Cache-Control', 'private, no-store, max-age=0');
    return response;
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|favicon.ico|.*\\..*).*)', '/'],
};
