'use client';

import Image from 'next/image';
import PaymentIcons from '../components/PaymentIcons';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
const bundles = { single: { label: '1 Pouch', price: '$320', amount: 32000 }, duo: { label: '2 Pouches', price: '$640', amount: 64000 }, family: { label: '3 Pouches', price: '$960', amount: 96000 } } as const;

/** Loads Stripe's embedded checkout straight away (Stripe collects email, shipping address, phone and payment). */
function CheckoutPageContent() {
  const search = useSearchParams();
  const selected = (search.get('bundle') || 'single') as keyof typeof bundles;
  const bundle = bundles[selected] || bundles.single;
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const options = useMemo(() => ({ clientSecret }), [clientSecret]);

  useEffect(() => {
    let cancelled = false;
    setError('');
    setClientSecret('');
    fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ bundleId: selected }) })
      .then(async response => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.clientSecret) throw new Error(data.error || 'Unable to start checkout.');
        if (!cancelled) setClientSecret(data.clientSecret);
      })
      .catch(err => { if (!cancelled) setError(err instanceof Error ? err.message : 'Unable to start checkout.'); });
    return () => { cancelled = true; };
  }, [selected, attempt]);

  return (
    <div className="checkout-page">
      <nav className="simple-nav"><a href="/" aria-label="TRIFHAT home"><img className="brand-logo" src="/trifhat logo.svg" alt="TRIFHAT" width={170} height={33} /></a><a href="/">Back to store</a></nav>
      <main className="checkout-main">
        <div className="checkout-intro"><p className="simple-kicker">Secure checkout</p><h1>Finish your order.</h1></div>
        <div className="checkout-layout">
          <aside className="checkout-summary">
            <Image src="/images/trifhat-product.jpg" alt="TRIFHAT travel pouch" width={1024} height={1024} />
            <p className="simple-kicker">Your selection</p>
            <h2>TRIFHAT™ RFID Travel Pouch</h2>
            <strong>{bundle.label}</strong>
            <div className="checkout-total"><span>Total</span><b>{bundle.price}</b></div>
            <small>30-day money-back guarantee · Secure Stripe payment</small>
            <PaymentIcons className="payment-icons-light" />
          </aside>
          <div className="stripe-panel">
            {clientSecret ? (
              <EmbeddedCheckoutProvider key={clientSecret} stripe={stripePromise} options={options}><EmbeddedCheckout /></EmbeddedCheckoutProvider>
            ) : error ? (
              <div className="checkout-state" role="alert">
                <h2>Checkout could not load.</h2>
                <p>{error}</p>
                <button className="btn btn-primary" type="button" onClick={() => setAttempt(n => n + 1)}>Try again</button>
              </div>
            ) : (
              <div className="checkout-state" aria-live="polite"><span className="checkout-spinner" aria-hidden="true" /><p>Loading secure payment…</p></div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return <Suspense fallback={<main className="checkout-main"><p className="simple-kicker">Secure checkout</p><h1>Preparing checkout…</h1></main>}><CheckoutPageContent /></Suspense>;
}
