/**
 * Single source of truth for brand, contact and export-market facts.
 * Everything that appears in metadata, JSON-LD and llms.txt reads from here,
 * so structured data can never drift from the visible page copy.
 */
export const site = {
  name: "Yunhong Textiles",
  legalName: "Zhejiang Yunhong Textile Co., Ltd.",
  shortName: "Yunhong",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.yunhongtex.com",
  locale: "en",
  language: "en",
  tagline: "Fabric programmes for brands that ship worldwide",
  description:
    "Yunhong Textiles is a woven and knit fabric mill and exporter supplying cotton, linen, denim, viscose and recycled performance fabrics to apparel brands in Europe, North America and the Middle East. OEKO-TEX Standard 100 and GRS certified, 300 m minimums, 18–28 day production.",
  foundedYear: 2009,
  email: "sales@yunhongtex.com",
  sampleEmail: "samples@yunhongtex.com",
  phone: "+86 575 8411 0000",            // TODO: 替换为真实号码
  whatsapp: "+86 138 0000 0000",        // TODO: 替换为真实 WhatsApp
  address: {
    street: "",                          // TODO: 街道地址
    city: "Shaoxing",
    region: "Zhejiang",
    postalCode: "312000",
    country: "CN",
  },
  addressLine: "Keqiao District, Shaoxing, Zhejiang 312000, China",
  hours: "Mon–Fri, 09:00–18:00 (GMT+8)",
  responseTime: "Replies within one business day",
  social: {
    linkedin: "",                         // TODO: LinkedIn 链接
    instagram: "",                        // TODO: Instagram 链接
    youtube: "",                          // TODO: YouTube 链接
  },
  /** Commercial defaults quoted across the site. */
  terms: {
    moq: "300 m per colour",
    stockMoq: "100 m from stock",
    sampleLeadTime: "7–10 days including courier",
    bulkLeadTime: "18–28 days after lab dip approval",
    incoterms: ["FOB Shanghai / Ningbo", "EXW", "CIF", "DDP Europe & US"],
    payment: "30% deposit, 70% against B/L copy. L/C at sight accepted above 20,000 m.",
    currency: "USD",
  },
  markets: [
    {
      region: "European Union",
      countries: "Germany, France, Italy, Netherlands, Spain, Poland",
      ports: "Hamburg, Rotterdam, Genoa, Gdansk",
      notes:
        "EUDR-ready supply chain documentation, OEKO-TEX and GRS transaction certificates, DDP delivery on request.",
    },
    {
      region: "United Kingdom",
      countries: "United Kingdom, Ireland",
      ports: "Felixstowe, Southampton",
      notes: "UKCA-compliant labelling support and post-Brexit customs paperwork handled in-house.",
    },
    {
      region: "North America",
      countries: "United States, Canada, Mexico",
      ports: "Los Angeles, New York, Savannah, Vancouver",
      notes:
        "DDP door delivery to US warehouses, CPSIA test reports on request, 4–5 week ocean transit.",
    },
    {
      region: "Middle East",
      countries: "UAE, Saudi Arabia, Qatar, Kuwait, Israel",
      ports: "Jebel Ali, Dammam, Hamad",
      notes:
        "Heat-conscious linen, viscose and cotton programmes, SASO and ESMA conformity support, air freight in 5–7 days.",
    },
  ],
  certifications: [
    { code: "OEKO-TEX® STANDARD 100", detail: "Product class II, certificate 21.HCN.84973" },
    { code: "GRS 4.0", detail: "Recycled polyester and nylon, transaction certificates" },
    { code: "GOTS 6.0", detail: "Organic cotton scopes, supply chain certification" },
    { code: "bluesign® APPROVED", detail: "Selected performance finishes" },
    { code: "ISO 9001:2015", detail: "Quality management, audited annually" },
    { code: "amfori BSCI", detail: "Social compliance, audited rating A" },
  ],
  stats: [
    { value: "17 yrs", label: "Weaving and export experience" },
    { value: "18", label: "Stock fabric programmes" },
    { value: "300 m", label: "Minimum order per colour" },
    { value: "4.2M m", label: "Shipped in 2025" },
  ],
} as const;

export const nav = [
  { href: "/fabrics", label: "Fabrics" },
  { href: "/services", label: "Services" },
  { href: "/quality", label: "Quality & Compliance" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function whatsappLink(message = "Hello Yunhong, I would like to discuss a fabric order.") {
  return `https://wa.me/${site.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(message)}`;
}
