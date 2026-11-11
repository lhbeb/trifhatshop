import type { Metadata } from 'next';
import type Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { getStripe } from '../../lib/stripe';
import { BUSINESS } from '../../components/business';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Order confirmed', robots: { index: false, follow: false } };

const money = (cents: number | null, currency = 'usd') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase() }).format((cents || 0) / 100);

async function loadSession(id: string | undefined) {
  if (!id || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(id)) return null;
  try {
    return await getStripe().checkout.sessions.retrieve(id, { expand: ['line_items'] });
  } catch (error) {
    console.error('Checkout complete lookup failed:', error);
    return null;
  }
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="simple-page">
      <nav className="simple-nav"><a href="/" aria-label="TRIFHAT home"><img className="brand-logo" src="/trifhat logo.svg" alt="TRIFHAT" width={170} height={33} /></a></nav>
      <main className="simple-main">{children}</main>
    </div>
  );
}

export default async function CheckoutCompletePage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const session = await loadSession(session_id);

  // Payment not finished (closed tab, failed card, back button): send them back to checkout.
  if (session?.status === 'open') redirect(`/checkout?bundle=${session.metadata?.bundleId || 'single'}`);

  if (!session || session.status !== 'complete') {
    return (
      <Shell>
        <p className="simple-kicker">Order status</p>
        <h1>We couldn’t find this order.</h1>
        <p>If you completed a payment, your confirmation email from Stripe has the details. For help, contact <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or call <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phoneDisplay}</a>.</p>
        <a className="back-home" href="/">Return to the store</a>
      </Shell>
    );
  }

  const paid = session.payment_status === 'paid';
  const shipping = session.collected_information?.shipping_details;
  const address = shipping?.address;
  const email = session.customer_details?.email;
  const orderNumber = `TRF-${session.id.slice(-8).toUpperCase()}`;
  const items: Stripe.LineItem[] = session.line_items?.data || [];

  return (
    <Shell>
      <p className="simple-kicker">{paid ? 'Order confirmed' : 'Order received'}</p>
      <h1>Thank you for your order.</h1>
      <p>
        {paid ? 'Your payment went through.' : 'Your payment is processing. We’ll email you as soon as it clears.'}{' '}
        We prepare orders within 24–48 business hours and email tracking{email ? <> to <b>{email}</b></> : ''} as soon as it ships.
      </p>

      <section className="order-confirm" aria-label="Order summary">
        <div className="order-confirm-row"><span>Order number</span><b className="mono">{orderNumber}</b></div>
        {items.map(item => (
          <div className="order-confirm-row" key={item.id}><span>{item.description} × {item.quantity}</span><b>{money(item.amount_total, item.currency)}</b></div>
        ))}
        <div className="order-confirm-row"><span>Shipping</span><b>Free</b></div>
        <div className="order-confirm-row order-confirm-total"><span>Total</span><b>{money(session.amount_total, session.currency || 'usd')}</b></div>
        {address && (
          <div className="order-confirm-row order-confirm-address">
            <span>Ships to</span>
            <b>{shipping?.name}<br />{address.line1}{address.line2 ? <><br />{address.line2}</> : null}<br />{address.city}{address.state ? `, ${address.state}` : ''} {address.postal_code}<br />{address.country}</b>
          </div>
        )}
      </section>

      <p>Questions about your order? Email <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or call <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phoneDisplay}</a> with your order number.</p>
      <a className="back-home" href="/">Return to the store</a>
    </Shell>
  );
}
