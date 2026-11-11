"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  getStoreCategory,
  getStoreProducts,
  getStoreArticles,
  getStoreFaqs,
  getStoreSite,
  setStoreCategories,
  setStoreProducts,
  setStoreArticles,
  setStoreFaqs,
  setStoreSite,
} from "@/lib/store";
import { defaultSite } from "@/lib/site";
import type { Article, Category, Faq, Product, Site } from "@/lib/types";

export type AdminFormState = { status: "idle" | "error"; message?: string };

/* ---------------------------------------------------------------- helpers */

function parseJson(value: FormDataEntryValue | null, fallback: unknown): unknown {
  if (typeof value !== "string" || !value.trim()) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    throw new Error("One of the JSON fields is invalid — check brackets and quotes.");
  }
}

function text(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function number(value: FormDataEntryValue | null): number {
  const parsed = Number(text(value));
  return Number.isFinite(parsed) ? parsed : 0;
}

function revalidateContent() {
  revalidatePath("/");
  revalidatePath("/fabrics");
  revalidatePath("/fabrics/[category]");
  revalidatePath("/products/[slug]");
  revalidatePath("/insights");
  revalidatePath("/insights/[slug]");
  revalidatePath("/faq");
  revalidatePath("/quality");
}

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : "Save failed.";
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

/* ---------------------------------------------------------------- categories */

export async function saveCategory(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  try {
    const id = text(formData.get("id"));
    const categories: (Category & { _id?: string })[] =
      (getStoreCategory<any[]>() ?? []);

    const updated: Category = {
      slug: text(formData.get("slug")),
      name: text(formData.get("name")),
      navName: text(formData.get("navName")),
      tagline: text(formData.get("tagline")),
      summary: text(formData.get("summary")),
      intro: parseJson(formData.get("intro"), []) as Category["intro"],
      image: text(formData.get("image")),
      imageAlt: text(formData.get("imageAlt")),
      highlights: parseJson(formData.get("highlights"), []) as Category["highlights"],
      applications: parseJson(formData.get("applications"), []) as Category["applications"],
      faqs: parseJson(formData.get("faqs"), []) as Category["faqs"],
    };

    if (id) {
      const idx = categories.findIndex((c) => c._id === id);
      if (idx >= 0) categories[idx] = { ...categories[idx], ...updated };
    } else {
      categories.push({ ...updated, _id: uid() });
    }

    setStoreCategories(categories);
  } catch (error) {
    return { status: "error", message: messageOf(error) };
  }
  revalidateContent();
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  const categories: any[] = getStoreCategory<any[]>() ?? [];
  setStoreCategories(categories.filter((c) => c._id !== id));
  revalidateContent();
  redirect("/admin/categories");
}

/* ---------------------------------------------------------------- products */

export async function saveProduct(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  try {
    const id = text(formData.get("id"));
    const products: (Product & { _id?: string })[] =
      (getStoreProducts<any[]>() ?? []);

    const updated: Product = {
      slug: text(formData.get("slug")),
      name: text(formData.get("name")),
      code: text(formData.get("code")),
      categorySlug: text(formData.get("categorySlug")),
      summary: text(formData.get("summary")),
      description: parseJson(formData.get("description"), []) as Product["description"],
      composition: text(formData.get("composition")),
      weightGsm: number(formData.get("weightGsm")),
      widthCm: number(formData.get("widthCm")),
      weave: text(formData.get("weave")),
      finish: text(formData.get("finish")),
      shrinkage: text(formData.get("shrinkage")),
      moqMeters: number(formData.get("moqMeters")),
      stockMeters: number(formData.get("stockMeters")),
      leadTimeDays: [number(formData.get("leadTimeMin")), number(formData.get("leadTimeMax"))],
      priceFrom: number(formData.get("priceFrom")),
      priceTo: number(formData.get("priceTo")),
      colors: number(formData.get("colors")),
      certifications: parseJson(formData.get("certifications"), []) as Product["certifications"],
      applications: parseJson(formData.get("applications"), []) as Product["applications"],
      features: parseJson(formData.get("features"), []) as Product["features"],
      image: text(formData.get("image")),
      imageAlt: text(formData.get("imageAlt")),
      featured: formData.get("featured") === "on",
      faqs: parseJson(formData.get("faqs"), []) as Product["faqs"],
    };

    if (id) {
      const idx = products.findIndex((p) => p._id === id);
      if (idx >= 0) products[idx] = { ...products[idx], ...updated };
    } else {
      products.push({ ...updated, _id: uid() });
    }

    setStoreProducts(products);
  } catch (error) {
    return { status: "error", message: messageOf(error) };
  }
  revalidateContent();
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const products: any[] = getStoreProducts<any[]>() ?? [];
  setStoreProducts(products.filter((p) => p._id !== id));
  revalidateContent();
  redirect("/admin/products");
}

/* ---------------------------------------------------------------- articles */

export async function saveArticle(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  try {
    const id = text(formData.get("id"));
    const articles: (Article & { _id?: string })[] =
      (getStoreArticles<any[]>() ?? []);

    const updated: Article = {
      slug: text(formData.get("slug")),
      title: text(formData.get("title")),
      description: text(formData.get("description")),
      excerpt: text(formData.get("excerpt")),
      date: text(formData.get("date")),
      updated: text(formData.get("updated")) || undefined,
      author: text(formData.get("author")),
      readingMinutes: number(formData.get("readingMinutes")),
      topic: text(formData.get("topic")),
      image: text(formData.get("image")),
      imageAlt: text(formData.get("imageAlt")),
      keyTakeaways: parseJson(formData.get("keyTakeaways"), []) as Article["keyTakeaways"],
      sections: parseJson(formData.get("sections"), []) as Article["sections"],
      faqs: parseJson(formData.get("faqs"), []) as Article["faqs"],
      relatedCategories: parseJson(formData.get("relatedCategories"), []) as Article["relatedCategories"],
    };

    if (id) {
      const idx = articles.findIndex((a) => a._id === id);
      if (idx >= 0) articles[idx] = { ...articles[idx], ...updated };
    } else {
      articles.push({ ...updated, _id: uid() });
    }

    setStoreArticles(articles);
  } catch (error) {
    return { status: "error", message: messageOf(error) };
  }
  revalidateContent();
  redirect("/admin/articles");
}

export async function deleteArticle(id: string) {
  const articles: any[] = getStoreArticles<any[]>() ?? [];
  setStoreArticles(articles.filter((a) => a._id !== id));
  revalidateContent();
  redirect("/admin/articles");
}

/* ---------------------------------------------------------------- faqs */

export async function saveFaq(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  try {
    const id = text(formData.get("id"));
    const faqs: (Faq & { _id?: string; sortOrder?: number })[] =
      (getStoreFaqs<any[]>() ?? []);

    const updated: Faq = {
      question: text(formData.get("question")),
      answer: text(formData.get("answer")),
    };

    if (id) {
      const idx = faqs.findIndex((f) => f._id === id);
      if (idx >= 0) faqs[idx] = { ...faqs[idx], ...updated };
    } else {
      faqs.push({ ...updated, _id: uid(), sortOrder: faqs.length });
    }

    setStoreFaqs(faqs);
  } catch (error) {
    return { status: "error", message: messageOf(error) };
  }
  revalidatePath("/");
  revalidatePath("/faq");
  revalidatePath("/quality");
  redirect("/admin/faqs");
}

export async function deleteFaq(id: string) {
  const faqs: any[] = getStoreFaqs<any[]>() ?? [];
  setStoreFaqs(faqs.filter((f) => f._id !== id));
  revalidatePath("/");
  revalidatePath("/faq");
  redirect("/admin/faqs");
}

/* ---------------------------------------------------------------- site settings */

export async function saveSiteSettings(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  try {
    const site: Site = {
      ...defaultSite,
      name: text(formData.get("name")) || defaultSite.name,
      legalName: text(formData.get("legalName")) || defaultSite.legalName,
      shortName: text(formData.get("shortName")) || defaultSite.shortName,
      tagline: text(formData.get("tagline")) || defaultSite.tagline,
      description: text(formData.get("description")) || defaultSite.description,
      foundedYear: number(formData.get("foundedYear")) || defaultSite.foundedYear,
      email: text(formData.get("email")) || defaultSite.email,
      sampleEmail: text(formData.get("sampleEmail")) || defaultSite.sampleEmail,
      phone: text(formData.get("phone")) || defaultSite.phone,
      whatsapp: text(formData.get("whatsapp")) || defaultSite.whatsapp,
      addressLine: text(formData.get("addressLine")) || defaultSite.addressLine,
      hours: text(formData.get("hours")) || defaultSite.hours,
      responseTime: text(formData.get("responseTime")) || defaultSite.responseTime,
      address: {
        street: text(formData.get("street")),
        city: text(formData.get("city")),
        region: text(formData.get("region")),
        postalCode: text(formData.get("postalCode")),
        country: text(formData.get("country")),
      },
      social: {
        linkedin: text(formData.get("linkedin")),
        instagram: text(formData.get("instagram")),
        youtube: text(formData.get("youtube")),
      },
      markets: parseJson(formData.get("markets"), defaultSite.markets) as Site["markets"],
      certifications: parseJson(
        formData.get("certifications"),
        defaultSite.certifications,
      ) as Site["certifications"],
      stats: parseJson(formData.get("stats"), defaultSite.stats) as Site["stats"],
    };

    setStoreSite(site);
  } catch (error) {
    return { status: "error", message: messageOf(error) };
  }
  revalidateContent();
  redirect("/admin/settings");
}

/* ---------------------------------------------------------------- auth */

export async function adminLogin(_prev: { ok: boolean; message?: string }, formData: FormData) {
  const password = text(formData.get("password"));
  const expected = process.env.ADMIN_PASSWORD || "admin12345";

  if (password !== expected) {
    return { ok: false as const, message: "Incorrect password" };
  }
  // Set cookie via redirect header — we'll handle this in login page
  return { ok: true as const };
}

export async function adminSignOut() {
  redirect("/admin/login?logout=1");
}
