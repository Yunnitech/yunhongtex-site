import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { fabricPhoto } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "About Yunhong — Fabric Mill in Shaoxing, China",
  description:
    "Founded in 2009, Yunhong Textiles weaves, dyes and finishes cotton, linen, denim, knit, viscose and recycled fabric in Keqiao, Shaoxing, and exports to brands in 34 countries.",
  path: "/about",
  keywords: ["fabric mill China", "Shaoxing textile manufacturer", "Keqiao fabric factory"],
});

const milestones = [
  { year: "2009", title: "Founded in Keqiao", body: "Started with 24 shuttle looms producing cotton poplin and twill for domestic shirt makers." },
  { year: "2013", title: "First OEKO-TEX certification", body: "All apparel qualities certified to Standard 100, opening the first European accounts." },
  { year: "2017", title: "Recycled programme launched", body: "GRS-certified recycled polyester and nylon added, with transaction certificates from day one." },
  { year: "2020", title: "Dyehouse expansion", body: "Dyeing and finishing brought in-house, cutting lead times by nine days on average." },
  { year: "2023", title: "bluesign® approved finishes", body: "Performance finishes moved to bluesign-approved chemistry across the softshell range." },
  { year: "2025", title: "4.2 million metres shipped", body: "Exports to 34 countries, with the EU and US together representing 61% of volume." },
];

const facility = [
  ["Weaving capacity", "1.8 million m / month across 168 looms"],
  ["Dyeing", "In-house jet dyeing, 12 tonnes / day"],
  ["Finishing", "Sanforising, compacting, calendering, bonding, washing"],
  ["Knitting", "42 circular machines, 24–34 inch"],
  ["Quality team", "18 inspectors, four-point system on every roll"],
  ["Export team", "In-house documentation for EU, US and GCC shipments"],
];

const photo = fabricPhoto(
  "wide photograph of a modern textile factory floor with rows of looms and rolls of neutral fabric, workers in the distance, clean industrial daylight, documentary style, no text",
  "landscape_16_9",
);

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "About Yunhong Textiles",
            description:
              "Fabric mill in Keqiao, Shaoxing, weaving and exporting cotton, linen, denim, knit, viscose and recycled fabric since 2009.",
            path: "/about",
            type: "AboutPage",
          }),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
          ]),
        ]}
      />

      <div className="border-b border-line">
        <div className="shell py-6 lg:py-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
        </div>
      </div>

      <section className="border-b border-line py-12 lg:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">About Yunhong</p>
            <h1 className="mt-5 text-[2.6rem] leading-[1.03] sm:text-[3.3rem]">
              A mill in Keqiao, exporting to 34 countries
            </h1>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
              We have woven fabric in Shaoxing since {site.foundedYear}. What began as a 24-loom
              workshop supplying domestic shirt makers is now a vertically integrated mill with
              in-house dyeing, finishing and knitting — and an export team that handles the
              paperwork EU, US and Gulf buyers actually need.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-6 border-t border-line pt-6">
            {site.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-[2rem] leading-none">{stat.value}</span>
                  <span className="mt-2 block text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-label="Factory floor" className="py-12 lg:py-16">
        <div className="shell">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] bg-sand">
            <Image
              src={photo}
              alt="Rows of looms and fabric rolls on the Yunhong factory floor in Shaoxing"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="story" className="pb-16 lg:pb-20">
        <div className="shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="prose-loom max-w-2xl">
            <h2 id="story">Why we sell direct</h2>
            <p>
              Most fabric reaches an overseas brand through two or three intermediaries: a trading
              company, an agent, sometimes an exporter on top of the mill. Each layer adds cost,
              delays information and, most importantly, breaks accountability when something goes
              wrong with a shade or a delivery date.
            </p>
            <p>
              We sell direct because it makes the answer to &ldquo;when will my fabric ship&rdquo;
              a production schedule rather than a guess. When you ask for a lab dip, it is made in
              our dyehouse. When you ask about a certificate, it is in our name. When a claim comes
              in, the person who inspects the roll is in the same building as the person answering
              your email.
            </p>
            <h2>What we actually make</h2>
            <p>
              Six fabric families: cotton shirting and bottom-weights, European flax linen,
              indigo denim and chambray, circular knits, viscose and viscose blends, and
              GRS-certified recycled performance fabrics. All are woven or knitted, dyed and
              finished in-house, which is why we can hold 300 m minimums without giving up on
              shade consistency.
            </p>
            <p>
              We are not the cheapest mill in Jiangsu, and we do not try to be. Our customers are
              brands that need a repeat order in month six to look like the first one — and can
              produce a certificate when their retailer asks.
            </p>
          </div>

          <aside className="h-fit rounded-[18px] border border-line bg-surface p-7">
            <h2 className="text-[1.25rem]">Facility at a glance</h2>
            <table className="spec-table mt-4">
              <caption className="sr-only">Yunhong production facility capacity</caption>
              <tbody>
                {facility.map(([label, value]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-5 text-[0.8125rem] text-muted">
              {site.addressLine}
            </p>
          </aside>
        </div>
      </section>

      <section aria-labelledby="timeline" className="border-y border-line bg-surface py-16 lg:py-20">
        <div className="shell">
          <SectionHeading
            id="timeline"
            eyebrow="Milestones"
            title="Seventeen years of weaving, in six steps"
          />
          <ol className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {milestones.map((milestone) => (
              <li key={milestone.year} className="border-t border-line pt-4">
                <p className="font-display text-[1.5rem] text-clay">{milestone.year}</p>
                <h3 className="mt-1 font-sans text-[1rem] font-medium">{milestone.title}</h3>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft">{milestone.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="markets" className="py-16 lg:py-20">
        <div className="shell">
          <SectionHeading
            id="markets"
            eyebrow="Where we ship"
            title="Three core export regions, one documentation standard"
            intro="Each market has its own compliance requirements. Our export team prepares the paperwork in-house rather than relying on a forwarder to interpret it."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {site.markets.map((market) => (
              <div key={market.region} className="rounded-[16px] border border-line bg-surface p-6">
                <h3 className="font-display text-[1.25rem]">{market.region}</h3>
                <p className="mt-2 text-[0.8125rem] text-muted">{market.countries}</p>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-soft">{market.notes}</p>
                <p className="mt-3 text-[0.75rem] text-clay">Ports: {market.ports}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/quality" className="btn btn-outline">
              See certifications and testing
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Work with us"
        title="Start with a swatch, not a container"
        body="Most of our relationships start with an A4 sample hanger and a lab dip. No minimum, no account setup, no commitment until you approve the cloth."
      />
    </>
  );
}
