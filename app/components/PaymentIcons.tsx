/** Accepted payment method logos (same set and files as the Takimia footer). */
const LOGOS = [
  { src: '/payment-logos/visa.svg', alt: 'Visa' },
  { src: '/payment-logos/mastercard.svg', alt: 'Mastercard' },
  { src: '/payment-logos/american-express.svg', alt: 'American Express' },
  { src: '/payment-logos/discover.svg', alt: 'Discover' },
  { src: '/payment-logos/maestro.svg', alt: 'Maestro' },
  { src: '/payment-logos/jcb.svg', alt: 'JCB' },
  { src: '/payment-logos/unionpay.svg', alt: 'UnionPay' },
  { src: '/payment-logos/diners.svg', alt: 'Diners Club' },
  { src: '/payment-logos/apple-pay.svg', alt: 'Apple Pay' },
  { src: '/payment-logos/google-pay.svg', alt: 'Google Pay' },
];

export default function PaymentIcons({ className = '' }: { className?: string }) {
  return (
    <ul className={`payment-icons ${className}`.trim()} aria-label="Accepted payment methods">
      {LOGOS.map(logo => (
        <li key={logo.src}><img src={logo.src} alt={logo.alt} width={52} height={32} loading="lazy" /></li>
      ))}
    </ul>
  );
}
