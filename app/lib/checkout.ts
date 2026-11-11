/** Checkout catalog shared by the checkout page (display) and the API route (charging). Prices in cents. */
export const UNIT_AMOUNT = 32000;
export const PRODUCT_NAME = 'TRIFHAT™ Ultra-Slim RFID Hidden Travel Pouch';
export const PRODUCT_IMAGE = '/images/trifhat-product.jpg';

export const BUNDLES = {
  single: { quantity: 1, label: '1 Pouch', price: '$320' },
  duo: { quantity: 2, label: '2 Pouches', price: '$640' },
  family: { quantity: 3, label: '3 Pouches', price: '$960' },
} as const;

export type BundleId = keyof typeof BUNDLES;
export const isBundleId = (value: unknown): value is BundleId => typeof value === 'string' && value in BUNDLES;

export const SHIPPING_COUNTRIES = ['US', 'CA', 'AU', 'GB', 'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH'] as const;
