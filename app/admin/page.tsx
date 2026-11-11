import type { Metadata } from 'next';
import { listOrders, type Order } from '../lib/orders';
import OrdersDashboard from './OrdersDashboard';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Orders | TRIFHAT admin', robots: { index: false, follow: false } };

export default async function AdminPage() {
  let orders: Order[] = [];
  let error = '';
  try {
    orders = await listOrders();
  } catch (e) {
    console.error('Admin orders load failed:', e);
    error = 'Could not load orders from Stripe. Check the Stripe key and try again.';
  }
  return <OrdersDashboard orders={orders} error={error} loadedAt={new Date().toISOString()} />;
}
