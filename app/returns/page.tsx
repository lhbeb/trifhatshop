import Image from 'next/image';
import type { Metadata } from 'next';
import { JsonLd, pageGraph } from '../lib/seo';


const title = 'Refunds and returns';
const description = 'TRIFHAT offers a 30-day return window. Approved refunds go back to the original payment method.';
export const metadata: Metadata = { title, description, alternates: { canonical: '/returns' }, openGraph: { url: '/returns', title, description } };
const ld = pageGraph({ path: '/returns', name: title, description, type: 'WebPage', });

export default function ReturnsPage() {
  return <><JsonLd data={ld} /><div className="simple-page"><nav className="simple-nav"><a href="/"><img className="brand-logo" src="/trifhat logo.svg" alt="TRIFHAT" width={170} height={33} /></a><a href="/">Back to store</a></nav><main className="simple-main"><p className="simple-kicker">Refunds & returns</p><h1>Simple, fair returns.</h1><p>We want you to feel confident ordering from TRIFHAT.</p><h2>30-day return window</h2><p>Contact contact@trifhat.shop within 30 days of delivery to request return guidance. Please include your order number.</p><h2>Refunds</h2><p>Approved refunds are sent to the original payment method after the returned item is received and reviewed.</p><a className="back-home" href="/contact">Start a return request</a></main></div></>;
}
