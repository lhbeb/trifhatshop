import Image from 'next/image';
import { BUSINESS } from './business';

/** Shared footer with the full business details, rendered on every page from the root layout. */
export default function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-brand">
        <Image className="brand-logo" src="/trifhat logo.svg" alt="TRIFHAT" width={150} height={29} unoptimized />
        <p>Travel security accessories with built-in tracking, a cut-resistant build and RFID protection.</p>
        <a className="footer-email" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
      </div>
      <nav aria-label="Store">
        <h3>Store</h3>
        <a href="/#order">Order the travel pouch</a>
        <a href="/#features">Features</a>
        <a href="/#reviews">Reviews</a>
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
      <address className="footer-company">
        <h3>Company</h3>
        <p>
          {BUSINESS.legalName}<br />
          {BUSINESS.owner}<br />
          {BUSINESS.street}<br />
          {BUSINESS.city}, {BUSINESS.region} {BUSINESS.postalCode}<br />
          {BUSINESS.country}<br />
          <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phoneDisplay}</a><br />
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
        </p>
      </address>
      <p className="footer-legal">© {new Date().getFullYear()} {BUSINESS.legalName}, {BUSINESS.street}, {BUSINESS.city}, {BUSINESS.region} {BUSINESS.postalCode}, {BUSINESS.country}. All rights reserved.</p>
    </footer>
  );
}
