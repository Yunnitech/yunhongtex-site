import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { getFaqs, getSite } from "@/lib/queries";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Quality & Compliance — OEKO-TEX, GRS, GOTS, ISO 9001",
  description:
    "How Yunhong controls fabric quality: four-point roll inspection, documented test results for shrinkage and colourfastness, and lot-level OEKO-TEX, GRS and GOTS certificates.",
  path: "/quality",
  keywords: [
    "OEKO-TEX fabric supplier",
    "GRS certified fabric",
    "GOTS organic cotton supplier",
    "fabric quality inspection four point",
  ],
});

const certificateExplainer = [
  {
    code: "OEKO-TEX® STANDARD 100",
    scope: "Finished article tested for harmful substances, product class II (and class I for babywear on request).",
    limit: "Does not cover working conditions, environmental management or recycled content.",
  },
  {
    code: "GRS 4.0",
    scope: "Recycled content, chain of custody, chemical restrictions, social and environmental criteria.",
    limit: "A scope certificate alone is not enough — a transaction certificate is required per shipment.",
  },
  {
    code: "GOTS 6.0",
    scope: "Organic fibre content (70% minimum), processing chemistry, wastewater and social criteria across the chain.",
    limit: "Both the fabric mill and the garment factory need scope certificates.",
  },
  {
    code: "bluesign® APPROVED",
    scope: "Chemical input management for selected performance finishes.",
    limit: "Applies to the approved process, not automatically to every fabric we weave.",
  },
  {
    code: "ISO 9001:2015",
    scope: "Quality management system, audited annually by a third-party certification body.",
    limit: "Process discipline, not product performance.",
  },
  {
    code: "amfori BSCI",
    scope: "Social compliance audit covering working hours, wages, safety and freedom of association.",
    limit: "Current rating A, audited every two years.",
  },
];

const tests = [
  ["Dimensional stability", "ISO 6330 / AATCC 135", "≤3% warp, ≤3% weft (varies by quality)"],
  ["Colourfastness to washing", "ISO 105-C06", "Grade 4–5"],
  ["Colourfastness to rubbing", "ISO 105-X12", "Grade 4 dry, 3–4 wet"],
  ["Colourfastness to light", "ISO 105-B02", "Grade 4–5 (essential for Gulf markets)"],
  ["Pilling", "ISO 12945-2", "Grade 4 after 2,000 cycles"],
  ["Tear strength", "ASTM D1424", "Reported per lot for canvas and outerwear"],
  ["Spirality (knits)", "AATCC 179", "Under 5%"],
  ["pH value", "ISO 3071", "4.0–7.5, skin-contact compliant"],
];

