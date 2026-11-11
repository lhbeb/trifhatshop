import Image from 'next/image';
import type { Metadata } from 'next';
import { JsonLd, pageGraph } from '../lib/seo';


const title = 'Privacy policy';
const description = 'How TRIFHAT LLC collects, uses and protects the personal information of trifhat.shop customers.';
export const metadata: Metadata = { title, description, alternates: { canonical: '/privacy' }, openGraph: { url: '/privacy', title, description } };
const ld = pageGraph({ path: '/privacy', name: title, description, type: 'WebPage', });

export default function PrivacyPage() {
  return <><JsonLd data={ld} /><div className="simple-page"><nav className="simple-nav"><a href="/"><img className="brand-logo" src="/trifhat logo.svg" alt="TRIFHAT" width={170} height={33} /></a><a href="/">Back to store</a></nav><main className="simple-main"><p className="simple-kicker">Privacy policy</p><h1>Your information, handled carefully.</h1><p>TRIFHAT uses information needed to process orders, provide support, prevent fraud, and improve the storefront.</p><h2>Information we receive</h2><p>This may include your name, email, shipping details, and order details. Payment card details are handled by Stripe and are not stored by TRIFHAT.</p><h2>Questions</h2><p>For privacy questions, contact contact@trifhat.shop.</p></main></div></>;
}
