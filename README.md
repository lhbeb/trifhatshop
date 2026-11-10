# TRIFHAT storefront

Next.js rebuild of the TRIFHAT Shopify storefront, prepared for Vercel.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```

The exported Shopify archive is kept locally in `_source_20261110/` as a reference and is excluded from version control.

The static Shopify export did not include a live checkout endpoint, so checkout is implemented with Stripe Checkout Sessions instead.

## Stripe checkout

The order button now creates a Stripe Checkout Session for the selected bundle. Add these Vercel environment variables before using payments:

```env
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_BASE_URL=https://your-vercel-domain.vercel.app
```

Use `sk_test_...` and `pk_test_...` locally. The delivery form creates a Stripe customer, then loads Stripe Embedded Checkout. The server route never exposes the secret key to the browser. Set `NEXT_PUBLIC_BASE_URL=https://trifhat.shop` in production.