export default async function QualityPage() {
  const site = await getSite();
  const faqs = await getFaqs();
  const pageFaqs = [faqs[3], faqs[9], faqs[10], faqs[11]];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            {
              title: "Quality and compliance",
              description:
                "Certifications, test standards and inspection procedures used by Yunhong Textiles.",
              path: "/quality",
            },
            site,
          ),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Quality & compliance", href: "/quality" },
          ]),
          faqSchema(pageFaqs),
        ]}
      />

      <div className="border-b border-line">
        <div className="shell py-6 lg:py-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Quality & compliance", href: "/quality" },
            ]}
          />
        </div>
      </div>

      <section className="border-b border-line py-12 lg:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">Quality &amp; compliance</p>
            <h1 className="mt-5 text-[2.6rem] leading-[1.03] sm:text-[3.2rem]">
              Certificates are only useful if they survive an audit
            </h1>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
              We issue documentation at lot level, not just a logo on a website. Every bulk
              shipment leaves the mill with inspection reports, test results where relevant, and
              the certificate chain your retailer will ask for.
            </p>
          </div>
          <div className="answer-box">
            <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-clay">In short</p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
              All apparel fabrics are{" "}
              <strong className="font-medium text-ink">OEKO-TEX Standard 100</strong> certified,
              recycled qualities are <strong className="font-medium text-ink">GRS 4.0</strong> with
              transaction certificates, organic cotton is GOTS 6.0, and the mill is audited to ISO
              9001 and amfori BSCI.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="certifications" className="py-16 lg:py-20">
        <div className="shell">
          <SectionHeading
            id="certifications"
            eyebrow="Certifications"
            title="What each certificate covers — and what it does not"
            intro="Buyers are often shown a certificate that does not actually support the claim being made. This table is how we explain the difference to our own customers."
          />
          <div className="mt-10 overflow-x-auto">
            <table className="data-table min-w-[760px]">
              <caption className="sr-only">
                Yunhong certifications, their scope and their limitations
              </caption>
              <thead>
                <tr>
                  <th scope="col">Certificate</th>
                  <th scope="col">What it proves</th>
                  <th scope="col">What it does not cover</th>
                </tr>
              </thead>
              <tbody>
                {certificateExplainer.map((item) => (
                  <tr key={item.code}>
                    <th scope="row" className="whitespace-nowrap font-medium">
                      {item.code}
                    </th>
                    <td className="text-ink-soft">{item.scope}</td>
                    <td className="text-muted">{item.limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 max-w-3xl text-[0.8125rem] text-muted">
            Certificate numbers, expiry dates and audit reports are available on request once an
            NDA is in place.{" "}
            <Link href="/contact" className="link-underline text-ink-soft">
              Ask our compliance team
            </Link>
            .
          </p>
        </div>
      </section>

      <section aria-labelledby="testing" className="border-y border-line bg-surface py-16 lg:py-20">
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            id="testing"
            eyebrow="Testing"
            title="The tests we run on every lot"
            intro="Physical performance is tested in our own lab and confirmed by a third-party laboratory for new developments and annual re-validation."
          />
          <div className="overflow-x-auto">
            <table className="data-table min-w-[560px]">
              <caption className="sr-only">Standard fabric tests, methods and typical results</caption>
              <thead>
                <tr>
                  <th scope="col">Test</th>
                  <th scope="col">Standard</th>
                  <th scope="col">Typical result</th>
                </tr>
              </thead>
              <tbody>
                {tests.map(([test, standard, result]) => (
                  <tr key={test}>
                    <th scope="row" className="font-normal">
                      {test}
                    </th>
                    <td className="whitespace-nowrap text-muted">{standard}</td>
                    <td className="text-ink-soft">{result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="inspection" className="py-16 lg:py-20">
        <div className="shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="prose-loom max-w-2xl">
            <h2 id="inspection" className="!mt-0">
              Four-point inspection on every roll
            </h2>
            <p>
              Every metre is inspected on a four-point system before packing: defects are scored by
              size and frequency, and a roll that exceeds the agreed points per 100 square yards is
              cut back or replaced. Rolls are measured on the machine, not estimated.
            </p>
            <p>
              The inspection report travels with the goods and lists roll numbers, actual metres,
              defect points and any short rolls. If your QC team re-inspects on arrival, you are
              comparing against our numbers rather than starting from zero.
            </p>
            <h3>Shade control on repeat orders</h3>
            <p>
              We keep a physical standard of every approved lot for 24 months and dye repeats
              against that standard, measured on a spectrophotometer to ΔE ≤ 1.0. This is why a
              third repeat matches the first even if the shade card has been updated in between.
            </p>
            <h3>If something is wrong</h3>
            <p>
              Send photographs, roll numbers and the inspection sheet. Verified defects above 1.5%
              of shipped metres are credited or replaced, and we cover return freight on a
              confirmed claim. Our target is a first response within one business day and a
              resolution plan within five.
            </p>
          </div>

          <aside className="h-fit rounded-[18px] border border-line bg-surface p-7">
            <h2 className="text-[1.25rem]">Documents in every shipment</h2>
            <ul className="mt-4 space-y-3">
              {[
                "Commercial invoice and packing list with roll numbers",
                "Four-point inspection report",
                "Shade and shrinkage report for the production lot",
                "OEKO-TEX certificate reference (and test report on request)",
                "GRS transaction certificate for recycled qualities",
                "Bill of lading and certificate of origin",
                "EUDR due-diligence statement where applicable",
              ].map((document) => (
                <li key={document} className="flex gap-3 text-[0.875rem] leading-snug text-ink-soft">
                  <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  {document}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-line pt-5 text-[0.8125rem] text-muted">
              <p>
                Compliance contact:{" "}
                <a href={`mailto:${site.email}`} className="link-underline text-ink-soft">
                  {site.email}
                </a>
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="quality-faq" className="border-t border-line bg-surface py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            id="quality-faq"
            eyebrow="Questions"
            title="Compliance questions we answer weekly"
          />
          <FaqList faqs={pageFaqs} />
        </div>
      </section>

      <CtaBand
        eyebrow="Documentation"
        title="Need a certificate before you place the order?"
        body="Tell us which claim you need to support — recycled content, organic fibre, skin-contact safety — and we will send the correct scope certificate and explain what the transaction documents will cover."
      />
    </>
  );
}
