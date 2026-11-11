import type { Metadata } from 'next';
import './globals.css';
import SiteFooter from './components/SiteFooter';
import { BUSINESS } from './components/business';

export const metadata: Metadata = {
  title: 'TRIFHAT™ | Secure Travel Gear',
  description: 'The ultra-slim travel pouch with built-in Find My and Find Hub tracking, a cut-resistant build and RFID shielding.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://trifhat.shop'),
  alternates: { canonical: 'https://trifhat.shop' },
  icons: { icon: '/trifhat-logo-ink.svg' },
};

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: BUSINESS.legalName,
  url: BUSINESS.url,
  email: BUSINESS.email,
  telephone: BUSINESS.phone,
  founder: { '@type': 'Person', name: BUSINESS.owner },
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    postalCode: BUSINESS.postalCode,
    addressCountry: BUSINESS.countryCode,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
