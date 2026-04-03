import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  // beforeFiles rewrites map unprefixed Spanish paths to /es/* internally
  // (transparent — URL stays as-is). Required for Next.js 16 dev mode where
  // middleware doesn't rewrite the root path, and as a production safety net.
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/es' },
        { source: '/blog', destination: '/es/blog' },
        { source: '/blog/:slug', destination: '/es/blog/:slug' },
        { source: '/contacto', destination: '/es/contacto' },
      ],
    };
  },
};

export default withNextIntl(nextConfig);
