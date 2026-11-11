"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { defaultSite } from "@/lib/site";
import type { Site } from "@/lib/types";

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
  revalidatePath("/llms.txt");
}

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : "Save failed.";
}

/* ---------------------------------------------------------------- sign out */

export async function adminSignOut() {
  const supabase = await createServerSupabaseClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}

/* ---------------------------------------------------------------- products */

export async function saveProduct(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { status: "error", message: "Supabase is not configured (check .env)." };
  try {
    const id = text(formData.get("id")) || undefined;
    const row = {
      slug: text(formData.get("slug")),
      name: text(formData.get("name")),
      code: text(formData.get("code")),
      category_slug: text(formData.get("categorySlug")),
      summary: text(formData.get("summary")),
      description: parseJson(formData.get("description"), []),
      composition: text(formData.get("composition")),
      weight_gsm: number(formData.get("weightGsm")),
      width_cm: number(formData.get("widthCm")),
      weave: text(formData.get("weave")),
      finish: text(formData.get("finish")),
      shrinkage: text(formData.get("shrinkage")),
      moq_meters: number(formData.get("moqMeters")),
      stock_meters: number(formData.get("stockMeters")),
      lead_time_min: number(formData.get("leadTimeMin")),
      lead_time_max: number(formData.get("leadTimeMax")),
      price_from: number(formData.get("priceFrom")),
      price_to: number(formData.get("priceTo")),
      colors: number(formData.get("colors")),
      certifications: parseJson(formData.get("certifications"), []),
      applications: parseJson(formData.get("applications"), []),
      features: parseJson(formData.get("features"), []),
      image: text(formData.get("image")),
      image_alt: text(formData.get("imageAlt")),
      featured: formData.get("featured") === "on",
      faqs: parseJson(formData.get("faqs"), []),
      updated_at: new Date().toISOString(),
    };
    const { error } = id
      ? await supabase.from("products").update(row).eq("id", id)
      : await supabase.from("products").insert(row);
    if (error) return { status: "error", message: error.message };
  } catch (error) {
    return { status: "error", message: messageOf(error) };
  }
  revalidateContent();
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const supabase = await createServerSupabaseClient();
  await supabase?.from("products").delete().eq("id", id);
  revalidateContent();
  redirect("/admin/products");
}

/* ---------------------------------------------------------------- categories */

export async function saveCategory(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { status: "error", message: "Supabase is not configured (check .env)." };
  try {
    const id = text(formData.get("id")) || undefined;
    const row = {
      slug: text(formData.get("slug")),
      name: text(formData.get("name")),
      nav_name: text(formData.get("navName")),
      tagline: text(formData.get("tagline")),
      summary: text(formData.get("summary")),
      intro: parseJson(formData.get("intro"), []),
      image: text(formData.get("image")),
      image_alt: text(formData.get("imageAlt")),
      highlights: parseJson(formData.get("highlights"), []),
      applications: parseJson(formData.get("applications"), []),
      faqs: parseJson(formData.get("faqs"), []),
      updated_at: new Date().toISOString(),
    };
    const { error } = id
      ? await supabase.from("categories").update(row).eq("id", id)
      : await supabase.from("categories").insert(row);
    if (error) return { status: "error", message: error.message };
  } catch (error) {
    return { status: "error", message: messageOf(error) };
  }
  revalidateContent();
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  const supabase = await createServerSupabaseClient();
  await supabase?.from("categories").delete().eq("id", id);
  revalidateContent();
  redirect("/admin/categories");
}

/* ---------------------------------------------------------------- articles */

export async function saveArticle(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { status: "error", message: "Supabase is not configured (check .env)." };
  try {
    const id = text(formData.get("id")) || undefined;
    const row = {
      slug: text(formData.get("slug")),
      title: text(formData.get("title")),
      description: text(formData.get("description")),
      excerpt: text(formData.get("excerpt")),
      date: text(formData.get("date")),
      updated: text(formData.get("updated")) || text(formData.get("date")),
      author: text(formData.get("author")),
      reading_minutes: number(formData.get("readingMinutes")),
      topic: text(formData.get("topic")),
      image: text(formData.get("image")),
      image_alt: text(formData.get("imageAlt")),
      key_takeaways: parseJson(formData.get("keyTakeaways"), []),
      sections: parseJson(formData.get("sections"), []),
      faqs: parseJson(formData.get("faqs"), []),
      related_categories: parseJson(formData.get("relatedCategories"), []),
      updated_at: new Date().toISOString(),
    };
    const { error } = id
      ? await supabase.from("articles").update(row).eq("id", id)
      : await supabase.from("articles").insert(row);
    if (error) return { status: "error", message: error.message };
  } catch (error) {
    return { status: "error", message: messageOf(error) };
  }
  revalidateContent();
  redirect("/admin/articles");
}

export async function deleteArticle(id: string) {
  const supabase = await createServerSupabaseClient();
  await supabase?.from("articles").delete().eq("id", id);
  revalidateContent();
  redirect("/admin/articles");
}

/* ---------------------------------------------------------------- faqs */

export async function saveFaq(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { status: "error", message: "Supabase is not configured (check .env)." };
  try {
    const id = text(formData.get("id")) || undefined;
    const row = {
      question: text(formData.get("question")),
      answer: text(formData.get("answer")),
      sort_order: number(formData.get("sortOrder")),
      updated_at: new Date().toISOString(),
    };
    const { error } = id
      ? await supabase.from("faqs").update(row).eq("id", id)
      : await supabase.from("faqs").insert(row);
    if (error) return { status: "error", message: error.message };
  } catch (error) {
    return { status: "error", message: messageOf(error) };
  }
  revalidatePath("/");
  revalidatePath("/faq");
  revalidatePath("/quality");
  revalidatePath("/fabrics");
  redirect("/admin/faqs");
}

export async function deleteFaq(id: string) {
  const supabase = await createServerSupabaseClient();
  await supabase?.from("faqs").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/faq");
  redirect("/admin/faqs");
}

/* ---------------------------------------------------------------- site settings */

export async function saveSiteSettings(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { status: "error", message: "Supabase is not configured (check .env)." };
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
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: "site", value: site, updated_at: new Date().toISOString() });
    if (error) return { status: "error", message: error.message };
  } catch (error) {
    return { status: "error", message: messageOf(error) };
  }
  revalidateContent();
  redirect("/admin/settings");
}
