// Fallback for routes that don't match any locale segment at all.
// next-intl middleware will redirect most cases, but this covers the rest.
import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="es">
      <body className="min-h-screen flex items-center justify-center bg-white font-sans">
        <div className="text-center px-5">
          <div className="text-8xl font-extrabold text-blue-700 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Página no encontrada</h1>
          <p className="text-gray-500 mb-8">Page not found</p>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors"
          >
            ← Inicio / Home
          </Link>
        </div>
      </body>
    </html>
  );
}
