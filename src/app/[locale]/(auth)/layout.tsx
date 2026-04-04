import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="h-16 border-b border-gray-100 flex items-center px-6">
        <Link href="/">
          <Image src="/images/logo/logo.svg" alt="Pricentrix" width={140} height={32} />
        </Link>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
