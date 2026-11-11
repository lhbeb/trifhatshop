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
  source: 'placeholder';
}

/**
 * Local admin preview data. The orders dashboard intentionally does not read
 * orders from Stripe. Replace this function with a first-party order-store
 * query when a database-backed order history is introduced.
 */
export function getPlaceholderOrders(): Order[] {
  const start = new Date('2026-11-03T09:00:00.000Z').getTime();
  return Array.from({ length: 55 }, (_, index) => {
    const createdAt = new Date(start + index * 3.5 * 60 * 60 * 1000).toISOString();
    return {
      id: `placeholder-${String(index + 1).padStart(4, '0')}`,
      number: `TF-${String(1001 + index)}`,
      createdAt,
      status: 'paid',
      bundle: '1 Pouch',
      quantity: 1,
      amount: 320,
      currency: 'USD',
      customer: {
        name: `Customer ${String(index + 1).padStart(2, '0')}`,
        email: `customer${index + 1}@example.com`,
        phone: '',
      },
      shipping: {
        name: `Customer ${String(index + 1).padStart(2, '0')}`,
        line1: 'Address collected at checkout',
        line2: '',
        city: 'Pending confirmation',
        state: '',
        postalCode: '',
        country: 'US',
      },
      source: 'placeholder',
    } satisfies Order;
  });
}
