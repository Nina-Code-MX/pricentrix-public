import { notFound } from 'next/navigation';

// Catch-all: any path under [locale] that doesn't match a real page
// calls notFound() to trigger [locale]/not-found.tsx with full site chrome.
export default function CatchAll() {
  notFound();
}
