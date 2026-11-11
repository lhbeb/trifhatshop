'use client';

import { usePathname } from 'next/navigation';

/** Hides the storefront footer on admin pages. */
export default function FooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return <>{children}</>;
}
