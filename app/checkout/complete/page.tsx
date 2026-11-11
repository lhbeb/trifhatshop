import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Order confirmed', robots: { index: false, follow: false } };

export default function CheckoutCompletePage() {
  return <div className="simple-page"><nav className="simple-nav"><a href="/"><img className="brand-logo" src="/trifhat logo.svg" alt="TRIFHAT" width={170} height={33} /></a></nav><main className="simple-main"><p className="simple-kicker">Order received</p><h1>Thank you for choosing TRIFHAT.</h1><p>Your payment was completed securely. We’ll prepare your order and send tracking details to your email address.</p><a className="back-home" href="/">Return to the store</a></main></div>;
}
