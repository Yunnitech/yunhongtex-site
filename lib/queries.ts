import { cache } from "react";
import type { Article, Category, Faq, Product, Site } from "@/lib/types";
import { categories as seedCategories, products as seedProducts } from "@/lib/products";
import { articles as seedArticles } from "@/lib/articles";
import { faqs as seedFaqs } from "@/lib/faqs";
import { defaultSite } from "@/lib/site";
import {
  getStoreCategories,
  getStoreProducts,
  getStoreArticles,
  getStoreFaqs,
  getStoreSite,
} from "@/lib/store";

/* eslint-disable @typescript-eslint/no-explicit-any */

function mapCategory(r: any): Category {
  return {
    slug: r.slug,
    name: r.name,
    navName: r.navName ?? r.nav_name,
    tagline: r.tagline ?? "",
    summary: r.summary ?? "",
    intro: r.intro ?? [],
    image: r.image ?? "",
    imageAlt: r.imageAlt ?? r.image_alt ?? "",
    highlights: r.highlights ?? [],
    applications: r.applications ?? [],
    faqs: r.faqs ?? [],
  };
}

function mapProduct(r: any): Product {
  return {
    slug: r.slug,
    name: r.name,
    code: r.code,
    categorySlug: r.categorySlug ?? r.category_slug ?? "",
    summary: r.summary ?? "",
    description: r.description ?? [],
    composition: r.composition ?? "",
    weightGsm: r.weightGsm ?? r.weight_gsm ?? 0,
    widthCm: r.widthCm ?? r.width_cm ?? 0,
    weave: r.weave ?? "",
    finish: r.finish ?? "",
    shrinkage: r.shrinkage ?? "",
    moqMeters: r.moqMeters ?? r.moq_meters ?? 0,
    stockMeters: r.stockMeters ?? r.stock_meters ?? 0,
    leadTimeDays:
      Array.isArray(r.leadTimeDays) && r.leadTimeDays.length === 2
        ? r.leadTimeDays
        : [r.lead_time_min ?? 0, r.lead_time_max ?? 0],
    priceFrom: Number(r.priceFrom ?? r.price_from ?? 0),
    priceTo: Number(r.priceTo ?? r.price_to ?? 0),
    colors: r.colors ?? 0,
    certifications: r.certifications ?? [],
    applications: r.applications ?? [],
    features: r.features ?? [],
    image: r.image ?? "",
    imageAlt: r.imageAlt ?? r.image_alt ?? "",
    featured: r.featured ?? false,
    faqs: r.faqs ?? [],
  };
}

function mapArticle(r: any): Article {
  return {
    slug: r.slug,
    title: r.title,
    description: r.description ?? "",
    excerpt: r.excerpt ?? "",
    date: r.date ?? "",
    updated: r.updated ?? undefined,
    author: r.author ?? "",
    readingMinutes: r.readingMinutes ?? r.reading_minutes ?? 0,
    topic: r.topic ?? "",
    image: r.image ?? "",
    imageAlt: r.imageAlt ?? r.image_alt ?? "",
    keyTakeaways: r.keyTakeaways ?? r.key_takeaways ?? [],
    sections: r.sections ?? [],
    faqs: r.faqs ?? [],
    relatedCategories: r.relatedCategories ?? r.related_categories ?? [],
  };
}

function mapFaq(r: any): Faq {
  return { question: r.question, answer: r.answer };
}

/* ------------------------------------------------------------------ data source priority:
   1. data/*.json files (edited via admin panel, or Upstash Redis on Vercel)
   2. bundled static seeds

   Every loader is wrapped in React `cache()` so that within a single render
   pass (layout + header + footer + page + generateMetadata) the store is
   read only once per collection — one Redis round-trip or file read instead
   of five to seven. The cache resets between requests, so admin edits take
   effect on the next render after `revalidatePath`.                               */

const loadCategories = cache(async (): Promise<Category[]> => {
  const file = await getStoreCategories<any[]>();
  if (file) return file.map(mapCategory);
  return seedCategories;
});

const loadProducts = cache(async (): Promise<Product[]> => {
  const file = await getStoreProducts<any[]>();
  if (file) return file.map(mapProduct);
  return seedProducts;
});

const loadArticles = cache(async (): Promise<Article[]> => {
  const file = await getStoreArticles<any[]>();
  if (file) return file.map(mapArticle);
  return seedArticles;
});

const loadFaqs = cache(async (): Promise<Faq[]> => {
  const file = await getStoreFaqs<any[]>();
  if (file) return file.map(mapFaq);
  return seedFaqs;
});

const loadSite = cache(async (): Promise<Site> => {
  const file = await getStoreSite<Site>();
  if (file) return { ...defaultSite, ...file, address: { ...defaultSite.address, ...(file.address ?? {}) }, social: { ...defaultSite.social, ...(file.social ?? {}) }, terms: { ...defaultSite.terms, ...(file.terms ?? {}) } };
  return defaultSite;
});

/* ------------------------------------------------------------------ exports */

export async function getCategories(): Promise<Category[]> {
  return loadCategories();
}
export async function getCategory(slug: string): Promise<Category | undefined> {
  return (await loadCategories()).find((c) => c.slug === slug);
}

export async function getProducts(): Promise<Product[]> {
  return loadProducts();
}
export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await loadProducts()).find((p) => p.slug === slug);
}
export async function getProductsByCategory(slug: string): Promise<Product[]> {
  return (await loadProducts()).filter((p) => p.categorySlug === slug);
}
export async function getFeaturedProducts(): Promise<Product[]> {
  return (await loadProducts()).filter((p) => p.featured);
}
export async function getRelatedProducts(slug: string, limit = 3): Promise<Product[]> {
  const all = await loadProducts();
  const product = all.find((p) => p.slug === slug);
  if (!product) return [];
  return all
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== slug)
    .concat(all.filter((p) => p.categorySlug !== product.categorySlug))
    .slice(0, limit);
}

export async function getArticles(): Promise<Article[]> {
  return loadArticles();
}
export async function getArticle(slug: string): Promise<Article | undefined> {
  return (await loadArticles()).find((a) => a.slug === slug);
}
export async function getRecentArticles(limit = 3): Promise<Article[]> {
  return [...(await loadArticles())].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, limit);
}

export async function getFaqs(): Promise<Faq[]> {
  return loadFaqs();
}

export async function getSite(): Promise<Site> {
  return loadSite();
}
