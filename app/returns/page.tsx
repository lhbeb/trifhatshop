import Image from 'next/image';

export default function ReturnsPage() {
  return <div className="simple-page"><nav className="simple-nav"><a href="/"><Image className="brand-logo" src="/trifhat-logo-ink.svg" alt="TRIFHAT" width={170} height={33} unoptimized /></a><a href="/">Back to store</a></nav><main className="simple-main"><p className="simple-kicker">Refunds & returns</p><h1>Simple, fair returns.</h1><p>We want you to feel confident ordering from TRIFHAT.</p><h2>30-day return window</h2><p>Contact support@trifhat.shop within 30 days of delivery to request return guidance. Please include your order number.</p><h2>Refunds</h2><p>Approved refunds are sent to the original payment method after the returned item is received and reviewed.</p><a className="back-home" href="/contact">Start a return request</a></main></div>;
}
