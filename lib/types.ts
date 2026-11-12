/** Shared domain types — single source for both the front-end and the admin CMS. */

export type Faq = { id?: string; question: string; answer: string };

export type Category = {
  slug: string;
  name: string;
  navName: string;
  tagline: string;
  summary: string;
  intro: string[];
  image: string;
  imageAlt: string;
  highlights: string[];
  applications: string[];
  faqs: Faq[];
};

export type Product = {
  slug: string;
  name: string;
  code: string;
  categorySlug: string;
  summary: string;
  description: string[];
  composition: string;
  weightGsm: number;
  widthCm: number;
  weave: string;
  finish: string;
  shrinkage: string;
  moqMeters: number;
  stockMeters: number;
  leadTimeDays: [number, number];
  priceFrom: number;
  priceTo: number;
  colors: number;
  certifications: string[];
  applications: string[];
  features: string[];
  image: string;
  imageAlt: string;
  featured?: boolean;
  faqs: Faq[];
};

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  table?: { caption: string; head: string[]; rows: string[][] };
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  updated?: string;
  author: string;
  readingMinutes: number;
  topic: string;
  image: string;
  imageAlt: string;
  keyTakeaways: string[];
  sections: ArticleSection[];
  faqs: Faq[];
  relatedCategories: string[];
};

export type Certification = { code: string; detail: string };
export type Market = { region: string; countries: string; ports: string; notes: string };
export type Stat = { value: string; label: string };
export type NavItem = { href: string; label: string };

export type Site = {
  name: string;
  legalName: string;
  shortName: string;
  url: string;
  locale: string;
  language: string;
  tagline: string;
  description: string;
  foundedYear: number;
  email: string;
  sampleEmail: string;
  phone: string;
  whatsapp: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  addressLine: string;
  hours: string;
  responseTime: string;
  social: { linkedin: string; instagram: string; youtube: string };
  terms: {
    moq: string;
    stockMoq: string;
    sampleLeadTime: string;
    bulkLeadTime: string;
    incoterms: string[];
    payment: string;
    currency: string;
  };
  markets: Market[];
  certifications: Certification[];
  stats: Stat[];
};
