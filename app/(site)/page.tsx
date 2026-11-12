import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { getCategories, getFeaturedProducts, getFaqs, getProducts, getRecentArticles, getSite } from "@/lib/queries";
import { faqSchema, itemListSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";
import { fabricPhoto, formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "B2B Fabric Mill & Exporter — Cotton, Linen, Denim, Knit",
  description:
    "Yunhong Textiles supplies OEKO-TEX certified cotton, linen, denim, knit, viscose and GRS recycled performance fabric to brands in Europe, the US and the Middle East. 300 m minimums, 18–28 day production.",
  path: "/",
  keywords: [
    "fabric supplier for brands",
    "wholesale fabric manufacturer",
    "cotton linen denim fabric exporter",
    "B2B textile supplier China",
    "GRS recycled fabric supplier",
  ],
});

const heroImage = fabricPhoto(
  "editorial photograph inside a textile mill, rolls of natural undyed cotton and linen fabric stacked beside a wooden loom, warm daylight through industrial windows, muted neutral palette, shallow depth of field, no text",
  "portrait_4_3",
);

const reasons = [
  {
    number: "01",
    title: "One mill, six fabric families",
    body: "Cotton, linen, denim, knit, viscose and recycled performance are woven and finished under one roof, so a mixed programme ships on one B/L instead of four.",
  },
  {
    number: "02",
    title: "Documented, not claimed",
    body: "OEKO-TEX, GRS and GOTS certificates are issued with the goods — including transaction certificates that trace recycled content to your delivered metres.",
  },
  {
    number: "03",
    title: "Low minimums that still repeat",
    body: "300 m per colour, 100 m from stock, and a retained physical standard for every approved lot so your third repeat matches your first.",
  },
  {
    number: "04",
    title: "Export paperwork handled in-house",
    body: "FOB, CIF or DDP with EUDR, SASO and CPSIA documentation prepared by our own export team, not a third-party forwarder.",
  },
];

const steps = [
  {
    step: "01",
    title: "Send the spec",
    body: "Composition, weight, width, shade reference and quantity. A photo of a physical swatch is enough to start.",
    meta: "Same day acknowledgement",
  },
  {
    step: "02",
    title: "Sample and lab dip",
    body: "We courier an A4 hanger and prepare lab dips against your Pantone TCX reference for approval.",
    meta: "7–10 days",
  },
  {
    step: "03",
    title: "Bulk production",
    body: "Bulk runs after dip approval, with in-line checks and a four-point roll inspection before packing.",
    meta: "18–28 days",
  },
  {
    step: "04",
    title: "Export and deliver",
    body: "We book the shipment, issue certificates and documentation, and send tracking and inspection reports.",
    meta: "FOB, CIF or DDP",
  },
];

