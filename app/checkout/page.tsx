'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useMemo, useState } from 'react';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Stripe test-mode publishable key, hardcoded on request (no env var).
const STRIPE_TEST_PUBLISHABLE_KEY = 'pk_test_51UHaDLRo2TKeAOq8qGAsGGvgoics9p36je20qoTk2Yj0SY7RAFitIGd6fDUcMfF8pIUCeVZcyj2fJnQznrJGSnO700uglueIkS';
const stripePromise = loadStripe(STRIPE_TEST_PUBLISHABLE_KEY);
const bundles = { single: { label: '1 Pouch', price: '$320', amount: 32000 }, duo: { label: '2 Pouches', price: '$640', amount: 64000 }, family: { label: '3 Pouches', price: '$960', amount: 96000 } } as const;
type FormState = { name: string; email: string; address: string; city: string; state: string; postalCode: string; country: string };

function CheckoutPageContent() {
  const search = useSearchParams();
  const selected = (search.get('bundle') || 'single') as keyof typeof bundles;
  const bundle = bundles[selected] || bundles.single;
  const [form, setForm] = useState<FormState>({ name: '', email: '', address: '', city: '', state: '', postalCode: '', country: 'US' });
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const options = useMemo(() => ({ clientSecret }), [clientSecret]);

  function update(field: keyof FormState, value: string) { setForm(current => ({ ...current, [field]: value })); }
  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, bundleId: selected }) });
      const data = await response.json();
      if (!response.ok || !data.clientSecret) throw new Error(data.error || 'Unable to start checkout.');
      setClientSecret(data.clientSecret);
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to start checkout.'); }
    finally { setLoading(false); }
  }

  return <div className="checkout-page"><nav className="simple-nav"><a href="/" aria-label="TRIFHAT home"><Image className="brand-logo" src="/trifhat-logo-ink.svg" alt="TRIFHAT" width={170} height={33} unoptimized /></a><a href="/">Back to store</a></nav><main className="checkout-main"><div className="checkout-intro"><p className="simple-kicker">Secure checkout · Stripe test mode</p><h1>Finish your order.</h1><p>Enter your delivery details first. Stripe will then securely collect payment without exposing your card details to TRIFHAT.</p></div><div className="checkout-layout"><aside className="checkout-summary"><Image src="/images/trifhat-product.jpg" alt="TRIFHAT travel pouch" width={1024} height={1024} /><p className="simple-kicker">Your selection</p><h2>TRIFHAT™ RFID Travel Pouch</h2><strong>{bundle.label}</strong><div className="checkout-total"><span>Total</span><b>{bundle.price}</b></div><small>30-day money-back guarantee · Secure Stripe payment</small></aside>{clientSecret ? <div className="stripe-panel"><EmbeddedCheckoutProvider stripe={stripePromise} options={options}><EmbeddedCheckout /></EmbeddedCheckoutProvider></div> : <form className="delivery-form" onSubmit={submit}><h2>Delivery details</h2><p>We’ll use these details to prepare your order.</p><label>Full name<input required value={form.name} onChange={e => update('name', e.target.value)} autoComplete="name" /></label><label>Email address<input required type="email" value={form.email} onChange={e => update('email', e.target.value)} autoComplete="email" /></label><label>Street address<input required value={form.address} onChange={e => update('address', e.target.value)} autoComplete="street-address" /></label><div className="form-row"><label>City<input required value={form.city} onChange={e => update('city', e.target.value)} autoComplete="address-level2" /></label><label>State / region<input required value={form.state} onChange={e => update('state', e.target.value)} autoComplete="address-level1" /></label></div><div className="form-row"><label>Postal code<input required value={form.postalCode} onChange={e => update('postalCode', e.target.value)} autoComplete="postal-code" /></label><label>Country<select value={form.country} onChange={e => update('country', e.target.value)}><option value="US">United States</option><option value="CA">Canada</option><option value="AU">Australia</option><option value="GB">United Kingdom</option><option value="AT">Austria</option><option value="BE">Belgium</option><option value="BG">Bulgaria</option><option value="HR">Croatia</option><option value="CY">Cyprus</option><option value="CZ">Czechia</option><option value="DK">Denmark</option><option value="EE">Estonia</option><option value="FI">Finland</option><option value="FR">France</option><option value="DE">Germany</option><option value="GR">Greece</option><option value="HU">Hungary</option><option value="IE">Ireland</option><option value="IT">Italy</option><option value="LV">Latvia</option><option value="LT">Lithuania</option><option value="LU">Luxembourg</option><option value="MT">Malta</option><option value="NL">Netherlands</option><option value="NO">Norway</option><option value="PL">Poland</option><option value="PT">Portugal</option><option value="RO">Romania</option><option value="SK">Slovakia</option><option value="SI">Slovenia</option><option value="ES">Spain</option><option value="SE">Sweden</option><option value="CH">Switzerland</option></select></label></div>{error && <p className="checkout-error" role="alert">{error}</p>}<button className="buy-button" type="submit" disabled={loading}>{loading ? 'Preparing secure payment…' : 'Continue to secure payment'}</button><small className="form-note">You’ll review the final payment details in Stripe’s secure checkout.</small></form>}</div></main></div>;
}

export default function CheckoutPage() {
  return <Suspense fallback={<main className="checkout-main"><p className="simple-kicker">Secure checkout</p><h1>Preparing checkout…</h1></main>}><CheckoutPageContent /></Suspense>;
}
