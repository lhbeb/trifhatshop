'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

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

const features: { icon: 'pin' | 'bell' | 'shield' | 'lock' | 'signal' | 'tag'; title: string; text: string }[] = [
  { icon: 'pin', title: 'Find My and Find Hub tracking', text: 'A card-thin tracker is sewn inside. See your pouch on the map from any iPhone or Android phone.' },
  { icon: 'bell', title: 'Left-behind alerts', text: 'Walk away from the pouch at a security tray, café or hotel and your phone tells you right away.' },
  { icon: 'shield', title: 'Cut-resistant strap and panels', text: 'A cable-core strap and reinforced panels stop slash-and-grab theft.' },
  { icon: 'lock', title: 'Lockable zippers, breakaway buckle', text: 'Zippers lock shut, and a magnetic buckle holds firm against a yank yet releases safely if it has to.' },
  { icon: 'signal', title: 'Signal-blocking phone pocket', text: 'Drop your phone in and it goes fully dark: no calls, no tracking, no data, until you take it out.' },
  { icon: 'tag', title: 'NFC and QR return tag', text: 'Anyone who finds your pouch can tap or scan to contact you, without seeing your personal details.' },
];

const faqs = [
  ['Which phones work with the tracker?', 'The built-in tracker works with Apple Find My on iPhone and Google Find Hub on Android. Set it up once in the app you already have; no TRIFHAT app or subscription is needed.'],
  ['How do left-behind alerts work?', 'Your phone notifies you when it moves away from the pouch, so you know before you leave the security line, café or hotel room.'],
  ['Can thieves cut the strap?', 'The strap has a cut-resistant cable core and the panels are reinforced, so a quick slash-and-grab will not get through.'],
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

const promoMessages = [
  { text: 'Free US shipping on every TRIFHAT order.' },
  { text: 'Secure checkout powered by Stripe.' },
  { text: 'Shop with confidence: 30-day money-back guarantee.' },
  { text: 'Questions? Call ', phone: '+1 (562) 451-5530' },
];

/* Drawn icons: one stroke weight, one family. */
function Icon({ name, size = 20 }: { name: 'pin' | 'bell' | 'signal' | 'tag' | 'check' | 'shield' | 'plane' | 'lock' | 'return' | 'flag' | 'arrow' | 'chevron' | 'plus' | 'menu' | 'close' | 'star'; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (name) {
    case 'pin': return <svg {...common}><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.4" /></svg>;
    case 'bell': return <svg {...common}><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15L6 16.5Z" /><path d="M10 20.5a2.2 2.2 0 0 0 4 0" /></svg>;
    case 'signal': return <svg {...common}><path d="M4 19 20 5" /><path d="M8 19v-3M12 19v-6M16 19V9" /></svg>;
    case 'tag': return <svg {...common}><path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1.4 1.4 0 0 1 0 2l-6.4 6.4a1.4 1.4 0 0 1-2 0l-8.6-8Z" /><circle cx="8" cy="8" r="1.5" /></svg>;
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
  const [promoIndex, setPromoIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [touchX, setTouchX] = useState<number | null>(null);
  const showImage = (index: number) => setActiveImage((index + productImages.length) % productImages.length);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const bundle = bundles.find(item => item.id === selected) || bundles[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPromoIndex(index => (index + 1) % promoMessages.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, []);

  function beginCheckout() {
    setCheckingOut(true);
    window.location.assign(`/checkout?bundle=${bundle.id}`);
  }

  const close = () => setMenuOpen(false);

  return (
    <main className="lp">
      <p className="dealbar" aria-live="polite">
        <span key={promoIndex} className="dealbar-message">
          {promoMessages[promoIndex].text}
          {promoMessages[promoIndex].phone && <a href="tel:+15624515530">{promoMessages[promoIndex].phone}</a>}
        </span>
      </p>

      <header className="site-header">
        <a className="logo" href="#top" aria-label="TRIFHAT home"><Image className="brand-logo" src="/trifhat-logo-ink.svg" alt="TRIFHAT" width={150} height={29} priority unoptimized /></a>
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Main">
          <a href="#order" onClick={close}>Shop</a>
          <a href="#features" onClick={close}>Features</a>
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
          <p className="hero-lede">The ultra-slim travel pouch with a built-in tracker, cut-resistant build and RFID shielding that keeps your passport, cards, and cash out of reach of thieves and skimmers.</p>
          <ul className="ticks">
            <li><Icon name="check" size={18} />Built-in Find My and Find Hub tracking</li>
            <li><Icon name="check" size={18} />Cut-resistant strap and panels with lockable zippers</li>
            <li><Icon name="check" size={18} />RFID shielding plus a signal-blocking phone pocket</li>
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
          <p className="buy-intro">Find My and Find Hub tracking, a cut-resistant build and RFID shielding in one ultra-slim pouch.</p>
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
            <li><Icon name="pin" size={18} />Find My and Find Hub</li>
            <li><Icon name="shield" size={18} />Cut-resistant build</li>
            <li><Icon name="check" size={18} />Lifetime warranty</li>
          </ul>
        </div>
      </section>

      <section className="features" id="features">
        <h2>Smart security, built in.</h2>
        <p className="section-sub">Everything a pickpocket or a skimmer would try, TRIFHAT already has an answer for.</p>
        <div className="feature-grid">
          {features.map(f => (
            <article key={f.title}>
              <span className="feature-icon"><Icon name={f.icon} size={22} /></span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
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
          <div><dt>Tracking</dt><dd>Find My and Find Hub</dd></div>
          <div><dt>Strap</dt><dd>Cut-resistant cable core</dd></div>
          <div><dt>Phone pocket</dt><dd>Signal-blocking</dd></div>
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
          <p>TRIFHAT LLC<br />Roswell, NM 88201, United States<br /><a href="tel:+15624515530">+1 (562) 451-5530</a></p>
        </div>
        <p className="footer-legal">© 2026 TRIFHAT LLC. All rights reserved.</p>
      </footer>
    </main>
  );
}
