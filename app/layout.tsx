import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TRIFHAT™ | Secure Travel Gear',
  description: 'The ultra-slim RFID-blocking travel pouch designed to keep your passport, cards, and cash secure.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://trifhat.shop'),
  alternates: { canonical: 'https://trifhat.shop' },
  icons: { icon: '/trifhat logo.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
