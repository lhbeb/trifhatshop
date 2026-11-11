import { getStripe } from '../../lib/stripe';
import { NextResponse } from 'next/server';

const bundles = {
  single: { name: 'TRIFHAT™ Ultra-Slim RFID Hidden Travel Pouch — 1 Pouch', amount: 32000 },
  duo: { name: 'TRIFHAT™ Ultra-Slim RFID Hidden Travel Pouch — 2 Pouches', amount: 64000 },
  family: { name: 'TRIFHAT™ Ultra-Slim RFID Hidden Travel Pouch — 3 Pouches', amount: 96000 },
} as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const bundle = bundles[body.bundleId as keyof typeof bundles] ?? bundles.single;
    const stripe = getStripe();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://trifhat.shop';
    const session = await stripe.checkout.sessions.create({ ui_mode: 'embedded_page', mode: 'payment', customer_creation: 'always', phone_number_collection: { enabled: true }, billing_address_collection: 'auto', line_items: [{ quantity: 1, price_data: { currency: 'usd', unit_amount: bundle.amount, product_data: { name: bundle.name } } }], shipping_address_collection: { allowed_countries: ['US', 'CA', 'AU', 'GB', 'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH'] }, return_url: `${baseUrl}/checkout/complete?session_id={CHECKOUT_SESSION_ID}`, metadata: { bundleId: body.bundleId in bundles ? body.bundleId : 'single', source: 'trifhat.shop' } });
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Unable to create a secure checkout session.' }, { status: 500 });
  }
}
