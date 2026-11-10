'use client';

import Image from 'next/image';
import { useState } from 'react';

const bundles = [
  { id: 'single', label: '1 Pouch', note: 'Essential protection', price: '$24.99', amount: 2499, original: '$49.98' },
  { id: 'duo', label: '2 Pouches', note: 'Best value for couples', price: '$39.99', amount: 3999, original: '$79.98', popular: true },
  { id: 'family', label: '3 Pouches', note: 'Secure the whole crew', price: '$49.99', amount: 4999, original: '$99.98' },
];
const productImages = [
  { src: '/images/trifhat-product.jpg', alt: 'TRIFHAT angled front view' },
  { src: '/images/trifhat-front.jpg', alt: 'TRIFHAT front view' },
  { src: '/images/trifhat-side.jpg', alt: 'TRIFHAT side profile' },
  { src: '/images/trifhat-back.jpg', alt: 'TRIFHAT back view' },
  { src: '/images/trifhat-top.jpg', alt: 'TRIFHAT top profile' },
];

function ShieldIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4.5 6.2v5.2c0 4.5 3 8.3 7.5 9.6 4.5-1.3 7.5-5.1 7.5-9.6V6.2L12 3Z" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="m8.5 12 2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function Home() {
  const [selected, setSelected] = useState('duo');
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const bundle = bundles.find(item => item.id === selected) || bundles[1];

  async function beginCheckout() {
    setCheckingOut(true);
    window.location.assign(`/checkout?bundle=${bundle.id}`);
  }

  return (
    <main>
      <div className="dealbar"><span className="pulse" /> LIMITED FLASH DEAL <b>• 50% OFF TODAY</b><span className="dealbar-note">Free domestic US shipping over $35</span></div>
      <header className="site-header">
            <a className="logo" href="#top" aria-label="TRIFHAT home"><Image className="brand-logo" src="/trifhat logo.svg" alt="TRIFHAT" width={170} height={33} priority /></a>
        <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>MENU <span>{menuOpen ? '×' : '＋'}</span></button>
        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <a href="#order" onClick={() => setMenuOpen(false)}>Order <em>50% off</em></a><a href="#why" onClick={() => setMenuOpen(false)}>Why TRIFHAT</a><a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a><a href="/faq" onClick={() => setMenuOpen(false)}>FAQ</a><a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="header-cta" href="#order">Get protected <Arrow /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span className="eyebrow-line" /> TRAVEL IN COMPLETE SAFETY</p>
            <h1>Keep your essentials <span>invisible.</span></h1>
            <p className="hero-lede">The ultra-slim RFID-blocking neck pouch designed to keep your passport, cards, and cash secure from electronic thieves and pickpockets.</p>
            <ul className="feature-list"><li><b>01</b><span>Military-grade RFID protection</span></li><li><b>02</b><span>0.15″ profile that disappears under clothing</span></li><li><b>03</b><span>Water-resistant ripstop with breathable mesh</span></li></ul>
            <div className="hero-actions"><a className="button button-light" href="#order">Claim 50% off <Arrow /></a><div className="rating"><strong>★★★★★</strong><span>4.9/5 from 1,420+ travelers</span></div></div>
            <p className="urgency"><span>●</span> High demand: only <b>18 units</b> left at this price.</p>
          </div>
          <div className="hero-object reveal delay-1"><div className="object-label">SPEC 2026 <span>//</span> RFID-SECURE</div><div className="object-frame"><Image src="/images/trifhat-product.jpg" alt="TRIFHAT RFID travel pouch" width={1024} height={1024} priority /></div><div className="object-caption"><span>01</span><b>Carry less worry.</b><small>TRIFHAT™ ultra-slim travel pouch</small></div></div>
        </div>
        <div className="trust-row"><span>✦ TSA & airport ready</span><span>✦ Secure checkout</span><span>✦ 30-day money-back guarantee</span><span>✦ Verified US seller</span></div>
      </section>

      <section className="product-section" id="order">
        <div className="section-head"><p className="eyebrow"><span className="eyebrow-line" /> THE SMARTER TRAVEL CHOICE</p><h2>Protection that feels like nothing.</h2></div>
        <div className="buy-grid">
          <div className="product-preview"><span className="sale-badge">SAVE 50% TODAY</span><div className="product-gallery"><button className="gallery-arrow gallery-prev" type="button" aria-label="Previous product image" onClick={() => setActiveImage((activeImage - 1 + productImages.length) % productImages.length)}>‹</button><Image className="gallery-main-image" src={productImages[activeImage].src} alt={productImages[activeImage].alt} width={1024} height={1024} /><button className="gallery-arrow gallery-next" type="button" aria-label="Next product image" onClick={() => setActiveImage((activeImage + 1) % productImages.length)}>›</button></div><div className="gallery-thumbnails" aria-label="Product images">{productImages.map((image, index) => <button type="button" className={index === activeImage ? 'gallery-thumb active' : 'gallery-thumb'} key={image.src} aria-label={`Show ${image.alt}`} onClick={() => setActiveImage(index)}><Image src={image.src} alt="" width={120} height={120} /></button>)}</div><div className="mini-guarantees"><span>◈ Blocks RFID scanners</span><span>◈ Breathable & anti-sweat</span><span>◈ Fits every passport size</span></div></div>
          <div className="buy-copy"><div className="stars">★★★★★ <small>4.9/5 · 1,420+ verified reviews</small></div><h2>TRIFHAT™ Ultra-Slim RFID Hidden Travel Pouch</h2><p className="buy-intro">Military-grade protection against RFID skimmers, pickpockets, and identity theft.</p><div className="price-row"><strong>{bundle.price}</strong><del>{bundle.original}</del><span>50% OFF</span></div><div className="timer"><b>⏱ LIMITED-TIME PRICING</b><span>Offer reserved for the next 09:59</span></div><fieldset><legend>Choose your protection</legend>{bundles.map(item => <label className={selected === item.id ? 'bundle selected' : 'bundle'} key={item.id}><input type="radio" name="bundle" checked={selected === item.id} onChange={() => setSelected(item.id)} /><span><b>{item.label}</b><small>{item.note}</small></span>{item.popular && <em>Most popular</em>}<strong>{item.price}</strong></label>)}</fieldset><button className="buy-button" type="button" onClick={beginCheckout} disabled={checkingOut}>{checkingOut ? 'Opening secure checkout…' : <>Checkout securely <Arrow /></>}</button>{checkoutError && <p className="checkout-error" role="alert">{checkoutError}</p>}<p className="secure-note">▣ Secure checkout by Stripe · VISA · MASTERCARD · AMEX · APPLE PAY</p></div>
        </div>
      </section>

      <section className="why-section" id="why"><div className="why-inner"><div><p className="eyebrow"><span className="eyebrow-line" /> WHY TRAVELERS SWITCH</p><h2>Bulky neck pouches are a thing of the past.</h2><p>TRIFHAT was designed around the way people actually travel: light, alert, and unwilling to compromise on security. It stays flat, breathes against your skin, and keeps the important things where pickpockets cannot reach.</p><a className="text-link" href="#order">Upgrade to TRIFHAT & save 50% <Arrow /></a></div><div className="stat-stack"><div><strong>0.15″</strong><span>Ultra-thin profile</span></div><div><strong>13.56</strong><span>MHz RFID blocking</span></div><div><strong>1.8 oz</strong><span>Feather-light weight</span></div></div></div></section>

      <section className="reviews-section" id="reviews"><div className="section-head centered"><p className="eyebrow"><span className="eyebrow-line" /> REAL EXPERIENCES</p><h2>Loved by 1,420+ travelers worldwide.</h2><p>Verified travelers protecting their passports across Europe, Asia, and the Americas.</p></div><div className="review-grid"><blockquote><div>★★★★★</div><p>“Saved our trip to Rome! Someone bumped into me on the crowded metro and tried going for my pockets, but my passport and cards were hidden under my t-shirt. They got absolutely nothing. Lifesaver.”</p><cite>Verified buyer · Texas, USA</cite></blockquote><blockquote><div>★★★★★</div><p>“I worried it would look bulky or feel sweaty under summer linen. The breathable mesh is incredible. It lies flat and disappears—you forget you’re wearing it.”</p><cite>Verified buyer · California, USA</cite></blockquote><blockquote><div>★★★★★</div><p>“Tested the RFID blocking with my apartment keycard scanner before Barcelona. Complete zero signal passed through. Dispatched super fast. 10/10.”</p><cite>Verified buyer · Florida, USA</cite></blockquote></div></section>

      <section className="faq-section" id="faq"><div className="faq-grid"><div><p className="eyebrow"><span className="eyebrow-line" /> QUESTIONS, ANSWERED</p><h2>Everything you need to know.</h2></div><div className="faq-list">{['How does the RFID protection work?','Will it fit my passport and phone?','Is it comfortable in hot weather?','How quickly will my order arrive?','What if I change my mind?'].map((question, index) => <div className="faq-item" key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>0{index + 1}</span>{question}<b>{openFaq === index ? '−' : '+'}</b></button>{openFaq === index && <p>{['The inner layer uses electromagnetic shielding fabric certified to block 13.56 MHz and higher RFID/NFC frequencies, helping prevent portable skimmers from reading your cards and ID.','The multi-compartment design fits international passports, up to six cards or IDs, boarding passes, currency, and standard smartphones.','Yes. The rear panel uses a breathable, hypoallergenic air-mesh material that wicks away moisture and reduces chafing.','Orders dispatch within 24–48 business hours from Roswell, New Mexico. Standard domestic delivery typically arrives within 3–5 business days.','We offer a risk-free 30-day money-back guarantee. Contact support@trifhat.com for a full refund.'][index]}</p>}</div>)}</div></div></section>

      <section className="final-cta"><p className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT TRIP STARTS HERE</p><h2>Travel lighter. Move smarter.</h2><p>Secure your passport and cards before your next flight. The 50% discount applies today only.</p><a className="button button-light" href="#order">Claim your RFID pouch <Arrow /></a></section>

      <footer id="contact"><div className="footer-grid"><div><a className="logo footer-logo" href="#top"><Image className="brand-logo" src="/trifhat logo.svg" alt="TRIFHAT" width={170} height={33} /></a><p>Engineered travel security accessories built with heavy-gauge materials and military-grade RFID protection.</p><a className="footer-email" href="mailto:support@trifhat.shop">support@trifhat.shop</a></div><div><h4>Navigation</h4><a href="#order">Order travel pouch</a><a href="#why">Why TRIFHAT</a><a href="#reviews">Reviews</a><a href="/faq">FAQ</a><a href="/contact">Contact</a></div><div><h4>Policies</h4><a href="/shipping">Shipping & delivery</a><a href="/returns">Refund & returns</a><a href="/terms">Terms of service</a><a href="/privacy">Privacy policy</a></div><div className="corporate"><h4>Corporate headquarters</h4><p><b>Registered business entity</b><br />TRIFHAT LLC · Entity ID #7473826<br />Roswell, NM 88201, United States</p><span>✓ Verified domestic corporation</span></div></div><div className="footer-bottom"><span>© 2026 TRIFHAT LLC. All rights reserved.</span><span>100% secure · 30-day guarantee · USA dispatch</span></div></footer>
    </main>
  );
}
