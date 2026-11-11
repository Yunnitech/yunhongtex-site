import { absoluteUrl, site } from "@/lib/site";
import type { Category, Faq, Product } from "@/lib/products";
import type { Article } from "@/lib/articles";

type Json = Record<string, unknown>;

const orgId = `${site.url}/#organization`;
const siteId = `${site.url}/#website`;

export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    legalName: site.legalName,
    alternateName: "Yunhong Fabric Mill",
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/logo.png`,
      width: 512,
      height: 512,
    },
    description: site.description,
    foundingDate: String(site.foundedYear),
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    sameAs: Object.values(site.social),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: site.phone,
        email: site.email,
        areaServed: ["EU", "US", "CA", "AE", "SA", "QA", "KW", "IL", "GB"],
        availableLanguage: ["English", "Chinese", "Arabic"],
      },
    ],
    knowsAbout: [
      "cotton fabric manufacturing",
      "linen fabric export",
      "denim weaving",
      "circular knit fabric",
      "viscose challis",
      "GRS recycled polyester",
      "OEKO-TEX certified textiles",
      "apparel fabric sourcing",
    ],
    hasCredential: site.certifications.map((certification) => ({
      "@type": "EducationalOccupationalCredential",
      name: certification.code,
      credentialCategory: "certification",
      description: certification.detail,
    })),
    makesOffer: [
      "Cotton fabrics",
      "Linen fabrics",
      "Denim and chambray",
      "Knitted fabrics",
      "Viscose and rayon",
      "Recycled performance fabrics",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Product", name },
    })),
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteId,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": orgId },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; href: string }>): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqSchema(faqs: Faq[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function productSchema(product: Product, category?: Category): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": absoluteUrl(`/products/${product.slug}#product`),
    name: product.name,
    sku: product.code,
    mpn: product.code,
    description: product.summary,
    image: [product.image],
    url: absoluteUrl(`/products/${product.slug}`),
    category: category?.name ?? "Apparel fabric",
    material: product.composition,
    brand: {
      "@type": "Brand",
      name: site.shortName,
    },
    manufacturer: { "@id": orgId },
    additionalProperty: [
      { name: "Composition", value: product.composition },
      { name: "Weight", value: `${product.weightGsm} gsm` },
      { name: "Usable width", value: `${product.widthCm} cm` },
      { name: "Weave / knit", value: product.weave },
      { name: "Finish", value: product.finish },
      { name: "Shrinkage", value: product.shrinkage },
      { name: "Certifications", value: product.certifications.join(", ") },
      { name: "Minimum order", value: `${product.moqMeters} m per colour` },
      {
        name: "Production lead time",
        value: `${product.leadTimeDays[0]}–${product.leadTimeDays[1]} days`,
      },
      { name: "Colour range", value: `${product.colors} shades` },
    ].map((property) => ({
      "@type": "PropertyValue",
      name: property.name,
      value: property.value,
    })),
    offers: {
      "@type": "AggregateOffer",
      "@id": absoluteUrl(`/products/${product.slug}#offer`),
      priceCurrency: "USD",
      lowPrice: product.priceFrom.toFixed(2),
      highPrice: product.priceTo.toFixed(2),
      offerCount: product.colors,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        minValue: product.moqMeters,
        unitCode: "MTR",
      },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "USD",
        minPrice: product.priceFrom,
        maxPrice: product.priceTo,
        unitCode: "MTR",
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MTR" },
      },
      seller: { "@id": orgId },
      url: absoluteUrl(`/products/${product.slug}`),
    },
    isRelatedTo: category
      ? [
          {
            "@type": "ProductGroup",
            name: category.name,
            url: absoluteUrl(`/fabrics/${category.slug}`),
          },
        ]
      : undefined,
  };
}

export function itemListSchema(
  name: string,
  items: Array<{ name: string; href: string }>,
  description?: string,
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.href),
    })),
  };
}

export function articleSchema(article: Article): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": absoluteUrl(`/insights/${article.slug}#article`),
    headline: article.title,
    description: article.description,
    image: [article.image],
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    inLanguage: "en",
    articleSection: article.topic,
    wordCount: article.sections.reduce(
      (total, section) =>
        total +
        section.paragraphs.join(" ").split(/\s+/).length +
        (section.bullets?.join(" ").split(/\s+/).length ?? 0),
      0,
    ),
    author: {
      "@type": "Organization",
      name: article.author,
      url: absoluteUrl("/about"),
    },
    publisher: { "@id": orgId },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/insights/${article.slug}`),
    },
    isPartOf: { "@id": siteId },
  };
}

export function webPageSchema({
  title,
  description,
  path,
  type = "WebPage",
}: {
  title: string;
  description: string;
  path: string;
  type?: "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage";
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { "@id": siteId },
    about: { "@id": orgId },
    inLanguage: "en",
  };
}
