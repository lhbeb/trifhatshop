import Image from 'next/image';

export default function PrivacyPage() {
  return <div className="simple-page"><nav className="simple-nav"><a href="/"><Image className="brand-logo" src="/trifhat-logo-ink.svg" alt="TRIFHAT" width={170} height={33} unoptimized /></a><a href="/">Back to store</a></nav><main className="simple-main"><p className="simple-kicker">Privacy policy</p><h1>Your information, handled carefully.</h1><p>TRIFHAT uses information needed to process orders, provide support, prevent fraud, and improve the storefront.</p><h2>Information we receive</h2><p>This may include your name, email, shipping details, and order details. Payment card details are handled by Stripe and are not stored by TRIFHAT.</p><h2>Questions</h2><p>For privacy questions, contact support@trifhat.shop.</p></main></div>;
}
