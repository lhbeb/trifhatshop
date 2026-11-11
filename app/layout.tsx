import type { Metadata } from 'next';
import './globals.css';
import SiteFooter from './components/SiteFooter';
import FooterGate from './components/FooterGate';
import { JsonLd, siteGraph } from './lib/seo';

export const metadata: Metadata = {
  title: { default: 'TRIFHAT™ | Secure Travel Gear', template: '%s | TRIFHAT™' },
  description: 'The ultra-slim travel pouch with built-in Find My and Find Hub tracking, a cut-resistant build and RFID shielding.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://trifhat.shop'),
  openGraph: { siteName: 'TRIFHAT', locale: 'en_US', type: 'website', images: ['/images/trifhat-product.jpg'] },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/trifhat logo.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={siteGraph} />
        {children}
        <FooterGate><SiteFooter /></FooterGate>
      </body>
    </html>
  );
}
