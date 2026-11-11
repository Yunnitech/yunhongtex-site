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
import { getCategories, getCategory, getProductsByCategory, getSite } from "@/lib/queries";
import { breadcrumbSchema, faqSchema, itemListSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

type Params = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ category: category.slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return buildMetadata({
      title: "Fabric category not found",
      description: "This fabric category is not available.",
      path: `/fabrics/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${category.name} — Wholesale Supplier & Exporter`,
    description: category.summary,
    path: `/fabrics/${category.slug}`,
    image: category.image,
    imageAlt: category.imageAlt,
    keywords: [
      `${category.name.toLowerCase()} supplier`,
      `${category.name.toLowerCase()} wholesale`,
      `${category.name.toLowerCase()} manufacturer China`,
      `${category.name.toLowerCase()} export`,
    ],
  });
}

export default async function CategoryPage({ params }: Params) {
  const { category: slug } = await params;
  const site = await getSite();
  const category = await getCategory(slug);

  if (!category) notFound();

  const items = await getProductsByCategory(category.slug);
  const categories = await getCategories();
  const related = categories.filter((item) => item.slug !== category.slug).slice(0, 3);
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Fabrics", href: "/fabrics" },
    { name: category.name, href: `/fabrics/${category.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            {
              title: `${category.name} supplier`,
              description: category.summary,
              path: `/fabrics/${category.slug}`,
              type: "CollectionPage",
            },
            site,
          ),
          breadcrumbSchema(breadcrumbItems),
          itemListSchema(
            `${category.name} programmes`,
            items.map((product) => ({ name: product.name, href: `/products/${product.slug}` })),
            category.summary,
          ),
          faqSchema(category.faqs),
        ]}
      />

      <div className="border-b border-line">
        <div className="shell py-8 lg:py-10">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      <section className="border-b border-line">
        <div className="shell grid gap-10 py-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:py-16">
          <div>
            <p className="eyebrow">{items.length} stock programmes</p>
            <h1 className="mt-5 text-[2.5rem] leading-[1.04] sm:text-[3.1rem]">{category.name}</h1>
            <p className="mt-3 text-[1.0625rem] text-clay">{category.tagline}</p>
            <div className="answer-box mt-7">
              <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-clay">
                In short
              </p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{category.summary}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                Request a quote
              </Link>
              <a href={`mailto:sales@yunhongtex.com?subject=${encodeURIComponent(category.name)}`} className="btn btn-outline">
                Ask for a sample
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-sand">
            <Image
              src={category.image}
              alt={category.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="category-overview" className="py-16 lg:py-20">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="prose-loom max-w-2xl">
            <h2 id="category-overview" className="!mt-0">
              About our {category.name.toLowerCase()}
            </h2>
            {category.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <h3>What these fabrics are used for</h3>
            <ul>
              {category.applications.map((application) => (
                <li key={application}>{application}</li>
              ))}
            </ul>
          </div>
          <aside className="h-fit rounded-[18px] border border-line bg-surface p-7">
            <h2 className="text-[1.25rem]">Programme highlights</h2>
            <ul className="mt-4 space-y-3">
              {category.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-[0.875rem] leading-snug text-ink-soft">
                  <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  {highlight}
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-3 border-t border-line pt-5 text-[0.8125rem]">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Minimum order</dt>
                <dd className="text-right text-ink-soft">300 m / colour</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Stock sampling</dt>
                <dd className="text-right text-ink-soft">100 m</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Production</dt>
                <dd className="text-right text-ink-soft">18–28 days</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Price band</dt>
                <dd className="text-right text-ink-soft">
                  {formatPrice(Math.min(...items.map((item) => item.priceFrom)))}–
                  {Math.max(...items.map((item) => item.priceTo)).toFixed(2)}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section aria-labelledby="programmes" className="border-y border-line bg-surface py-16 lg:py-20">
        <div className="shell">
          <SectionHeading
            id="programmes"
            eyebrow="Available now"
            title={`${category.name} programmes`}
            intro="Each programme is stocked for sampling and can be produced to your own specification from 300 m per colour."
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          <div className="mt-14 overflow-x-auto">
            <table className="data-table min-w-[760px]">
              <caption className="sr-only">
                Technical comparison of {category.name.toLowerCase()} programmes
              </caption>
              <thead>
                <tr>
                  <th scope="col">Fabric</th>
                  <th scope="col">Composition</th>
                  <th scope="col">Weight</th>
                  <th scope="col">Weave / knit</th>
                  <th scope="col">Finish</th>
                  <th scope="col">MOQ</th>
                  <th scope="col">Lead time</th>
                </tr>
              </thead>
              <tbody>
                {items.map((product) => (
                  <tr key={product.slug}>
                    <th scope="row" className="whitespace-nowrap">
                      <Link href={`/products/${product.slug}`} className="link-underline font-normal">
                        {product.name}
                      </Link>
                    </th>
                    <td className="text-ink-soft">{product.composition}</td>
                    <td className="whitespace-nowrap text-ink-soft">{product.weightGsm} gsm</td>
                    <td className="text-ink-soft">{product.weave}</td>
                    <td className="text-ink-soft">{product.finish}</td>
                    <td className="whitespace-nowrap text-muted">{product.moqMeters} m</td>
                    <td className="whitespace-nowrap text-muted">
                      {product.leadTimeDays[0]}–{product.leadTimeDays[1]} days
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="category-faq" className="py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            id="category-faq"
            eyebrow="Questions"
            title={`${category.name} FAQ`}
            intro="Minimums, certification and lead times for this category."
          />
          <FaqList faqs={category.faqs} />
        </div>
      </section>

      <section aria-labelledby="related-categories" className="border-t border-line py-14">
        <div className="shell">
          <h2 id="related-categories" className="text-[1.5rem]">
            Explore other fabric families
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/fabrics/${item.slug}`}
                className="group flex items-center justify-between rounded-[14px] border border-line bg-surface px-5 py-4 transition-colors hover:border-ink"
              >
                <span>
                  <span className="block font-display text-[1.0625rem]">{item.name}</span>
                  <span className="mt-0.5 block text-[0.75rem] text-muted">{item.tagline}</span>
                </span>
                <span aria-hidden="true" className="text-clay transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`Request ${category.name.toLowerCase()} pricing for your next order`}
        body="Send the construction, shade reference and quantity. We will confirm price, stock availability and the earliest production slot within one business day."
      />
    </>
  );
}
