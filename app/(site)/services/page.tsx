import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getSite } from "@/lib/queries";

export const metadata: Metadata = buildMetadata({
  title: "Services — Sampling, Custom Development, OEM & Export Logistics",
  description:
    "Free A4 sample hangers, yardage samples, custom fabric development from 1,000 m, private-label programmes and FOB, CIF or DDP export logistics for EU, US and Middle East buyers.",
  path: "/services",
  keywords: [
    "custom fabric development",
    "fabric OEM supplier",
    "fabric sample service",
    "DDP fabric shipping Europe",
  ],
});

const services = [
  {
    number: "01",
    title: "Sampling before commitment",
    intro:
      "No one should place a fabric order from a photograph. We send physical samples so your design team can feel the hand, check the drape and wash-test the cloth.",
    points: [
      "Free A4 sample hanger with up to 12 qualities, couriered in 3–5 days",
      "Yardage samples of 5–20 m for fit and wash testing",
      "Sample charge credited against your first bulk order",
      "Shade card with 12–40 stock colours per programme",
    ],
  },
  {
    number: "02",
    title: "Custom development",
    intro:
      "When stock qualities do not match the tech pack, we develop the construction. Development runs on our own sample looms and dyehouse, so changes are measured, not guessed.",
    points: [
      "Custom weight, width, weave or knit structure from 1,000 m",
      "Fibre blends including linen-cotton, viscose-linen and recycled content",
      "Finish development: enzyme wash, DWR, calendering, bonding, brushing",
      "Digital and rotary printing with Pantone TCX matching",
      "Three to four weeks development before bulk production",
    ],
  },
  {
    number: "03",
    title: "Private label production",
    intro:
      "For brands that need the fabric to arrive as their own product, we run private-label programmes with your identification from the roll outward.",
    points: [
      "Custom selvedge printing and roll labels",
      "Branded packing lists and carton marks",
      "Roll-length and put-up specifications per your warehouse",
      "Colour approval against your brand shade standards",
      "Reserved loom and dye capacity for seasonal programmes",
    ],
  },
  {
    number: "04",
    title: "Export logistics",
    intro:
      "Our export team books the shipment and prepares the documentation in-house — including the compliance paperwork that EU, US and GCC customs now expect.",
    points: [
      "FOB Shanghai or Ningbo, CIF to your port, DDP to EU and US warehouses",
      "EUDR due-diligence statements and GRS transaction certificates",
      "SASO and ESMA conformity support for Gulf destinations",
      "Consolidation with your garment factory if you ship FOB direct",
      "Air freight in 5–7 days when a launch date slips",
    ],
  },
];

const incoterms = [
  ["EXW", "Shaoxing mill", "You arrange everything from our loading dock", "Fastest handover, most work for your forwarder"],
  ["FOB", "Shanghai / Ningbo", "We deliver to the port and clear export", "Standard for most first orders"],
  ["CIF", "Your destination port", "We pay ocean freight and insurance", "Simple budgeting, you handle import clearance"],
  ["DDP", "EU / US warehouse", "We handle freight, duty and delivery", "Best for repeat buyers without an import entity"],
];

