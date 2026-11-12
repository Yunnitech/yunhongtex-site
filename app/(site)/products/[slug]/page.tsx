import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { productPriceRange } from "@/lib/products";
import { getCategory, getProduct, getProducts, getRelatedProducts, getSite } from "@/lib/queries";
import { breadcrumbSchema, faqSchema, productSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return buildMetadata({
      title: "Fabric not found",
      description: "This fabric is no longer part of our range.",
      path: `/products/${slug}`,
      noIndex: true,
    });
  }

  const category = await getCategory(product.categorySlug);

  return buildMetadata({
    title: `${product.name} — ${product.weightGsm} gsm ${category?.navName ?? ""} Fabric Supplier`.trim(),
    description: product.summary,
    path: `/products/${product.slug}`,
    image: product.image,
    imageAlt: product.imageAlt,
    keywords: [
      product.name,
      `${product.name} wholesale`,
      `${product.composition} fabric supplier`,
      `${product.weightGsm} gsm ${category?.navName.toLowerCase() ?? "fabric"}`,
    ],
  });
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const site = await getSite();
  const category = await getCategory(product.categorySlug);
  const related = await getRelatedProducts(product.slug, 3);

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Fabrics", href: "/fabrics" },
    { name: category?.name ?? "Category", href: `/fabrics/${product.categorySlug}` },
    { name: product.name, href: `/products/${product.slug}` },
  ];

  const specs: Array<[string, string]> = [
    ["Article code", product.code],
    ["Composition", product.composition],
    ["Weight", `${product.weightGsm} gsm`],
    ["Usable width", `${product.widthCm} cm`],
    ["Weave / knit", product.weave],
    ["Finish", product.finish],
    ["Shrinkage", product.shrinkage],
    ["Colour range", `${product.colors} shades`],
    ["Certifications", product.certifications.join(" · ")],
    ["Origin", "Woven and finished in Shaoxing, China"],
  ];

  return (
    <>
      <JsonLd
        data={[
          productSchema(product, site, category),
          breadcrumbSchema(breadcrumbItems),
          faqSchema(product.faqs),
          webPageSchema(
            {
              title: product.name,
              description: product.summary,
              path: `/products/${product.slug}`,
            },
            site,
          ),
        ]}
      />

      <div className="border-b border-line">
        <div className="shell py-6 lg:py-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      <section className="py-8 lg:py-12">
        <div className="shell grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-sand">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-[0.6875rem] text-muted">
              Shown as a representative surface. Shade to be confirmed by lab dip.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              {category && (
                <Link
                  href={`/fabrics/${category.slug}`}
                  className="rounded-full border border-line-strong px-3 py-1 text-[0.625rem] uppercase tracking-[0.12em] text-ink-soft transition-colors hover:border-ink"
                >
                  {category.name}
                </Link>
              )}
              <span className="rounded-full bg-clay-soft px-3 py-1 text-[0.625rem] uppercase tracking-[0.12em] text-clay-deep">
                {product.code}
              </span>
            </div>

            <h1 className="mt-5 text-[2.3rem] leading-[1.05] sm:text-[2.8rem]">{product.name}</h1>

            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">{product.summary}</p>

            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6 sm:grid-cols-4">
              <div>
                <dt className="text-[0.625rem] uppercase tracking-[0.12em] text-muted">Weight</dt>
                <dd className="mt-1 font-display text-[1.25rem]">{product.weightGsm} gsm</dd>
              </div>
              <div>
                <dt className="text-[0.625rem] uppercase tracking-[0.12em] text-muted">Width</dt>
                <dd className="mt-1 font-display text-[1.25rem]">{product.widthCm} cm</dd>
              </div>
              <div>
                <dt className="text-[0.625rem] uppercase tracking-[0.12em] text-muted">MOQ</dt>
                <dd className="mt-1 font-display text-[1.25rem]">{product.moqMeters} m</dd>
              </div>
              <div>
                <dt className="text-[0.625rem] uppercase tracking-[0.12em] text-muted">Lead time</dt>
                <dd className="mt-1 font-display text-[1.25rem]">
                  {product.leadTimeDays[0]}–{product.leadTimeDays[1]}d
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-[2rem] leading-none">{productPriceRange(product)}</span>
              <span className="text-[0.75rem] text-muted">FOB Shanghai · 3,000 m</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                Request this fabric
              </Link>
              <a
                href={`mailto:${site.sampleEmail}?subject=${encodeURIComponent(
                  `Sample request — ${product.name} (${product.code})`,
                )}`}
                className="btn btn-outline"
              >
                Order a sample
              </a>
            </div>

            <ul className="mt-7 grid gap-2.5 border-t border-line pt-6 text-[0.8125rem] text-ink-soft">
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="text-clay">
                  ✓
                </span>
                Stock available: {product.stockMeters} m per colour, ships in 5–10 days
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="text-clay">
                  ✓
                </span>
                {product.colors} shades on the stock card · Pantone TCX matching from {product.moqMeters} m
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="text-clay">
                  ✓
                </span>
                {product.certifications.join(", ")} documentation issued with each shipment
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="specifications" className="border-y border-line bg-surface py-16 lg:py-20">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <h2 id="specifications" className="text-[1.75rem]">
              Technical specification
            </h2>
            <table className="spec-table mt-6">
              <caption>{product.name} · {product.code}</caption>
              <tbody>
                {specs.map(([label, value]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-[1.75rem]">What it is good for</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {product.applications.map((application) => (
                <li
                  key={application}
                  className="rounded-full border border-line-strong px-3.5 py-1.5 text-[0.8125rem] text-ink-soft"
                >
                  {application}
                </li>
              ))}
            </ul>

            <h2 className="mt-9 text-[1.75rem]">Programme features</h2>
            <ul className="mt-5 space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-[0.9375rem] leading-snug text-ink-soft">
                  <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-9 rounded-[14px] border border-line bg-paper p-5">
              <h3 className="font-sans text-[0.75rem] uppercase tracking-[0.12em] text-muted">
                Ordering terms
              </h3>
              <dl className="mt-3 space-y-2 text-[0.875rem]">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Custom minimum</dt>
                  <dd>{product.moqMeters} m per colour</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Stock minimum</dt>
                  <dd>{product.stockMeters} m</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Payment</dt>
                  <dd className="text-right">{site.terms.payment}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Incoterms</dt>
                  <dd className="text-right">{site.terms.incoterms.join(" · ")}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-fabric" className="py-16 lg:py-20">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            id="about-fabric"
            eyebrow="Construction notes"
            title="How this fabric behaves"
            intro="Written by our technical team from production data, not marketing copy."
          />
          <div className="prose-loom max-w-2xl">
            {product.description.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <h3>Ordering notes</h3>
            <ul>
              <li>Lab dips are prepared in 7–10 days including courier; one re-dip is free.</li>
              <li>
                Bulk production starts after dip approval and runs{" "}
                {product.leadTimeDays[0]}–{product.leadTimeDays[1]} days.
              </li>
              <li>Roll lengths are 50–120 m; short rolls are declared on the packing list.</li>
              <li>
                Shrinkage is measured to {product.shrinkage} on the finished fabric. Cutting
                allowances should still be confirmed on your own wash standard.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="product-faq" className="border-y border-line bg-surface py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            id="product-faq"
            eyebrow="Questions"
            title={`${product.name} FAQ`}
            intro="Specification and ordering questions specific to this fabric."
          />
          <FaqList faqs={product.faqs} />
        </div>
      </section>

      <section aria-labelledby="related-fabrics" className="py-16 lg:py-20">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              id="related-fabrics"
              eyebrow="Also consider"
              title="Related fabrics"
              intro="Qualities buyers often sample alongside this one."
            />
            <Link href="/fabrics" className="btn btn-outline shrink-0">
              Full range
            </Link>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`Request pricing for ${product.name}`}
        body={`Send your shade reference and quantity — we will confirm the ${product.code} price, stock meters and the next production slot within one business day.`}
      />
    </>
  );
}