export default async function HomePage() {
  const site = await getSite();
  const categories = await getCategories();
  const products = await getProducts();
  const featured = await getFeaturedProducts();
  const articles = await getRecentArticles(3);
  const homeFaqs = (await getFaqs()).slice(0, 6);

  return (
    <>
      <JsonLd
        data={[
          faqSchema(homeFaqs),
          itemListSchema(
            "Fabric categories supplied by Yunhong Textiles",
            categories.map((category) => ({
              name: category.name,
              href: `/fabrics/${category.slug}`,
            })),
          ),
        ]}
      />

      {/* ---------------------------------------------------------------- hero */}
      <section className="border-b border-line">
        <div className="shell grid gap-12 py-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-16 lg:py-20">
          <div>
            <p className="eyebrow">Fabric mill & exporter · Shaoxing, China · since {site.foundedYear}</p>
            <h1 className="mt-6 text-[2.5rem] leading-[1.02] sm:text-[3.25rem] lg:text-[3.9rem]">
              Woven and knit fabric,{" "}
              <span className="text-clay">shipped mill-direct</span> to Europe, the US and the Gulf.
            </h1>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
              Yunhong supplies OEKO-TEX certified cotton, linen, denim, knit, viscose and GRS
              recycled performance fabric to apparel brands and workwear programmes. 300 m
              minimums, 18–28 day production, and full certification documentation with every
              shipment.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/fabrics" className="btn btn-primary">
                Browse the fabric range
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Request a sample
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-7 sm:grid-cols-4">
              {site.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-[1.75rem] leading-none">
                      {stat.value}
                    </span>
                    <span className="mt-2 block text-[0.6875rem] uppercase leading-snug tracking-[0.1em] text-muted">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-sand">
              <Image
                src={heroImage}
                alt="Rolls of undyed cotton and linen fabric stacked beside a wooden loom in the Yunhong mill"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-4 hidden w-52 rounded-[14px] border border-line bg-paper/95 p-4 shadow-[0_18px_40px_-28px_rgba(23,20,15,0.5)] backdrop-blur sm:block">
              <p className="text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                Current lead time
              </p>
              <p className="mt-1 font-display text-2xl">18–28 days</p>
              <p className="mt-1 text-[0.6875rem] text-ink-soft">
                after lab dip approval · stock ships in 5–10
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- certification */}
      <section aria-label="Certifications and compliance" className="overflow-hidden border-b border-line bg-surface">
        <div className="shell flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <p className="shrink-0 text-[0.625rem] uppercase tracking-[0.18em] text-muted">
            Certified &amp; audited
          </p>
          <div className="relative overflow-hidden">
            <div className="marquee-track gap-10 md:gap-14">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 items-center gap-10 md:gap-14" aria-hidden={copy === 1}>
                  {site.certifications.map((certification) => (
                    <span
                      key={`${copy}-${certification.code}`}
                      className="whitespace-nowrap font-display text-[0.9375rem] text-ink-soft"
                    >
                      {certification.code}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- categories */}
      <section aria-labelledby="fabric-range" className="py-20 lg:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="fabric-range"
              eyebrow="The range"
              title="Six fabric families, one supply chain"
              intro="Each programme is stocked, dyed and finished in-house. Start with a stock shade for speed, or develop a custom construction from 1,000 m."
            />
            <Link href="/fabrics" className="btn btn-outline shrink-0">
              All 18 fabrics
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/fabrics/${category.slug}`}
                className="group relative overflow-hidden rounded-[18px] bg-sand"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[0.625rem] uppercase tracking-[0.14em] text-paper/70">
                    {products.filter((product) => product.categorySlug === category.slug).length} fabric programmes
                  </p>
                  <h3 className="mt-1.5 font-display text-[1.5rem] text-paper">{category.name}</h3>
                  <p className="mt-1 line-clamp-2 text-[0.8125rem] leading-snug text-paper/75">
                    {category.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- reasons */}
      <section aria-labelledby="why-loomtex" className="border-y border-line bg-surface py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            id="why-loomtex"
            eyebrow="Why buyers switch"
            title="Mill-direct buying, without the agency layer"
            intro="Most fabric buyers deal with two or three intermediaries before reaching a loom. We removed them, which is why our quotes include the production date, not just the price."
          />
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => (
              <div key={reason.number} className="border-t border-line pt-5">
                <p className="font-display text-sm text-clay">{reason.number}</p>
                <h3 className="mt-3 text-[1.1875rem] leading-snug">{reason.title}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">{reason.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- featured */}
      <section aria-labelledby="featured-fabrics" className="py-20 lg:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="featured-fabrics"
              eyebrow="Most ordered"
              title="Stock programmes ready to sample"
              intro="These four bases cover the majority of repeat orders we ship. All are available from stock in 100–200 m for sampling."
            />
            <Link href="/fabrics" className="btn btn-outline shrink-0">
              View all fabrics
            </Link>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, index) => (
              <ProductCard key={product.slug} product={product} priority={index < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- process */}
      <section aria-labelledby="process" className="border-y border-line bg-sand py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            id="process"
            eyebrow="How an order runs"
            title="From swatch to shipment in four steps"
            intro="The timeline below is what we work to on a standard order. Custom developments add three to four weeks before step two."
          />
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.step} className="relative border-t-2 border-ink/85 pt-5">
                <span className="absolute -top-[7px] left-0 h-3 w-3 rounded-full bg-clay" aria-hidden="true" />
                <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                  Step {step.step}
                </p>
                <h3 className="mt-2 text-[1.25rem]">{step.title}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">{step.body}</p>
                <p className="mt-3 text-[0.75rem] text-clay">{step.meta}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------------------------------------------- markets */}
      <section aria-labelledby="export-markets" className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            id="export-markets"
            eyebrow="Export markets"
            title="Where we ship, and how long it takes"
            intro="We ship to 34 countries. The table below covers the routes we run most often, the paperwork each market needs, and the transit times our customers plan around."
          />

          <div className="mt-10 overflow-x-auto">
            <table className="data-table min-w-[720px]">
              <caption className="sr-only">
                Yunhong export markets, destination ports, transit notes and compliance support
              </caption>
              <thead>
                <tr>
                  <th scope="col">Region</th>
                  <th scope="col">Markets served</th>
                  <th scope="col">Main ports</th>
                  <th scope="col">Documentation &amp; notes</th>
                </tr>
              </thead>
              <tbody>
                {site.markets.map((market) => (
                  <tr key={market.region}>
                    <th scope="row" className="whitespace-nowrap font-display text-[1.0625rem] font-normal">
                      {market.region}
                    </th>
                    <td className="text-ink-soft">{market.countries}</td>
                    <td className="text-ink-soft">{market.ports}</td>
                    <td className="text-muted">{market.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-[0.8125rem] text-muted">
            Not listed? We also ship to Australia, Japan, Korea, Turkey and Brazil. Ask{" "}
            <a href={`mailto:${site.email}`} className="link-underline text-ink-soft">
              {site.email}
            </a>{" "}
            for a freight indication to your port.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------------- insights */}
      <section aria-labelledby="insights" className="border-y border-line bg-surface py-20 lg:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="insights"
              eyebrow="Sourcing notes"
              title="Written for buyers, not for search engines"
              intro="Short, practical guides on weight, certification and lead-time planning — the questions that come up in almost every first enquiry."
            />
            <Link href="/insights" className="btn btn-outline shrink-0">
              All insights
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {articles.map((article) => (
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

      {/* ------------------------------------------------------------------- faq */}
      <section aria-labelledby="buyer-faq" className="py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading
              id="buyer-faq"
              eyebrow="Buyer questions"
              title="The answers we give most often"
              intro="Minimums, lead times, certification and payment terms — before you send an enquiry."
            />
            <div className="mt-8 space-y-4 text-[0.875rem] text-ink-soft">
              <p>
                Still unsure?{" "}
                <Link href="/faq" className="link-underline text-ink">
                  Read the full buyer FAQ
                </Link>{" "}
                or message us on{" "}
                <WhatsAppLink href={whatsappLink(site.whatsapp)} location="home_faq" className="link-underline text-ink">
                  WhatsApp
                </WhatsAppLink>
                .
              </p>
            </div>
          </div>
          <FaqList faqs={homeFaqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
