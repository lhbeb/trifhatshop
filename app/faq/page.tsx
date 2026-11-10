import Image from 'next/image';

const questions = [
  ['How does the RFID protection work?', 'The pouch uses electromagnetic shielding fabric designed to help block common 13.56 MHz RFID and NFC signals from reaching compatible cards and passports. It is an additional layer of protection, not a replacement for sensible travel habits.'],
  ['What fits inside the pouch?', 'The slim compartments fit a passport, several cards or IDs, boarding passes, cash, and many standard smartphones. Pack only what you need so the pouch stays comfortable and flat.'],
  ['Will it be comfortable in warm weather?', 'Yes. The rear panel uses breathable mesh and the low-profile design sits close to the body under a shirt or light jacket.'],
  ['How fast do orders ship?', 'Orders are prepared within 24–48 business hours. Standard domestic delivery typically arrives within 3–5 business days after dispatch.'],
  ['What is the return policy?', 'Contact support@trifhat.shop within 30 days of delivery if you change your mind or have a product issue.'],
  ['Is checkout secure?', 'Payments are processed by Stripe. TRIFHAT does not receive or store your full card number.'],
];

export default function FAQPage() {
  return <div className="simple-page"><nav className="simple-nav"><a href="/" aria-label="TRIFHAT home"><Image className="brand-logo" src="/trifhat logo.svg" alt="TRIFHAT" width={170} height={33} /></a><a href="/">Back to store ↗</a></nav><main className="simple-main"><p className="simple-kicker">Questions, answered</p><h1>Travel with fewer worries.</h1><p>Everything you need to know about TRIFHAT, RFID protection, delivery, returns, and secure checkout.</p>{questions.map(([question, answer]) => <section key={question}><h2>{question}</h2><p>{answer}</p></section>)}<a className="back-home" href="/contact">Still need help? Contact us ↗</a></main></div>;
}
