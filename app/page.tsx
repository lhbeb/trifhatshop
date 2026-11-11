'use client';

import Image from 'next/image';
import { useState } from 'react';

const bundles = [
  { id: 'single', label: '1 Pouch', note: '$320 per pouch', price: '$320', amount: 32000 },
  { id: 'duo', label: '2 Pouches', note: 'One for each traveler', price: '$640', amount: 64000 },
  { id: 'family', label: '3 Pouches', note: 'Secure the whole crew', price: '$960', amount: 96000 },
];

const productImages = [
  { src: '/images/trifhat-product.jpg', alt: 'TRIFHAT angled front view' },
  { src: '/images/trifhat-front.jpg', alt: 'TRIFHAT front view' },
  { src: '/images/trifhat-side.jpg', alt: 'TRIFHAT side profile' },
  { src: '/images/trifhat-back.jpg', alt: 'TRIFHAT back view' },
  { src: '/images/trifhat-top.jpg', alt: 'TRIFHAT top profile' },
];

const faqs = [
  ['How does the RFID protection work?', 'The inner layer uses electromagnetic shielding fabric certified to block 13.56 MHz and higher RFID/NFC frequencies, helping prevent portable skimmers from reading your cards and ID.'],
  ['Will it fit my passport and phone?', 'The multi-compartment design fits international passports, up to six cards or IDs, boarding passes, currency, and standard smartphones.'],
  ['Is it comfortable in hot weather?', 'Yes. The rear panel uses a breathable, hypoallergenic air-mesh material that wicks away moisture and reduces chafing.'],
  ['How quickly will my order arrive?', 'Orders dispatch within 24–48 business hours from Roswell, New Mexico. Standard domestic delivery typically arrives within 3–5 business days.'],
  ['What if I change my mind?', 'We offer a risk-free 30-day money-back guarantee. Contact support@trifhat.shop for a full refund.'],
];

const reviews = [
  { quote: 'Saved our trip to Rome! Someone bumped into me on the crowded metro and tried going for my pockets, but my passport and cards were hidden under my t-shirt. They got absolutely nothing. Lifesaver.', from: 'Texas, USA' },
  { quote: 'I worried it would look bulky or feel sweaty under summer linen. The breathable mesh is incredible. It lies flat and disappears. You forget you’re wearing it.', from: 'California, USA' },
  { quote: 'Tested the RFID blocking with my apartment keycard scanner before Barcelona. Complete zero signal passed through. Dispatched super fast. 10/10.', from: 'Florida, USA' },
];

