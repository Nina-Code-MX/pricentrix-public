import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  // Dev-only: Next.js 16 middleware doesn't rewrite unprefixed paths in dev mode.
  // These rewrites let /,  /blog, etc. resolve to the es locale during `next dev`.
  // In production the middleware handles locale routing — rewrites must be absent
  // to avoid conflicting with next-intl's usePathname (which would see /es instead of /).
  async rewrites() {
    if (process.env.NODE_ENV === 'production') return { beforeFiles: [] };
    return {
      beforeFiles: [
        { source: '/', destination: '/es' },
        { source: '/blog', destination: '/es/blog' },
        { source: '/blog/:slug', destination: '/es/blog/:slug' },
        { source: '/contacto', destination: '/es/contact' },
        { source: '/prueba-gratis', destination: '/es/free-trial' },
        { source: '/privacidad', destination: '/es/privacy' },
        { source: '/terminos', destination: '/es/terms' },
      ],
    };
  },
};

export default withNextIntl(nextConfig);
