import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { RfqForm } from "@/components/rfq-form";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getCategories, getSite } from "@/lib/queries";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact & Request a Quote",
  description:
    "Request fabric pricing from Yunhong Textiles. Send your composition, weight, shade reference and quantity for a quote within one business day, or order a free A4 sample hanger.",
  path: "/contact",
  keywords: ["fabric quote request", "fabric supplier contact", "order fabric samples"],
});

const enquiryPoints = [
  "Composition and weight (gsm) you need",
  "Usable width and any selvedge requirements",
  "Pantone TCX shades, or a photo of a physical swatch",
  "Metres per colour and expected repeat quantity",
  "Destination country and required incoterm",
  "Certification your retailer requires, if any",
];

export default async function ContactPage() {
  const site = await getSite();
  const categories = await getCategories();

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            {
              title: "Contact and request a quote",
              description:
                "Contact Yunhong Textiles for fabric pricing, samples and technical questions.",
              path: "/contact",
              type: "ContactPage",
            },
            site,
          ),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Contact", href: "/contact" },
          ]),
        ]}
      />

      <div className="border-b border-line">
        <div className="shell py-6 lg:py-8">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]}
          />
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-5 text-[2.5rem] leading-[1.03] sm:text-[3rem]">
              Send a spec, get a real answer
            </h1>
            <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-ink-soft">
              Every enquiry is read by a salesperson who can see the loom schedule — not a call
              centre. {site.responseTime}.
            </p>

            <dl className="mt-9 space-y-6 border-t border-line pt-7">
              <div>
                <dt className="text-[0.625rem] uppercase tracking-[0.14em] text-muted">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${site.email}`} className="link-underline text-[1.0625rem]">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.625rem] uppercase tracking-[0.14em] text-muted">Samples</dt>
                <dd className="mt-1">
                  <a href={`mailto:${site.sampleEmail}`} className="link-underline text-[1.0625rem]">
                    {site.sampleEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.625rem] uppercase tracking-[0.14em] text-muted">Phone</dt>
                <dd className="mt-1">
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="link-underline text-[1.0625rem]">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.625rem] uppercase tracking-[0.14em] text-muted">WhatsApp</dt>
                <dd className="mt-1">
                  <WhatsAppLink
                    href={whatsappLink(site.whatsapp)}
                    location="contact"
                    className="link-underline text-[1.0625rem]"
                  >
                    {site.whatsapp}
                  </WhatsAppLink>
                </dd>
              </div>
              <div>
                <dt className="text-[0.625rem] uppercase tracking-[0.14em] text-muted">Mill &amp; office</dt>
                <dd className="mt-1 max-w-xs text-[1rem] leading-relaxed text-ink-soft">
                  {site.addressLine}
                </dd>
                <dd className="mt-2 text-[0.8125rem] text-muted">{site.hours}</dd>
              </div>
            </dl>

            <div className="mt-9 rounded-[16px] border border-line bg-surface p-6">
              <h2 className="font-sans text-[0.75rem] uppercase tracking-[0.12em] text-muted">
                What to include
              </h2>
              <ul className="mt-3 space-y-2">
                {enquiryPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-[0.875rem] leading-snug text-ink-soft">
                    <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:h-fit">
            <RfqForm categories={categories} site={site} />
          </div>
        </div>
      </section>
    </>
  );
}
