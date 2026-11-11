import Image from 'next/image';

export default function TermsPage() {
  return <div className="simple-page"><nav className="simple-nav"><a href="/"><Image className="brand-logo" src="/trifhat-logo-ink.svg" alt="TRIFHAT" width={170} height={33} unoptimized /></a><a href="/">Back to store</a></nav><main className="simple-main"><p className="simple-kicker">Terms of service</p><h1>Clear terms for every order.</h1><p>By ordering from TRIFHAT, you agree to provide accurate delivery and contact information and to use the products lawfully.</p><h2>Orders and payment</h2><p>Orders are subject to availability and payment authorization. Stripe processes payments securely on our behalf.</p><h2>Product information</h2><p>We make reasonable efforts to keep product descriptions, availability, and pricing accurate. Minor variations in color or packaging may occur.</p><h2>Support</h2><p>If something is wrong with your order, contact support@trifhat.shop.</p></main></div>;
}
