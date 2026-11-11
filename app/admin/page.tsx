import type { Metadata } from 'next';
import { getPlaceholderOrders } from '../lib/orders';
import OrdersDashboard from './OrdersDashboard';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Orders | TRIFHAT admin', robots: { index: false, follow: false } };

/** The dashboard uses local preview data and never calls Stripe for orders. */
export default function AdminPage() {
  const orders = getPlaceholderOrders();
  return <OrdersDashboard orders={orders} error="" loadedAt={new Date().toISOString()} />;
}
