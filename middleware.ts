import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './src/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/prueba-gratuita' || pathname === '/prueba-gratuita/') {
    const url = request.nextUrl.clone();
    url.pathname = '/prueba-gratis';
    return NextResponse.redirect(url, 301);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|favicon.ico|.*\\..*).*)', '/'],
};