/* Drawn icons: one stroke weight, one family. */
function Icon({ name, size = 20 }: { name: 'check' | 'shield' | 'plane' | 'lock' | 'return' | 'flag' | 'arrow' | 'chevron' | 'plus' | 'menu' | 'close' | 'star'; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (name) {
    case 'check': return <svg {...common}><path d="m5 12.5 4.2 4.2L19 7" /></svg>;
    case 'shield': return <svg {...common}><path d="M12 3 4.8 6v5.6c0 4.3 3 8 7.2 9.4 4.2-1.4 7.2-5.1 7.2-9.4V6L12 3Z" /><path d="m8.8 12 2.2 2.2 4.3-4.6" /></svg>;
    case 'plane': return <svg {...common}><path d="M10.5 13.5 3 11l1.2-1.6 8 .9 4.6-5.1a1.9 1.9 0 0 1 2.9 2.6l-5 4.7.8 8-1.6 1.2-2.5-7.5-3 2.8.2 2.5L7.4 21l-1.2-3.3L3 16.5l1.3-1.2 2.4.2 3.8-2Z" /></svg>;
    case 'lock': return <svg {...common}><rect x="5" y="10.5" width="14" height="10" rx="2.2" /><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" /></svg>;
    case 'return': return <svg {...common}><path d="M9 7 5 11l4 4" /><path d="M5 11h9.5a4.5 4.5 0 0 1 0 9H12" /></svg>;
    case 'flag': return <svg {...common}><path d="M5 21V4" /><path d="M5 4.5h11l-2 3.7 2 3.8H5" /></svg>;
    case 'arrow': return <svg {...common}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case 'chevron': return <svg {...common}><path d="m9 6 6 6-6 6" /></svg>;
    case 'plus': return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
    case 'menu': return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    case 'close': return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>;
    case 'star': return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8L12 2.8Z" /></svg>;
  }
}

function Stars({ size = 16 }: { size?: number }) {
  return <span className="stars" aria-label="5 out of 5 stars">{[0, 1, 2, 3, 4].map(i => <Icon key={i} name="star" size={size} />)}</span>;
}

/** The hero's one moment: a skimmer beam sweeps a passport data page and reads nothing behind the pouch. */
function PassportScene() {
  return (
    <div className="scene" aria-label="Illustration: a skimmer scan reads no data through the TRIFHAT pouch">
      <div className="passport" aria-hidden="true">
        <div className="passport-head">
          <span>United States of America</span>
          <span>Passport</span>
        </div>
        <div className="passport-body">
          <div className="passport-photo" />
          <dl>
            <div><dt>Surname</dt><dd>TRAVELER</dd></div>
            <div><dt>Given names</dt><dd>ALEX</dd></div>
            <div><dt>Nationality</dt><dd>USA</dd></div>
            <div><dt>Passport no.</dt><dd className="redacted">•••••••••</dd></div>
          </dl>
        </div>
        <div className="mrz">
          <span>P&lt;USATRAVELER&lt;&lt;ALEX&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span>
          <span>&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span>
        </div>
        <div className="beam" />
      </div>
      <div className="scene-pouch">
        <Image src="/images/trifhat-product.jpg" alt="TRIFHAT RFID travel pouch" width={1024} height={1024} priority sizes="(max-width: 900px) 70vw, 420px" />
      </div>
      <div className="readout" aria-hidden="true">
        <span className="readout-dot" />
        <span>Skimmer scan, 13.56 MHz</span>
        <b>No data read</b>
      </div>
    </div>
  );
}

export default function Home() {
  const [selected, setSelected] = useState('single');
  const [activeImage, setActiveImage] = useState(0);
  const [touchX, setTouchX] = useState<number | null>(null);
  const showImage = (index: number) => setActiveImage((index + productImages.length) % productImages.length);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const bundle = bundles.find(item => item.id === selected) || bundles[0];

  function beginCheckout() {
    setCheckingOut(true);
    window.location.assign(`/checkout?bundle=${bundle.id}`);
  }

  const close = () => setMenuOpen(false);

  return (
    <main className="lp">
      <p className="dealbar">Free US shipping, secure Stripe checkout and a 30-day money-back guarantee.</p>

      <header className="site-header">
        <a className="logo" href="#top" aria-label="TRIFHAT home"><Image className="brand-logo" src="/trifhat-logo-ink.svg" alt="TRIFHAT" width={150} height={29} priority unoptimized /></a>
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Main">
          <a href="#order" onClick={close}>Shop</a>
          <a href="#why" onClick={close}>Why TRIFHAT</a>
          <a href="#reviews" onClick={close}>Reviews</a>
          <a href="/faq" onClick={close}>FAQ</a>
          <a href="/contact" onClick={close}>Contact</a>
        </nav>
        <a className="header-cta" href="#order">Order now</a>
        <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} size={22} /></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <h1>Keep your essentials invisible.</h1>
          <p className="hero-lede">The ultra-slim RFID-blocking neck pouch that keeps your passport, cards, and cash out of reach of electronic thieves and pickpockets.</p>
          <ul className="ticks">
            <li><Icon name="check" size={18} />Military-grade RFID protection</li>
            <li><Icon name="check" size={18} />0.15″ profile that disappears under clothing</li>
            <li><Icon name="check" size={18} />Water-resistant ripstop with breathable mesh</li>
          </ul>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#order">Order yours for $320 <Icon name="arrow" size={18} /></a>
            <div className="rating"><Stars /><span>4.9/5 from 1,420+ travelers</span></div>
          </div>
        </div>
        <PassportScene />
      </section>

      <ul className="trust" aria-label="Store guarantees">
        <li><Icon name="plane" />TSA and airport ready</li>
        <li><Icon name="lock" />Secure Stripe checkout</li>
        <li><Icon name="return" />30-day money-back guarantee</li>
        <li><Icon name="flag" />Ships from the USA</li>
      </ul>

      <section className="order" id="order">
        <div className="gallery">
          <div
            className="gallery-main"
            onTouchStart={e => setTouchX(e.touches[0].clientX)}
            onTouchEnd={e => {
              if (touchX === null) return;
              const dx = e.changedTouches[0].clientX - touchX;
              if (Math.abs(dx) > 40) showImage(activeImage + (dx < 0 ? 1 : -1));
              setTouchX(null);
            }}
          >
            <Image key={productImages[activeImage].src} className="gallery-photo" src={productImages[activeImage].src} alt={productImages[activeImage].alt} width={1024} height={1024} sizes="(max-width: 900px) 92vw, 560px" priority={activeImage === 0} />
            <button className="gallery-arrow prev" type="button" aria-label="Previous image" onClick={() => showImage(activeImage - 1)}><Icon name="chevron" /></button>
            <button className="gallery-arrow next" type="button" aria-label="Next image" onClick={() => showImage(activeImage + 1)}><Icon name="chevron" /></button>
            <span className="gallery-count" aria-live="polite">{activeImage + 1} / {productImages.length}</span>
          </div>
          <div className="thumbs">
            {productImages.map((image, index) => (
              <button type="button" className={index === activeImage ? 'thumb active' : 'thumb'} key={image.src} aria-label={`Show ${image.alt}`} aria-pressed={index === activeImage} onClick={() => showImage(index)}>
                <Image src={image.src} alt="" width={120} height={120} />
              </button>
            ))}
          </div>
        </div>

        <div className="buybox">
          <div className="rating"><Stars /><span>4.9/5 from 1,420+ verified reviews</span></div>
          <h2>TRIFHAT™ Ultra-Slim RFID Hidden Travel Pouch</h2>
          <p className="buy-intro">Military-grade protection against RFID skimmers, pickpockets, and identity theft.</p>
          <div className="price"><strong>{bundle.price}</strong>{bundle.id !== 'single' && <span className="price-each">$320 each</span>}</div>
          <fieldset>
            <legend>Choose your bundle</legend>
            {bundles.map(item => (
              <label className={selected === item.id ? 'bundle selected' : 'bundle'} key={item.id}>
                <input type="radio" name="bundle" checked={selected === item.id} onChange={() => setSelected(item.id)} />
                <span className="bundle-text"><b>{item.label}</b><small>{item.note}</small></span>
                <strong>{item.price}</strong>
              </label>
            ))}
          </fieldset>
          <button className="btn btn-buy" type="button" onClick={beginCheckout} disabled={checkingOut}>
            {checkingOut ? 'Opening secure checkout…' : <>Checkout securely <Icon name="arrow" size={18} /></>}
          </button>
          <p className="pay-note"><Icon name="lock" size={15} />Secure checkout by Stripe. Visa, Mastercard, Amex and Apple Pay accepted.</p>
          <ul className="perks">
            <li><Icon name="shield" size={18} />Blocks RFID scanners</li>
            <li><Icon name="check" size={18} />Breathable and anti-sweat</li>
            <li><Icon name="check" size={18} />Fits every passport size</li>
          </ul>
        </div>
      </section>

      <section className="why" id="why">
        <div className="why-copy">
          <h2>Bulky neck pouches are a thing of the past.</h2>
          <p>TRIFHAT was designed around the way people actually travel: light, alert, and unwilling to compromise on security. It stays flat, breathes against your skin, and keeps the important things where pickpockets cannot reach.</p>
          <a className="btn btn-lime" href="#order">Get your TRIFHAT pouch <Icon name="arrow" size={18} /></a>
        </div>
        <dl className="spec-card">
          <div><dt>Profile</dt><dd>0.15″</dd></div>
          <div><dt>RFID blocking</dt><dd>13.56 MHz</dd></div>
          <div><dt>Weight</dt><dd>1.8 oz</dd></div>
          <div><dt>Shell</dt><dd>Water-resistant ripstop</dd></div>
          <div><dt>Back panel</dt><dd>Breathable air-mesh</dd></div>
          <div><dt>Fits</dt><dd>Passport, 6 cards, phone</dd></div>
        </dl>
      </section>

      <section className="reviews" id="reviews">
        <h2>Loved by 1,420+ travelers worldwide.</h2>
        <p className="section-sub">Travelers protecting their passports across Europe, Asia, and the Americas.</p>
        <div className="review-grid">
          {reviews.map(review => (
            <figure key={review.from}>
              <Stars size={15} />
              <blockquote>“{review.quote}”</blockquote>
              <figcaption>Verified buyer, {review.from}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="faq" id="faq">
        <h2>Everything you need to know.</h2>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => {
            const open = openFaq === index;
            return (
              <div className={open ? 'faq-item open' : 'faq-item'} key={question}>
                <button aria-expanded={open} onClick={() => setOpenFaq(open ? null : index)}>
                  <span>{question}</span>
                  <Icon name="plus" size={20} />
                </button>
                {open && <p>{answer}</p>}
              </div>
            );
          })}
        </div>
      </section>

      <section className="closer">
        <h2>Travel lighter. Move smarter.</h2>
        <p>Secure your passport and cards before your next flight.</p>
        <a className="btn btn-lime" href="#order">Claim your RFID pouch <Icon name="arrow" size={18} /></a>
      </section>

      <footer className="site-footer" id="contact">
        <div className="footer-brand">
          <Image className="brand-logo" src="/trifhat-logo-light.svg" alt="TRIFHAT" width={150} height={29} unoptimized />
          <p>Travel security accessories built with heavy-gauge materials and RFID protection.</p>
          <a className="footer-email" href="mailto:support@trifhat.shop">support@trifhat.shop</a>
        </div>
        <nav aria-label="Store">
          <h3>Store</h3>
          <a href="#order">Order the travel pouch</a>
          <a href="#why">Why TRIFHAT</a>
          <a href="#reviews">Reviews</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact</a>
        </nav>
        <nav aria-label="Policies">
          <h3>Policies</h3>
          <a href="/shipping">Shipping and delivery</a>
          <a href="/returns">Refunds and returns</a>
          <a href="/terms">Terms of service</a>
          <a href="/privacy">Privacy policy</a>
        </nav>
        <div className="footer-company">
          <h3>Company</h3>
          <p>TRIFHAT LLC, Entity ID #7473826<br />Roswell, NM 88201, United States</p>
        </div>
        <p className="footer-legal">© 2026 TRIFHAT LLC. All rights reserved.</p>
      </footer>
    </main>
  );
}
