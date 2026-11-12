"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { timingSafeEqual } from "crypto";
import { sha256Hex } from "@/lib/utils";
import {
  getStoreCategories,
  getStoreProducts,
  getStoreArticles,
  getStoreFaqs,
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

function parseJson(
  value: FormDataEntryValue | null,
  fallback: unknown,
  label: string,
): unknown {
  if (typeof value !== "string" || !value.trim()) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    throw new Error(`${label} is not valid JSON — check brackets and quotes.`);
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

/* ---------------------------------------------------------------- categories */

export async function saveCategory(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  try {
    const id = text(formData.get("id"));
    const categories: Category[] = (await getStoreCategories<Category[]>()) ?? [];

    const updated: Category = {
      slug: text(formData.get("slug")),
      name: text(formData.get("name")),
      navName: text(formData.get("navName")),
      tagline: text(formData.get("tagline")),
      summary: text(formData.get("summary")),
      intro: parseJson(formData.get("intro"), [], "Intro") as Category["intro"],
      image: text(formData.get("image")),
      imageAlt: text(formData.get("imageAlt")),
      highlights: parseJson(
        formData.get("highlights"),
        [],
        "Highlights",
      ) as Category["highlights"],
      applications: parseJson(
        formData.get("applications"),
        [],
        "Applications",
      ) as Category["applications"],
      faqs: parseJson(formData.get("faqs"), [], "FAQs") as Category["faqs"],
    };

    const idx = id ? categories.findIndex((c) => c.slug === id) : -1;
    if (idx >= 0) categories[idx] = { ...categories[idx], ...updated };
    else categories.push(updated);

    await setStoreCategories(categories);
  } catch (error) {
    return { status: "error", message: messageOf(error) };
  }
  revalidateContent();
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  const categories: Category[] = (await getStoreCategories<Category[]>()) ?? [];
  await setStoreCategories(categories.filter((c) => c.slug !== id));
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
    const products: Product[] = (await getStoreProducts<Product[]>()) ?? [];

    const updated: Product = {
      slug: text(formData.get("slug")),
      name: text(formData.get("name")),
      code: text(formData.get("code")),
      categorySlug: text(formData.get("categorySlug")),
      summary: text(formData.get("summary")),
      description: parseJson(
        formData.get("description"),
        [],
        "Description",
      ) as Product["description"],
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
      certifications: parseJson(
        formData.get("certifications"),
        [],
        "Certifications",
      ) as Product["certifications"],
      applications: parseJson(
        formData.get("applications"),
        [],
        "Applications",
      ) as Product["applications"],
      features: parseJson(formData.get("features"), [], "Features") as Product["features"],
      image: text(formData.get("image")),
      imageAlt: text(formData.get("imageAlt")),
      featured: formData.get("featured") === "on",
      faqs: parseJson(formData.get("faqs"), [], "FAQs") as Product["faqs"],
    };

    const idx = id ? products.findIndex((p) => p.slug === id) : -1;
    if (idx >= 0) products[idx] = { ...products[idx], ...updated };
    else products.push(updated);

    await setStoreProducts(products);
  } catch (error) {
    return { status: "error", message: messageOf(error) };
  }
  revalidateContent();
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const products: Product[] = (await getStoreProducts<Product[]>()) ?? [];
  await setStoreProducts(products.filter((p) => p.slug !== id));
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
    const articles: Article[] = (await getStoreArticles<Article[]>()) ?? [];

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
      keyTakeaways: parseJson(
        formData.get("keyTakeaways"),
        [],
        "Key takeaways",
      ) as Article["keyTakeaways"],
      sections: parseJson(formData.get("sections"), [], "Sections") as Article["sections"],
      faqs: parseJson(formData.get("faqs"), [], "FAQs") as Article["faqs"],
      relatedCategories: parseJson(
        formData.get("relatedCategories"),
        [],
        "Related categories",
      ) as Article["relatedCategories"],
    };

    const idx = id ? articles.findIndex((a) => a.slug === id) : -1;
    if (idx >= 0) articles[idx] = { ...articles[idx], ...updated };
    else articles.push(updated);

    await setStoreArticles(articles);
  } catch (error) {
    return { status: "error", message: messageOf(error) };
  }
  revalidateContent();
  redirect("/admin/articles");
}

