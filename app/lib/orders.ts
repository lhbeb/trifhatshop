import type Stripe from 'stripe';
import { getStripe } from './stripe';

export type OrderStatus = 'paid' | 'unpaid' | 'refunded' | 'expired' | 'open';

export interface Order {
  id: string;
  number: string;
  createdAt: string;
  status: OrderStatus;
  bundle: string;
  quantity: number;
  amount: number;
  currency: string;
  customer: { name: string; email: string; phone: string };
  shipping: { name: string; line1: string; line2: string; city: string; state: string; postalCode: string; country: string } | null;
  paymentIntent: string | null;
  livemode: boolean;
}

const BUNDLES: Record<string, { label: string; quantity: number }> = {
  single: { label: '1 Pouch', quantity: 1 },
  duo: { label: '2 Pouches', quantity: 2 },
  family: { label: '3 Pouches', quantity: 3 },
};

function statusOf(session: Stripe.Checkout.Session): OrderStatus {
  const pi = session.payment_intent;
  if (pi && typeof pi === 'object' && pi.latest_charge && typeof pi.latest_charge === 'object' && pi.latest_charge.refunded) return 'refunded';
  if (session.status === 'expired') return 'expired';
  if (session.payment_status === 'paid' || session.payment_status === 'no_payment_required') return 'paid';
  if (session.status === 'open') return 'open';
  return 'unpaid';
}

function toOrder(session: Stripe.Checkout.Session): Order {
  const bundle = BUNDLES[session.metadata?.bundleId || ''] || BUNDLES.single;
  const customer = session.customer && typeof session.customer === 'object' && !('deleted' in session.customer) ? session.customer : null;
  const ship = session.collected_information?.shipping_details;
  const addr = ship?.address || customer?.address || session.customer_details?.address || null;
  return {
    id: session.id,
    number: `TF-${session.created.toString(36).toUpperCase()}`,
    createdAt: new Date(session.created * 1000).toISOString(),
    status: statusOf(session),
    bundle: bundle.label,
    quantity: bundle.quantity,
    amount: (session.amount_total || 0) / 100,
    currency: (session.currency || 'usd').toUpperCase(),
    customer: {
      name: session.customer_details?.name || customer?.name || ship?.name || '',
      email: session.customer_details?.email || customer?.email || '',
      phone: session.customer_details?.phone || customer?.phone || session.metadata?.phone || '',
    },
    shipping: addr ? {
      name: ship?.name || customer?.name || session.customer_details?.name || '',
      line1: addr.line1 || '', line2: addr.line2 || '', city: addr.city || '', state: addr.state || '',
      postalCode: addr.postal_code || '', country: addr.country || '',
    } : null,
    paymentIntent: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id || null,
    livemode: session.livemode,
  };
}

/**
 * All TRIFHAT orders, newest first. Source: Stripe Checkout Sessions created by this store.
 * To plug in another data source later, return the same Order shape from here.
 */
export async function listOrders(max = 300): Promise<Order[]> {
  const stripe = getStripe();
  const orders: Order[] = [];
  let startingAfter: string | undefined;
  while (orders.length < max) {
    const page = await stripe.checkout.sessions.list({
      limit: 100,
      starting_after: startingAfter,
      expand: ['data.customer', 'data.payment_intent.latest_charge'],
    });
    for (const session of page.data) {
      if (session.metadata?.source !== 'trifhat.shop') continue;
      orders.push(toOrder(session));
    }
    if (!page.has_more || page.data.length === 0) break;
    startingAfter = page.data[page.data.length - 1].id;
  }
  return orders;
}
