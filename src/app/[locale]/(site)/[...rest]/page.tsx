import type { Metadata } from 'next';
import { NotFoundContent } from '@/components/NotFoundContent';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CatchAll() {
  return <NotFoundContent />;
}
