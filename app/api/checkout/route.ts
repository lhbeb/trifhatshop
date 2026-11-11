import { getStripe } from '../../lib/stripe';
import { NextResponse } from 'next/server';
import { BUNDLES, UNIT_AMOUNT, PRODUCT_NAME, PRODUCT_IMAGE, SHIPPING_COUNTRIES, isBundleId } from '../../lib/checkout';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let bundleId: keyof typeof BUNDLES = 'single';
  try {
    const body = await request.json().catch(() => ({}));
    if (isBundleId(body?.bundleId)) bundleId = body.bundleId;
  } catch {}

  const bundle = BUNDLES[bundleId];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(request.url).origin;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded_page',
      mode: 'payment',
      line_items: [{
        quantity: bundle.quantity,
        price_data: {
          currency: 'usd',
          unit_amount: UNIT_AMOUNT,
          product_data: {
            name: PRODUCT_NAME,
            description: 'Built-in Find My and Find Hub tracking, cut-resistant build, RFID shielding.',
            images: [`https://trifhat.shop${PRODUCT_IMAGE}`],
          },
        },
      }],
      customer_creation: 'always',
      billing_address_collection: 'auto',
      phone_number_collection: { enabled: true },
      shipping_address_collection: { allowed_countries: [...SHIPPING_COUNTRIES] },
      shipping_options: [{
        shipping_rate_data: {
          type: 'fixed_amount',
          display_name: 'Free tracked shipping',
          fixed_amount: { amount: 0, currency: 'usd' },
          delivery_estimate: { minimum: { unit: 'business_day', value: 4 }, maximum: { unit: 'business_day', value: 7 } },
        },
      }],
      custom_text: {
        submit: { message: 'Ships within 24–48 business hours with tracking. 30-day money-back guarantee.' },
      },
      payment_intent_data: {
        description: `${PRODUCT_NAME} × ${bundle.quantity}`,
        metadata: { bundleId, quantity: String(bundle.quantity), source: 'trifhat.shop' },
      },
      metadata: { bundleId, quantity: String(bundle.quantity), source: 'trifhat.shop' },
      return_url: `${baseUrl}/checkout/complete?session_id={CHECKOUT_SESSION_ID}`,
    });
    if (!session.client_secret) throw new Error('Stripe returned no client secret');
    return NextResponse.json({ clientSecret: session.client_secret }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Payment could not start. Please try again in a moment.' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}
