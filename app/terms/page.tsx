import Image from 'next/image';
import type { Metadata } from 'next';
import { JsonLd, pageGraph } from '../lib/seo';


const title = 'Terms of service';
const description = 'The terms that apply to purchases from trifhat.shop, operated by TRIFHAT LLC.';
export const metadata: Metadata = { title, description, alternates: { canonical: '/terms' }, openGraph: { url: '/terms', title, description } };
const ld = pageGraph({ path: '/terms', name: title, description, type: 'WebPage', });

export default function TermsPage() {
  return <><JsonLd data={ld} /><div className="simple-page"><nav className="simple-nav"><a href="/"><img className="brand-logo" src="/trifhat logo.svg" alt="TRIFHAT" width={170} height={33} /></a><a href="/">Back to store</a></nav><main className="simple-main"><p className="simple-kicker">Terms of service</p><h1>Clear terms for every order.</h1><p>By ordering from TRIFHAT, you agree to provide accurate delivery and contact information and to use the products lawfully.</p><h2>Orders and payment</h2><p>Orders are subject to availability and payment authorization. Stripe processes payments securely on our behalf.</p><h2>Product information</h2><p>We make reasonable efforts to keep product descriptions, availability, and pricing accurate. Minor variations in color or packaging may occur.</p><h2>Support</h2><p>If something is wrong with your order, contact contact@trifhat.shop.</p></main></div></>;
}