export default async function ServicesPage() {
  const site = await getSite();

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            {
              title: "Services",
              description:
                "Sampling, custom fabric development, private-label production and export logistics from Yunhong Textiles.",
              path: "/services",
            },
            site,
          ),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
          ]),
        ]}
      />

      <div className="border-b border-line">
        <div className="shell py-6 lg:py-8">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]}
          />
        </div>
      </div>

      <section className="border-b border-line py-12 lg:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">Services</p>
            <h1 className="mt-5 text-[2.6rem] leading-[1.03] sm:text-[3.2rem]">
              From an A4 swatch to a delivered container
            </h1>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
              Four services cover the whole path: sampling, custom development, private-label
              production and export. You can use one of them or all four — most customers start
              with a sample hanger and add development once a style sells.
            </p>
          </div>
          <div className="answer-box">
            <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-clay">In short</p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
              Samples are free and ship in 3–5 days. Custom development starts at 1,000 m and takes
              3–4 weeks. Bulk production is 18–28 days. We ship{" "}
              <strong className="font-medium text-ink">FOB, CIF or DDP</strong> to Europe, the US and
              the Middle East.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="service-list" className="py-16 lg:py-20">
        <div className="shell">
          <h2 id="service-list" className="sr-only">
            Our services
          </h2>
          <div className="divide-y divide-line border-y border-line">
            {services.map((service) => (
              <article
                key={service.number}
                className="grid gap-6 py-10 lg:grid-cols-[0.35fr_1fr_1fr] lg:gap-12 lg:py-12"
              >
                <div>
                  <p className="font-display text-[1.75rem] text-clay">{service.number}</p>
                  <h3 className="mt-2 text-[1.5rem] leading-tight">{service.title}</h3>
                </div>
                <p className="max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
                  {service.intro}
                </p>
                <ul className="space-y-2.5">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[0.875rem] leading-snug text-ink-soft">
                      <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="incoterms" className="border-y border-line bg-surface py-16 lg:py-20">
        <div className="shell">
          <SectionHeading
            id="incoterms"
            eyebrow="Shipping terms"
            title="Choose the handover point that fits your team"
            intro="We quote all four terms so you can compare landed cost rather than FOB price alone. Duty rates depend on fibre and destination; our export team will run an estimate for you."
          />
          <div className="mt-10 overflow-x-auto">
            <table className="data-table min-w-[760px]">
              <caption className="sr-only">Incoterms offered by Yunhong Textiles</caption>
              <thead>
                <tr>
                  <th scope="col">Term</th>
                  <th scope="col">Handover point</th>
                  <th scope="col">What we handle</th>
                  <th scope="col">Best for</th>
                </tr>
              </thead>
              <tbody>
                {incoterms.map(([term, point, handled, best]) => (
                  <tr key={term}>
                    <th scope="row" className="font-medium">
                      {term}
                    </th>
                    <td className="text-ink-soft">{point}</td>
                    <td className="text-ink-soft">{handled}</td>
                    <td className="text-muted">{best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-[0.8125rem] text-muted">
            Transit times: 30–35 days to Northern Europe, 28–32 days to the US West Coast, 18–24
            days to Jebel Ali. Air freight is 5–7 days door to door.
          </p>
        </div>
      </section>

      <section aria-labelledby="service-detail" className="py-16 lg:py-20">
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            id="service-detail"
            eyebrow="Development"
            title="What we need to quote a custom fabric"
            intro="A complete tech pack shortens development by two weeks. These are the fields that matter."
          />
          <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {[
              ["Fibre and blend", "Composition with tolerance, for example 55% linen / 45% cotton ±3%."],
              ["Weight", "Finished gsm after wash, not greige."],
              ["Width", "Usable width in cm, and whether selvedge matters."],
              ["Construction", "Weave or knit structure, yarn count if known."],
              ["Finish", "Wash, DWR, calendering, bonding, brushing, print."],
              ["Colour", "Pantone TCX or a physical swatch; number of shades."],
              ["Performance", "Shrinkage, colourfastness, opacity or waterproof targets."],
              ["Order size", "Metres per colour and per season, plus repeat plans."],
            ].map(([label, detail]) => (
              <div key={label} className="border-t border-line pt-4">
                <h3 className="font-sans text-[0.9375rem] font-medium">{label}</h3>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-14">
        <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-[1.5rem]">Prefer to start with a sample?</h2>
            <p className="mt-2 text-[0.9375rem] text-ink-soft">
              Email {site.sampleEmail} with your required qualities and we will send an A4 hanger.
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary">
            Request samples
          </Link>
        </div>
      </section>

      <CtaBand
        eyebrow="Custom work"
        title="Send a tech pack and we will confirm what is achievable"
        body="Our technical team reviews construction, weight and finish against our loom and dyehouse capability, and replies with either a development plan or the closest stock alternative."
      />
    </>
  );
}
