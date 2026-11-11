import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { faqs } from "@/lib/faqs";
import { categories } from "@/lib/products";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Buyer FAQ — Minimums, Lead Times, Certification & Payment",
  description:
    "Answers to the 12 questions fabric buyers ask before ordering: MOQ, production and shipping times, OEKO-TEX and GRS documentation, sampling, Pantone matching and payment terms.",
  path: "/faq",
  keywords: [
    "fabric MOQ",
    "fabric lead time China",
    "fabric payment terms",
    "how to buy fabric from China",
  ],
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "Buyer FAQ",
            description: "Minimums, lead times, certification, sampling and payment terms.",
            path: "/faq",
          }),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Buyer FAQ", href: "/faq" },
          ]),
          faqSchema(faqs),
        ]}
      />

      <div className="border-b border-line">
        <div className="shell py-6 lg:py-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Buyer FAQ", href: "/faq" }]} />
        </div>
      </div>

      <section className="border-b border-line py-12 lg:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">Buyer FAQ</p>
            <h1 className="mt-5 text-[2.6rem] leading-[1.03] sm:text-[3.2rem]">
              Everything buyers ask before the first order
            </h1>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
              Straight answers on minimums, timing, certification and payment — the same answers our
              sales team gives by email, written down so you do not have to ask.
            </p>
          </div>
          <nav aria-label="Fabric categories" className="rounded-[16px] border border-line bg-surface p-6">
            <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
              Looking for a specific fabric?
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/fabrics/${category.slug}`}
                    className="text-[0.875rem] text-ink-soft transition-colors hover:text-clay"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section aria-labelledby="all-questions" className="py-14 lg:py-18">
        <div className="shell grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
          <div>
            <SectionHeading
              id="all-questions"
              eyebrow="12 answers"
              title="Ordering, certification and logistics"
            />
            <div className="mt-6 space-y-3 text-[0.875rem] leading-relaxed text-ink-soft">
              <p>
                Something not covered here? Email{" "}
                <a href={`mailto:${site.email}`} className="link-underline text-ink">
                  {site.email}
                </a>{" "}
                or message WhatsApp on {site.whatsapp}. {site.responseTime}.
              </p>
            </div>
          </div>
          <FaqList faqs={faqs} defaultOpen={1} />
        </div>
      </section>

      <CtaBand
        eyebrow="Still deciding"
        title="Ask a technical question before you order"
        body="Our technical team answers specification questions directly — shrinkage, shade tolerance, finish compatibility with your wash house. No sales script."
      />
    </>
  );
}
