import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import { HOME_FAQS } from './lib/faqs';
import { JsonLd, PRODUCT_ID, faqNode, pageGraph, productNode } from './lib/seo';

const title = 'TRIFHAT™ Hidden Travel Pouch with Find My Tracking and RFID Protection';
const description = 'The ultra-slim travel pouch with built-in Apple Find My and Google Find Hub tracking, left-behind alerts, a cut-resistant build and RFID shielding. $320, free shipping, 30-day returns.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: '/', title, description, images: [{ url: '/images/trifhat-product.jpg', width: 1024, height: 1024, alt: 'TRIFHAT travel pouch' }] },
};

const ld = pageGraph({ path: '/', name: title, description, about: PRODUCT_ID, extra: [productNode(), faqNode('/', HOME_FAQS)] });

export default function Page() {
  return <><JsonLd data={ld} /><HomeClient /></>;
}
