import Image from 'next/image';
import type { Metadata } from 'next';
import { JsonLd, pageGraph } from '../lib/seo';


const title = 'Shipping and delivery';
const description = 'Orders ship within 24–48 business hours from Roswell, New Mexico, with free shipping on orders over $150 across the United States and Europe. US delivery takes 3–5 business days.';
export const metadata: Metadata = { title, description, alternates: { canonical: '/shipping' }, openGraph: { url: '/shipping', title, description } };
const ld = pageGraph({ path: '/shipping', name: title, description, type: 'WebPage', });

export default function ShippingPage() {
  return <><JsonLd data={ld} /><div className="simple-page"><nav className="simple-nav"><a href="/"><img className="brand-logo" src="/trifhat logo.svg" alt="TRIFHAT" width={170} height={33} /></a><a href="/">Back to store</a></nav><main className="simple-main"><p className="simple-kicker">Shipping & delivery</p><h1>Clear delivery timelines.</h1><p>We prepare orders carefully and provide tracking after dispatch.</p><h2>Processing</h2><p>Orders are prepared within 24–48 business hours, Monday through Friday.</p><h2>Delivery estimates</h2><p>Standard domestic delivery generally arrives within 3–5 business days after dispatch. Carrier delays, weather, and peak-season volume can affect estimates.</p><h2>Tracking</h2><p>Once your order is dispatched, tracking information is sent to the email address provided at checkout.</p><a className="back-home" href="/contact">Questions about delivery? Contact us</a></main></div></>;
}
