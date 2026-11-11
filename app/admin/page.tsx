import Link from "next/link";
import {
  getStoreArticles,
  getStoreCategories,
  getStoreFaqs,
  getStoreProducts,
  isRemoteStore,
} from "@/lib/store";
import type { Article, Category, Faq, Product } from "@/lib/types";

export default async function AdminDashboard() {
  const remote = isRemoteStore();
  const [products, categories, articles, faqs] = await Promise.all([
    getStoreProducts<Product[]>(),
    getStoreCategories<Category[]>(),
    getStoreArticles<Article[]>(),
    getStoreFaqs<Faq[]>(),
  ]);

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const gaLink = gaId
    ? `https://analytics.google.com/analytics/web/#/p${gaId.replace(/^G-/, "")}/reports/reportinghub`
    : null;

  const cards = [
    {
      label: "Products",
      value: products?.length ?? 0,
      href: "/admin/products",
      note: "Stock programmes on /fabrics",
    },
    {
      label: "Categories",
      value: categories?.length ?? 0,
      href: "/admin/categories",
      note: "Six fabric families",
    },
    {
      label: "Articles",
      value: articles?.length ?? 0,
      href: "/admin/articles",
      note: "Sourcing guides on /insights",
    },
    {
      label: "Buyer FAQs",
      value: faqs?.length ?? 0,
      href: "/admin/faqs",
      note: "Shown on the homepage and /faq",
    },
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

      {remote ? (
        <p
          role="status"
          className="mt-6 rounded-lg border border-forest/40 bg-forest-soft px-4 py-3 text-sm text-forest"
        >
          Online saving enabled (Upstash Redis)
        </p>
      ) : (
        <p
          role="status"
          className="mt-6 rounded-lg border border-line bg-sand px-4 py-3 text-sm text-ink-soft"
        >
          Local file mode — edits are written to <code>data/*.json</code> (works locally).
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
