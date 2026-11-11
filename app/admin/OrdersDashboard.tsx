'use client';

import { useMemo, useState } from 'react';
import type { Order, OrderStatus } from '../lib/orders';

const STATUS_LABEL: Record<OrderStatus, string> = { paid: 'Paid', unpaid: 'Unpaid', refunded: 'Refunded', expired: 'Abandoned', open: 'In checkout' };
const FILTERS: { id: 'all' | OrderStatus; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'paid', label: 'Paid' },
  { id: 'open', label: 'In checkout' },
  { id: 'expired', label: 'Abandoned' },
  { id: 'refunded', label: 'Refunded' },
];

const money = (amount: number, currency = 'USD') => new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
const dateTime = (iso: string) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(iso));

function toCsv(orders: Order[]) {
  const head = ['Order', 'Date', 'Status', 'Bundle', 'Amount', 'Currency', 'Name', 'Email', 'Phone', 'Address', 'City', 'State', 'Postal code', 'Country', 'Stripe session'];
  const rows = orders.map(o => [o.number, o.createdAt, STATUS_LABEL[o.status], o.bundle, o.amount.toFixed(2), o.currency, o.customer.name, o.customer.email, o.customer.phone,
    [o.shipping?.line1, o.shipping?.line2].filter(Boolean).join(', '), o.shipping?.city || '', o.shipping?.state || '', o.shipping?.postalCode || '', o.shipping?.country || '', o.id]);
  return [head, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
}

export default function OrdersDashboard({ orders, error, loadedAt }: { orders: Order[]; error: string; loadedAt: string }) {
  const [filter, setFilter] = useState<'all' | OrderStatus>('all');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter(o => (filter === 'all' || o.status === filter) && (!q || [o.number, o.id, o.customer.name, o.customer.email, o.customer.phone, o.shipping?.city, o.shipping?.country].some(v => v?.toLowerCase().includes(q))));
  }, [orders, filter, query]);

  const paid = orders.filter(o => o.status === 'paid');
  const revenue = paid.reduce((sum, o) => sum + o.amount, 0);
  const units = paid.reduce((sum, o) => sum + o.quantity, 0);
  const open = orders.find(o => o.id === openId) || null;

  function exportCsv() {
    const blob = new Blob([toCsv(visible)], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `trifhat-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function signOut() {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.assign('/admin/login');
  }

  return (
    <div className="admin">
      <header className="admin-bar">
        <a href="/admin" aria-label="TRIFHAT admin"><img className="brand-logo" src="/trifhat logo.svg" alt="TRIFHAT" width={130} height={25} /></a>
        <span className="admin-bar-title">Orders</span>
        <div className="admin-bar-actions">
          <a href="/" target="_blank" rel="noreferrer">View store</a>
          <button type="button" onClick={signOut}>Sign out</button>
        </div>
      </header>

      <main className="admin-main">
        <section className="admin-stats" aria-label="Summary">
          <div><span>Revenue (paid)</span><b>{money(revenue)}</b></div>
          <div><span>Paid orders</span><b>{paid.length}</b></div>
          <div><span>Pouches sold</span><b>{units}</b></div>
          <div><span>All checkouts</span><b>{orders.length}</b></div>
        </section>

        <div className="admin-tools">
          <div className="admin-filters" role="tablist" aria-label="Filter by status">
            {FILTERS.map(f => (
              <button key={f.id} type="button" role="tab" aria-selected={filter === f.id} className={filter === f.id ? 'active' : ''} onClick={() => setFilter(f.id)}>
                {f.label}<small>{f.id === 'all' ? orders.length : orders.filter(o => o.status === f.id).length}</small>
              </button>
            ))}
          </div>
          <input className="admin-search" type="search" placeholder="Search name, email, order, city…" value={query} onChange={e => setQuery(e.target.value)} aria-label="Search orders" />
          <button type="button" className="admin-export" onClick={exportCsv} disabled={!visible.length}>Export CSV</button>
        </div>

        {error && <p className="admin-error" role="alert">{error}</p>}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Order</th><th>Date</th><th>Customer</th><th>Ship to</th><th>Bundle</th><th>Status</th><th className="num">Total</th></tr>
            </thead>
            <tbody>
              {visible.map(o => (
                <tr key={o.id} onClick={() => setOpenId(o.id)} tabIndex={0} onKeyDown={e => e.key === 'Enter' && setOpenId(o.id)}>
                  <td className="mono">{o.number}</td>
                  <td>{dateTime(o.createdAt)}</td>
                  <td><b>{o.customer.name || '—'}</b><small>{o.customer.email}</small></td>
                  <td>{o.shipping ? `${o.shipping.city}${o.shipping.state ? `, ${o.shipping.state}` : ''}, ${o.shipping.country}` : '—'}</td>
                  <td>{o.bundle}</td>
                  <td><span className={`pill pill-${o.status}`}>{STATUS_LABEL[o.status]}</span></td>
                  <td className="num">{money(o.amount, o.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!visible.length && !error && (
            <div className="admin-empty">
              <b>{orders.length ? 'No orders match this filter.' : 'No orders yet.'}</b>
              <p>{orders.length ? 'Try another status or clear the search.' : 'Orders appear here as soon as a customer reaches Stripe checkout.'}</p>
            </div>
          )}
        </div>
        <p className="admin-foot">Loaded {dateTime(loadedAt)}. Refresh the page to see new orders.</p>
      </main>

      {open && (
        <div className="admin-drawer-backdrop" onClick={() => setOpenId(null)}>
          <aside className="admin-drawer" role="dialog" aria-modal="true" aria-label={`Order ${open.number}`} onClick={e => e.stopPropagation()}>
            <div className="admin-drawer-head">
              <div><small>Order</small><h2>{open.number}</h2></div>
              <button type="button" onClick={() => setOpenId(null)} aria-label="Close">×</button>
            </div>
            <span className={`pill pill-${open.status}`}>{STATUS_LABEL[open.status]}</span>
            <dl>
              <div><dt>Date</dt><dd>{dateTime(open.createdAt)}</dd></div>
              <div><dt>Bundle</dt><dd>{open.bundle}</dd></div>
              <div><dt>Total</dt><dd>{money(open.amount, open.currency)}</dd></div>
              <div><dt>Customer</dt><dd>{open.customer.name || '—'}</dd></div>
              <div><dt>Email</dt><dd>{open.customer.email ? <a href={`mailto:${open.customer.email}`}>{open.customer.email}</a> : '—'}</dd></div>
              <div><dt>Phone</dt><dd>{open.customer.phone ? <a href={`tel:${open.customer.phone}`}>{open.customer.phone}</a> : '—'}</dd></div>
              <div><dt>Ship to</dt><dd>{open.shipping ? <>{open.shipping.name && <>{open.shipping.name}<br /></>}{open.shipping.line1}{open.shipping.line2 && <><br />{open.shipping.line2}</>}<br />{open.shipping.city}{open.shipping.state ? `, ${open.shipping.state}` : ''} {open.shipping.postalCode}<br />{open.shipping.country}</> : '—'}</dd></div>
              <div><dt>Stripe</dt><dd className="mono">{open.paymentIntent || open.id}</dd></div>
            </dl>
            {open.paymentIntent && (
              <a className="btn btn-primary" href={`https://dashboard.stripe.com/${open.livemode ? '' : 'test/'}payments/${open.paymentIntent}`} target="_blank" rel="noreferrer">Open in Stripe</a>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
