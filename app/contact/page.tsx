import Image from 'next/image';
import type { Metadata } from 'next';
import { JsonLd, pageGraph } from '../lib/seo';


const title = 'Contact TRIFHAT';
const description = 'Contact TRIFHAT LLC by email at contact@trifhat.shop or by phone at +1 (562) 451-5530. 204 South Ohio Avenue, Roswell, NM 88203, United States.';
export const metadata: Metadata = { title, description, alternates: { canonical: '/contact' }, openGraph: { url: '/contact', title, description } };
const ld = pageGraph({ path: '/contact', name: title, description, type: 'ContactPage', });

export default function ContactPage() {
  return <><JsonLd data={ld} /><div className="simple-page"><nav className="simple-nav"><a href="/" aria-label="TRIFHAT home"><img className="brand-logo" src="/trifhat logo.svg" alt="TRIFHAT" width={170} height={33} /></a><a href="/">Back to store</a></nav><main className="simple-main"><p className="simple-kicker">Customer support</p><h1>We’re here to help.</h1><p>Have a question about your order, fit, delivery, or return? Send us a message and our support team will get back to you as soon as possible.</p><div className="contact-card"><a href="mailto:contact@trifhat.shop"><small>Email support</small>contact@trifhat.shop</a><a href="tel:+15624515530"><small>Phone support</small>+1 (562) 451-5530</a><div><small>Business address</small>TRIFHAT LLC, Trafeh Chakir<br />204 South Ohio Avenue<br />Roswell, NM 88203<br />United States of America</div><div><small>Support hours</small>Monday–Friday<br />9:00 AM–5:00 PM MT</div><div><small>Order questions</small>Include your order number so we can help you faster.</div><div><small>Returns</small>Contact us within 30 days of delivery for return guidance.</div></div><a className="back-home" href="/faq">Read frequently asked questions</a></main></div></>;
}