export async function deleteArticle(id: string) {
  const articles: Article[] = (await getStoreArticles<Article[]>()) ?? [];
  await setStoreArticles(articles.filter((a) => a.slug !== id));
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
    const faqs: Faq[] = (await getStoreFaqs<Faq[]>()) ?? [];

    const updated: Faq = {
      id: id || crypto.randomUUID(),
      question: text(formData.get("question")),
      answer: text(formData.get("answer")),
    };

    // Locate by stable id; fall back to the legacy numeric index so old
    // store data without ids can still be edited safely.
    const sortOrder = number(formData.get("sortOrder"));
    const byId = id ? faqs.findIndex((f) => f.id === id) : -1;
    const legacyIndex =
      byId === -1 && id && /^\d+$/.test(id) && Number(id) < faqs.length ? Number(id) : -1;
    const idx = byId !== -1 ? byId : legacyIndex;

    if (idx >= 0) {
      const [item] = faqs.splice(idx, 1);
      const target = Math.min(Math.max(sortOrder, 0), faqs.length);
      faqs.splice(target, 0, { ...item, ...updated });
    } else {
      faqs.splice(Math.min(Math.max(sortOrder, 0), faqs.length), 0, updated);
    }

    await setStoreFaqs(faqs);
  } catch (error) {
    return { status: "error", message: messageOf(error) };
  }
  revalidatePath("/");
  revalidatePath("/faq");
  revalidatePath("/quality");
  redirect("/admin/faqs");
}

export async function deleteFaq(id: string) {
  const faqs: Faq[] = (await getStoreFaqs<Faq[]>()) ?? [];
  const byId = faqs.findIndex((f) => f.id === id);
  const legacyIndex = byId === -1 && /^\d+$/.test(id) && Number(id) < faqs.length ? Number(id) : -1;
  const idx = byId !== -1 ? byId : legacyIndex;
  if (idx >= 0) faqs.splice(idx, 1);
  await setStoreFaqs(faqs);
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
      markets: parseJson(
        formData.get("markets"),
        defaultSite.markets,
        "Markets",
      ) as Site["markets"],
      certifications: parseJson(
        formData.get("certifications"),
        defaultSite.certifications,
        "Certifications",
      ) as Site["certifications"],
      stats: parseJson(formData.get("stats"), defaultSite.stats, "Stats") as Site["stats"],
    };

    await setStoreSite(site);
  } catch (error) {
    return { status: "error", message: messageOf(error) };
  }
  revalidateContent();
  redirect("/admin/settings");
}

/* ---------------------------------------------------------------- auth */

const ADMIN_COOKIE = "admin_auth";

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf-8");
  const bufB = Buffer.from(b, "utf-8");
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export async function adminLogin(_prev: { ok: boolean; message?: string }, formData: FormData) {
  const password = text(formData.get("password"));
  const expected = process.env.ADMIN_PASSWORD;

  // Fail closed: no fallback password. Without ADMIN_PASSWORD the admin
  // area cannot be logged into.
  if (!expected) {
    return { ok: false as const, message: "ADMIN_PASSWORD is not configured on the server." };
  }

  if (!safeEqual(sha256Hex(password), sha256Hex(expected))) {
    return { ok: false as const, message: "Incorrect password" };
  }

  // httpOnly cookie holding only the password hash — never the password.
  (await cookies()).set(ADMIN_COOKIE, sha256Hex(expected), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return { ok: true as const };
}

export async function adminSignOut() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin/login?logout=1");
}
