import Image from 'next/image';
import type { Metadata } from 'next';
import { FAQ_PAGE_QUESTIONS as questions } from '../lib/faqs';
import { JsonLd, faqNode, pageGraph } from '../lib/seo';


const title = 'Frequently asked questions';
const description = 'Answers about TRIFHAT RFID protection, what fits in the pouch, delivery times, returns and secure checkout.';
export const metadata: Metadata = { title, description, alternates: { canonical: '/faq' }, openGraph: { url: '/faq', title, description } };
const ld = pageGraph({ path: '/faq', name: title, description, type: 'FAQPage', extra: [faqNode('/faq', questions)] });

export default function FAQPage() {
  return <><JsonLd data={ld} /><div className="simple-page"><nav className="simple-nav"><a href="/" aria-label="TRIFHAT home"><img className="brand-logo" src="/trifhat logo.svg" alt="TRIFHAT" width={170} height={33} /></a><a href="/">Back to store</a></nav><main className="simple-main"><p className="simple-kicker">Questions, answered</p><h1>Travel with fewer worries.</h1><p>Everything you need to know about TRIFHAT, RFID protection, delivery, returns, and secure checkout.</p>{questions.map(([question, answer]) => <section key={question}><h2>{question}</h2><p>{answer}</p></section>)}<a className="back-home" href="/contact">Still need help? Contact us</a></main></div></>;
}
