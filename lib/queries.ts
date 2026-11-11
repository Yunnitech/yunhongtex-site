import type { Article, Category, Faq, Product, Site } from "@/lib/types";
import { categories as seedCategories, products as seedProducts } from "@/lib/products";
import { articles as seedArticles } from "@/lib/articles";
import { faqs as seedFaqs } from "@/lib/faqs";
import { defaultSite } from "@/lib/site";
import { createAnonSupabaseClient } from "@/lib/supabase/anon";

/* eslint-disable @typescript-eslint/no-explicit-any */

function mapCategory(r: any): Category {
  return {
    slug: r.slug,
    name: r.name,
    navName: r.nav_name,
    tagline: r.tagline ?? "",
    summary: r.summary ?? "",
    intro: r.intro ?? [],
    image: r.image ?? "",
    imageAlt: r.image_alt ?? "",
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
    categorySlug: r.category_slug ?? "",
    summary: r.summary ?? "",
    description: r.description ?? [],
    composition: r.composition ?? "",
    weightGsm: r.weight_gsm ?? 0,
    widthCm: r.width_cm ?? 0,
    weave: r.weave ?? "",
    finish: r.finish ?? "",
    shrinkage: r.shrinkage ?? "",
    moqMeters: r.moq_meters ?? 0,
    stockMeters: r.stock_meters ?? 0,
    leadTimeDays: [r.lead_time_min ?? 0, r.lead_time_max ?? 0],
    priceFrom: Number(r.price_from ?? 0),
    priceTo: Number(r.price_to ?? 0),
    colors: r.colors ?? 0,
    certifications: r.certifications ?? [],
    applications: r.applications ?? [],
    features: r.features ?? [],
    image: r.image ?? "",
    imageAlt: r.image_alt ?? "",
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
    readingMinutes: r.reading_minutes ?? 0,
    topic: r.topic ?? "",
    image: r.image ?? "",
    imageAlt: r.image_alt ?? "",
    keyTakeaways: r.key_takeaways ?? [],
    sections: r.sections ?? [],
    faqs: r.faqs ?? [],
    relatedCategories: r.related_categories ?? [],
  };
}

function mapFaq(r: any): Faq {
  return { question: r.question, answer: r.answer };
}

/* ------------------------------------------------------------------ categories */

export async function getCategories(): Promise<Category[]> {
  const supabase = createAnonSupabaseClient();
  if (!supabase) return seedCategories;
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order")
    .order("name");
  if (error) return seedCategories;
  return (data ?? []).map(mapCategory);
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug);
}

/* ------------------------------------------------------------------ products */

export async function getProducts(): Promise<Product[]> {
  const supabase = createAnonSupabaseClient();
  if (!supabase) return seedProducts;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order")
    .order("name");
  if (error) return seedProducts;
  return (data ?? []).map(mapProduct);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.categorySlug === slug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.featured);
}

export async function getRelatedProducts(slug: string, limit = 3): Promise<Product[]> {
  const product = await getProduct(slug);
  const products = await getProducts();
  if (!product) return [];
  return products
    .filter((item) => item.categorySlug === product.categorySlug && item.slug !== slug)
    .concat(products.filter((item) => item.categorySlug !== product.categorySlug))
    .slice(0, limit);
}

/* ------------------------------------------------------------------ articles */

export async function getArticles(): Promise<Article[]> {
  const supabase = createAnonSupabaseClient();
  if (!supabase) return seedArticles;
  const { data, error } = await supabase.from("articles").select("*").order("date", { ascending: false });
  if (error) return seedArticles;
  return (data ?? []).map(mapArticle);
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug);
}

export async function getRecentArticles(limit = 3): Promise<Article[]> {
  const articles = await getArticles();
  return [...articles].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, limit);
}

/* ------------------------------------------------------------------ faqs */

export async function getFaqs(): Promise<Faq[]> {
  const supabase = createAnonSupabaseClient();
  if (!supabase) return seedFaqs;
  const { data, error } = await supabase.from("faqs").select("*").order("sort_order");
  if (error) return seedFaqs;
  return (data ?? []).map(mapFaq);
}

/* ------------------------------------------------------------------ site */

function mergeSite(base: Site, override: any): Site {
  return {
    ...base,
    ...override,
    address: { ...base.address, ...(override.address ?? {}) },
    social: { ...base.social, ...(override.social ?? {}) },
    terms: { ...base.terms, ...(override.terms ?? {}) },
  };
}

export async function getSite(): Promise<Site> {
  const supabase = createAnonSupabaseClient();
  if (!supabase) return defaultSite;
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "site")
    .single();
  if (error || !data?.value) return defaultSite;
  return mergeSite(defaultSite, data.value);
}
