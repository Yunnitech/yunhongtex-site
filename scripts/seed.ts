/**
 * Seed script: imports the bundled static catalogue (categories, products,
 * articles, site-wide FAQs and company settings) into Supabase and creates
 * the admin login.
 *
 * Prerequisites:
 *   1. Supabase project with supabase/schema.sql applied (SQL editor).
 *   2. .env with NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
 *      ADMIN_EMAIL, ADMIN_PASSWORD.
 *
 * Run:  npx tsx scripts/seed.ts   (idempotent — safe to re-run)
 */
import { createClient } from "@supabase/supabase-js";
import { categories, products } from "../lib/products";
import { articles } from "../lib/articles";
import { faqs } from "../lib/faqs";
import { defaultSite } from "../lib/site";

try {
  process.loadEnvFile?.();
} catch {
  // .env optional when env vars come from the shell
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Fill .env first.",
  );
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const now = () => new Date().toISOString();

async function main() {
  const categoryRows = categories.map((category, index) => ({
    slug: category.slug,
    name: category.name,
    nav_name: category.navName,
    tagline: category.tagline,
    summary: category.summary,
    intro: category.intro,
    image: category.image,
    image_alt: category.imageAlt,
    highlights: category.highlights,
    applications: category.applications,
    faqs: category.faqs,
    sort_order: index,
    updated_at: now(),
  }));
  const { error: categoryError } = await admin
    .from("categories")
    .upsert(categoryRows, { onConflict: "slug" });
  if (categoryError) throw categoryError;

  const productRows = products.map((product, index) => ({
    slug: product.slug,
    name: product.name,
    code: product.code,
    category_slug: product.categorySlug,
    summary: product.summary,
    description: product.description,
    composition: product.composition,
    weight_gsm: product.weightGsm,
    width_cm: product.widthCm,
    weave: product.weave,
    finish: product.finish,
    shrinkage: product.shrinkage,
    moq_meters: product.moqMeters,
    stock_meters: product.stockMeters,
    lead_time_min: product.leadTimeDays[0],
    lead_time_max: product.leadTimeDays[1],
    price_from: product.priceFrom,
    price_to: product.priceTo,
    colors: product.colors,
    certifications: product.certifications,
    applications: product.applications,
    features: product.features,
    image: product.image,
    image_alt: product.imageAlt,
    featured: product.featured ?? false,
    faqs: product.faqs,
    sort_order: index,
    updated_at: now(),
  }));
  const { error: productError } = await admin
    .from("products")
    .upsert(productRows, { onConflict: "slug" });
  if (productError) throw productError;

  const articleRows = articles.map((article, index) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    excerpt: article.excerpt,
    date: article.date,
    updated: article.updated ?? article.date,
    author: article.author,
    reading_minutes: article.readingMinutes,
    topic: article.topic,
    image: article.image,
    image_alt: article.imageAlt,
    key_takeaways: article.keyTakeaways,
    sections: article.sections,
    faqs: article.faqs,
    related_categories: article.relatedCategories,
    sort_order: index,
    updated_at: now(),
  }));
  const { error: articleError } = await admin
    .from("articles")
    .upsert(articleRows, { onConflict: "slug" });
  if (articleError) throw articleError;

  const faqRows = faqs.map((faq, index) => ({
    question: faq.question,
    answer: faq.answer,
    sort_order: index,
    updated_at: now(),
  }));
  const { error: faqError } = await admin.from("faqs").upsert(faqRows);
  if (faqError) throw faqError;

  const { error: siteError } = await admin
    .from("site_settings")
    .upsert({ key: "site", value: defaultSite, updated_at: now() });
  if (siteError) throw siteError;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const { error: userError } = await admin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
    });
    if (userError && !userError.message.toLowerCase().includes("already")) {
      console.warn("Admin user warning:", userError.message);
    } else {
      console.log("Admin login ready:", adminEmail);
    }
  } else {
    console.log("Skipped admin user — set ADMIN_EMAIL and ADMIN_PASSWORD in .env.");
  }

  console.log(
    `Seeded: ${categories.length} categories, ${products.length} products, ${articles.length} articles, ${faqs.length} FAQs, site settings.`,
  );
}

main().catch((error) => {
  console.error("Seed failed:", error.message ?? error);
  process.exit(1);
});
