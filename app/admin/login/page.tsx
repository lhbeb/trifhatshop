'use client';

import { Suspense, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';

function LoginForm() {
  const next = useSearchParams().get('next') || '/admin';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    if (res.ok) {
      window.location.assign(next.startsWith('/admin') ? next : '/admin');
      return;
    }
    const data = await res.json().catch(() => ({}));
    setError(data.error || 'Could not sign in.');
    setLoading(false);
  }

  return (
    <form className="admin-login-card" onSubmit={submit}>
      <img className="brand-logo" src="/trifhat logo.svg" alt="TRIFHAT" width={150} height={29} />
      <h1>Admin sign in</h1>
      <p>Orders dashboard for trifhat.shop.</p>
      <label>Email<input type="email" required autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>Password<input type="password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} /></label>
      {error && <p className="admin-error" role="alert">{error}</p>}
      <button className="btn btn-lime" type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="admin-login">
      <Suspense fallback={null}><LoginForm /></Suspense>
    </main>
  );
}
