import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const configured = isSupabaseConfigured();
  const supabase = await createServerSupabaseClient();

  let products = 0;
  let categories = 0;
  let articles = 0;
  let faqs = 0;

  if (supabase) {
    const [p, c, a, f] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("categories").select("id", { count: "exact", head: true }),
      supabase.from("articles").select("id", { count: "exact", head: true }),
      supabase.from("faqs").select("id", { count: "exact", head: true }),
    ]);
    products = p.count ?? 0;
    categories = c.count ?? 0;
    articles = a.count ?? 0;
    faqs = f.count ?? 0;
  }

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const gaLink = gaId
    ? `https://analytics.google.com/analytics/web/#/p${gaId.replace(/^G-/, "")}/reports/reportinghub`
    : null;

  const cards = [
    { label: "Products", value: products, href: "/admin/products", note: "Stock programmes on /fabrics" },
    { label: "Categories", value: categories, href: "/admin/categories", note: "Six fabric families" },
    { label: "Articles", value: articles, href: "/admin/articles", note: "Sourcing guides on /insights" },
    { label: "Buyer FAQs", value: faqs, href: "/admin/faqs", note: "Shown on the homepage and /faq" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Overview</p>
          <h1 className="mt-3 font-display text-[2rem] leading-tight">Dashboard</h1>
        </div>
        <Link href="/admin/products/new" className="btn btn-primary">
          + New product
        </Link>
      </div>

      {!configured && (
        <p
          role="alert"
          className="mt-6 rounded-lg border border-clay/40 bg-clay-soft px-4 py-3 text-sm text-clay-deep"
        >
          Supabase is not configured yet. Fill <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code>.env</code>, run{" "}
          <code>supabase/schema.sql</code> in the SQL editor, then run{" "}
          <code>node scripts/seed.mjs</code>. Until then the site serves its built-in seed data.
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-[16px] border border-line bg-surface p-5 transition-colors hover:border-ink"
          >
            <p className="font-display text-[2rem] leading-none">{card.value}</p>
            <p className="mt-2 text-[0.9375rem] font-medium">{card.label}</p>
            <p className="mt-1 text-[0.75rem] text-muted">{card.note}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-[16px] border border-line bg-surface p-6">
        <h2 className="text-[1.125rem] font-medium">Traffic &amp; enquiries</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
          Visitor traffic (sources, countries, pages) is measured by Google Analytics 4. Open the
          GA4 property to see where buyers come from; enquiries submitted through the contact form
          currently print to the server log and should be routed to your email/CRM next.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {gaLink ? (
            <a href={gaLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Open Google Analytics
            </a>
          ) : (
            <span className="btn btn-outline opacity-60" aria-disabled="true">
              GA4 not configured (NEXT_PUBLIC_GA_ID)
            </span>
          )}
          <Link href="/contact" className="btn btn-outline">
            Test the RFQ form
          </Link>
        </div>
      </div>
    </div>
  );
}
