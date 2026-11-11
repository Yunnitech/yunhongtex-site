import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { articles } from "@/lib/articles";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Fabric Sourcing Insights for Apparel Buyers",
  description:
    "Practical guides on fabric weight, certification, MOQ and lead-time planning, and choosing linen and viscose for hot climates — written by the Yunhong technical and sales teams.",
  path: "/insights",
  keywords: [
    "fabric sourcing guide",
    "fabric GSM guide",
    "textile certification guide",
    "fabric MOQ guide",
  ],
});

export default function InsightsPage() {
  const [lead, ...rest] = articles;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "Fabric sourcing insights",
            description:
              "Practical guides on fabric weight, certification, minimums and warm-climate sourcing.",
            path: "/insights",
            type: "CollectionPage",
          }),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Insights", href: "/insights" },
          ]),
          itemListSchema(
            "Yunhong sourcing insights",
            articles.map((article) => ({
              name: article.title,
              href: `/insights/${article.slug}`,
            })),
          ),
        ]}
      />

      <div className="border-b border-line">
        <div className="shell py-6 lg:py-8">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Insights", href: "/insights" }]}
          />
        </div>
      </div>

      <section className="border-b border-line py-12 lg:py-16">
        <div className="shell">
          <p className="eyebrow">Insights</p>
          <h1 className="mt-5 max-w-3xl text-[2.6rem] leading-[1.03] sm:text-[3.2rem]">
            Sourcing notes from a mill floor
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
            Short guides on the questions that decide whether a fabric order lands on time: weight,
            certification, minimums and climate. No trend reports, no filler.
          </p>
        </div>
      </section>

      <section aria-labelledby="latest" className="py-14 lg:py-20">
        <div className="shell">
          <h2 id="latest" className="sr-only">
            Latest articles
          </h2>

          <article className="group grid gap-8 border-b border-line pb-14 lg:grid-cols-2 lg:items-center lg:gap-14">
            <Link href={`/insights/${lead.slug}`} className="block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-sand">
                <Image
                  src={lead.image}
                  alt={lead.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
                />
              </div>
            </Link>
            <div>
              <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                {lead.topic} · {formatDate(lead.date)} · {lead.readingMinutes} min read
              </p>
              <h3 className="mt-3 font-display text-[2rem] leading-[1.1] transition-colors group-hover:text-clay">
                <Link href={`/insights/${lead.slug}`}>{lead.title}</Link>
              </h3>
              <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-ink-soft">
                {lead.excerpt}
              </p>
              <Link href={`/insights/${lead.slug}`} className="btn btn-outline mt-6">
                Read the guide
              </Link>
            </div>
          </article>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {rest.map((article) => (
              <article key={article.slug} className="group">
                <Link href={`/insights/${article.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-sand">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-4 text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                    {article.topic} · {formatDate(article.date)}
                  </p>
                  <h3 className="mt-2 font-display text-[1.3rem] leading-snug transition-colors group-hover:text-clay">
                    {article.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[0.875rem] leading-relaxed text-ink-soft">
                    {article.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Apply it"
        title="Have a spec you want checked before you commit?"
        body="Send the fabric and garment details. We will tell you whether the construction suits the end use, and what it will cost to produce at your volume."
      />
    </>
  );
}
