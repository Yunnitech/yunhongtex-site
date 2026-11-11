import type { MetadataRoute } from "next";
import { getArticles, getCategories, getProducts } from "@/lib/queries";
import { absoluteUrl } from "@/lib/site";

const siteUpdated = new Date("2026-11-04T09:00:00Z");
const legalUpdated = new Date("2026-10-01T09:00:00Z");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories();
  const products = await getProducts();
  const articles = await getArticles();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: siteUpdated, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/fabrics"), lastModified: siteUpdated, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/services"), lastModified: siteUpdated, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/quality"), lastModified: siteUpdated, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/insights"), lastModified: siteUpdated, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/about"), lastModified: siteUpdated, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/faq"), lastModified: siteUpdated, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: siteUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/privacy"), lastModified: legalUpdated, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terms"), lastModified: legalUpdated, changeFrequency: "yearly", priority: 0.2 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/fabrics/${category.slug}`),
    lastModified: siteUpdated,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/products/${product.slug}`),
    lastModified: siteUpdated,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/insights/${article.slug}`),
    lastModified: new Date(article.updated ?? article.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...articlePages];
}
