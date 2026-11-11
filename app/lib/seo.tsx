import { BUSINESS } from '../components/business';

/** Structured data (schema.org JSON-LD) shared by every page. All URLs are absolute. */
export const SITE_URL = BUSINESS.url;
const abs = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PRODUCT_ID = `${SITE_URL}/#product`;
export const RETURN_POLICY_ID = `${SITE_URL}/#return-policy`;

export const PRODUCT = {
  name: 'TRIFHAT™ Ultra-Slim RFID Hidden Travel Pouch',
  sku: 'TRIFHAT-POUCH-1',
  price: '320.00',
  currency: 'USD',
  description:
    'Ultra-slim hidden travel pouch with a built-in Apple Find My and Google Find Hub tracker, left-behind alerts, cut-resistant strap and panels, locking zippers, a signal-blocking phone pocket, an NFC and QR return tag and RFID shielding for passports and cards.',
  images: ['/images/trifhat-product.jpg', '/images/trifhat-front.jpg', '/images/trifhat-side.jpg', '/images/trifhat-back.jpg', '/images/trifhat-top.jpg'],
};

const returnPolicy = {
  '@type': 'MerchantReturnPolicy',
  '@id': RETURN_POLICY_ID,
  url: abs('/returns'),
  applicableCountry: 'US',
  returnPolicyCountry: 'US',
  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: 30,
  returnMethod: 'https://schema.org/ReturnByMail',
  refundType: 'https://schema.org/FullRefund',
};

const organization = {
  '@type': ['Organization', 'OnlineStore'],
  '@id': ORG_ID,
  name: 'TRIFHAT',
  legalName: BUSINESS.legalName,
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: abs('/trifhat%20logo.svg'), width: 221, height: 43 },
  image: abs('/images/trifhat-product.jpg'),
  description: 'TRIFHAT makes secure travel gear: hidden travel pouches with built-in tracking, a cut-resistant build and RFID protection.',
  email: BUSINESS.email,
  telephone: BUSINESS.phone,
  founder: { '@type': 'Person', name: BUSINESS.owner },
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    postalCode: BUSINESS.postalCode,
    addressCountry: BUSINESS.countryCode,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    areaServed: ['US', 'EU'],
    availableLanguage: 'English',
  },
  hasMerchantReturnPolicy: { '@id': RETURN_POLICY_ID },
};

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: 'TRIFHAT',
  inLanguage: 'en-US',
  publisher: { '@id': ORG_ID },
};

/** Site-wide nodes: organization, website and return policy. Rendered once from the root layout. */
export const siteGraph = { '@context': 'https://schema.org', '@graph': [organization, website, returnPolicy] };

export function productNode() {
  const offerUrl = abs('/');
  return {
    '@type': 'Product',
    '@id': PRODUCT_ID,
    name: PRODUCT.name,
    description: PRODUCT.description,
    sku: PRODUCT.sku,
    mpn: PRODUCT.sku,
    image: PRODUCT.images.map(abs),
    brand: { '@type': 'Brand', name: 'TRIFHAT' },
    manufacturer: { '@id': ORG_ID },
    category: 'Luggage & Bags > Travel Pouches',
    material: 'RFID shielding fabric, cut-resistant panels, breathable air mesh',
    offers: {
      '@type': 'Offer',
      url: offerUrl,
      price: PRODUCT.price,
      priceCurrency: PRODUCT.currency,
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': ORG_ID },
      hasMerchantReturnPolicy: { '@id': RETURN_POLICY_ID },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'USD' },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
        shippingOrigin: { '@type': 'DefinedRegion', addressCountry: 'US', addressRegion: BUSINESS.region },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 5, unitCode: 'DAY' },
          businessDays: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(d => `https://schema.org/${d}`) },
        },
      },
    },
  };
}

export function faqNode(url: string, items: readonly (readonly [string, string])[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${abs(url)}#faq`,
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}

type PageType = 'WebPage' | 'ContactPage' | 'AboutPage' | 'FAQPage' | 'CollectionPage';

/** WebPage + BreadcrumbList for one page, plus any extra nodes (Product, FAQPage…). */
export function pageGraph(opts: { path: string; name: string; description: string; type?: PageType; extra?: object[]; about?: string }) {
  const url = abs(opts.path);
  const crumbs = [{ name: 'Home', url: abs('/') }, ...(opts.path === '/' ? [] : [{ name: opts.name, url }])];
  const page: Record<string, unknown> = {
    '@type': opts.type === 'FAQPage' ? 'WebPage' : opts.type || 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
    breadcrumb: { '@id': `${url}#breadcrumb` },
  };
  if (opts.about) page.about = { '@id': opts.about };
  if (opts.about === PRODUCT_ID) page.mainEntity = { '@id': PRODUCT_ID };
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
  };
  return { '@context': 'https://schema.org', '@graph': [page, breadcrumb, ...(opts.extra || [])] };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
