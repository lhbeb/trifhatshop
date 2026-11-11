/** @type {import('next').NextConfig} */

// Content Security Policy: allows Stripe.js, Stripe embedded checkout (incl. Link, Apple Pay,
// Google Pay, Amazon Pay inside Stripe's iframes) and Stripe's API.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self' https://checkout.stripe.com https://*.stripe.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://*.js.stripe.com https://checkout.stripe.com",
  "frame-src 'self' https://js.stripe.com https://*.js.stripe.com https://hooks.stripe.com https://checkout.stripe.com https://*.stripe.com https://*.link.com https://pay.google.com",
  "connect-src 'self' https://api.stripe.com https://*.stripe.com https://merchant-ui-api.stripe.com https://*.link.com",
  "img-src 'self' data: blob: https:",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "worker-src 'self' blob:",
].join('; ');

const nextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'Content-Security-Policy', value: csp }] }];
  },
};

export default nextConfig;
