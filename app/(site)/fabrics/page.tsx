import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { getCategories, getFaqs, getProducts, getSite } from "@/lib/queries";
import { breadcrumbSchema, faqSchema, itemListSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Fabric Range — Cotton, Linen, Denim, Knit, Viscose, Recycled",
  description:
    "Browse 18 stock fabric programmes from Yunhong: combed cotton poplin and twill, washed European linen, rigid and stretch denim, circular knits, viscose challis and GRS recycled performance fabric.",
  path: "/fabrics",
  keywords: [
    "wholesale fabric range",
    "fabric catalogue for brands",
    "cotton linen denim knit viscose supplier",
    "stock fabric programmes",
  ],
});

export default async function FabricsPage() {
  const site = await getSite();
  const categories = await getCategories();
  const products = await getProducts();
  const faqs = await getFaqs();
  const pageFaqs = [faqs[0], faqs[1], faqs[4], faqs[7]];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            {
              title: "Fabric range",
              description:
                "18 stock fabric programmes across cotton, linen, denim, knit, viscose and recycled performance.",
              path: "/fabrics",
              type: "CollectionPage",
            },
            site,
          ),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Fabrics", href: "/fabrics" },
          ]),
          itemListSchema(
            "Yunhong fabric programmes",
            products.map((product) => ({
              name: product.name,
              href: `/products/${product.slug}`,
            })),
          ),
          faqSchema(pageFaqs),
        ]}
      />

      <section className="border-b border-line">
        <div className="shell py-10 lg:py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Fabrics", href: "/fabrics" }]} />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="eyebrow">The range</p>
              <h1 className="mt-5 text-[2.6rem] leading-[1.03] sm:text-[3.2rem]">
                Eighteen fabric programmes, stocked and finished in-house
              </h1>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
                Every fabric below is available from stock for sampling, and every one can be
                produced to your own weight, width, shade and finish. Prices shown are indicative
                FOB Shanghai at 3,000 m; your quote depends on shade depth and quantity.
              </p>
            </div>
            <div className="answer-box">
              <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-clay">
                At a glance
              </p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                <strong className="font-medium text-ink">18 programmes</strong> across six fibre
                families, 100–500 m minimums, {formatPrice(1.45)}–8.20 per metre, and 15–38 day
                production. All apparel qualities are OEKO-TEX Standard 100 certified.
              </p>
            </div>
          </div>

          <nav aria-label="Jump to fabric category" className="mt-10 flex flex-wrap gap-2">
            {categories.map((category) => (
              <a
                key={category.slug}
                href={`#${category.slug}`}
                className="rounded-full border border-line-strong px-4 py-2 text-[0.8125rem] text-ink-soft transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                {category.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {categories.map((category, index) => {
        const items = products.filter((product) => product.categorySlug === category.slug);
        return (
          <section
            key={category.slug}
            id={category.slug}
            aria-labelledby={`${category.slug}-heading`}
            className={index % 2 === 1 ? "border-y border-line bg-surface py-16 lg:py-20" : "py-16 lg:py-20"}
          >
            <div className="shell">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionHeading
                  id={`${category.slug}-heading`}
                  eyebrow={`${items.length} programmes`}
                  title={category.name}
                  intro={category.summary}
                  className="max-w-3xl"
                />
                <Link href={`/fabrics/${category.slug}`} className="btn btn-outline shrink-0">
                  Category guide
                </Link>
              </div>
              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="compare" className="py-16 lg:py-20">
        <div className="shell">
          <SectionHeading
            id="compare"
            eyebrow="Specification table"
            title="Compare all 18 fabrics"
            intro="Weights, widths and minimums side by side. Use this table for a first shortlist, then request the full technical datasheet for the qualities you are considering."
          />
          <div className="mt-10 overflow-x-auto">
            <table className="data-table min-w-[880px]">
              <caption className="sr-only">
                All Yunhong fabric programmes with code, composition, weight, width, minimum order
                and indicative price
              </caption>
              <thead>
                <tr>
                  <th scope="col">Fabric</th>
                  <th scope="col">Code</th>
                  <th scope="col">Composition</th>
                  <th scope="col">Weight</th>
                  <th scope="col">Width</th>
                  <th scope="col">MOQ</th>
                  <th scope="col">From</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.slug}>
                    <th scope="row" className="whitespace-nowrap">
                      <Link href={`/products/${product.slug}`} className="link-underline font-normal">
                        {product.name}
                      </Link>
                    </th>
                    <td className="whitespace-nowrap text-muted">{product.code}</td>
                    <td className="text-ink-soft">{product.composition}</td>
                    <td className="whitespace-nowrap text-ink-soft">{product.weightGsm} gsm</td>
                    <td className="whitespace-nowrap text-ink-soft">{product.widthCm} cm</td>
                    <td className="whitespace-nowrap text-muted">{product.moqMeters} m</td>
                    <td className="whitespace-nowrap text-ink-soft">{formatPrice(product.priceFrom)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-[0.8125rem] text-muted">
            Prices are indicative FOB Shanghai at 3,000 m per colour and exclude freight, duty and
            local taxes. Contact{" "}
            <a href={`mailto:${site.email}`} className="link-underline text-ink-soft">
              {site.email}
            </a>{" "}
            for a landed-cost estimate.
          </p>
        </div>
      </section>

      <section aria-labelledby="fabrics-faq" className="border-t border-line bg-surface py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            id="fabrics-faq"
            eyebrow="Before you enquire"
            title="Ordering questions"
            intro="The four points that come up before every first order."
          />
          <FaqList faqs={pageFaqs} />
        </div>
      </section>

      <CtaBand
        title="Shortlisted a fabric? Send us the code and quantity"
        body="Quote a product code from the table above and we will send pricing, available stock meters and the next sampling slot within one business day."
      />
    </>
  );
}
