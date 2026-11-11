import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getSite } from "@/lib/queries";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Yunhong Textiles collects, uses and stores personal data submitted through this website, including enquiry and sample request information.",
  path: "/privacy",
});

export default async function PrivacyPage() {
  const site = await getSite();

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            {
              title: "Privacy policy",
              description: "How Yunhong Textiles handles personal data.",
              path: "/privacy",
            },
            site,
          ),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Privacy policy", href: "/privacy" },
          ]),
        ]}
      />
      <div className="border-b border-line">
        <div className="shell py-6">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Privacy policy", href: "/privacy" }]}
          />
        </div>
      </div>
      <section className="py-14 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16">
          <div>
            <h1 className="text-[2.3rem] leading-tight">Privacy policy</h1>
            <p className="mt-3 text-[0.8125rem] text-muted">Last updated: 1 October 2026</p>
          </div>
          <div className="prose-loom max-w-2xl">
            <h2 className="!mt-0">Who we are</h2>
            <p>
              {site.legalName}, {site.addressLine}, is the data controller for information submitted
              through this website. You can reach us at {site.email}.
            </p>

            <h2>What we collect</h2>
            <p>
              We collect only what you submit in an enquiry form or by email: your name, company,
              business email, country, the fabric specification you describe, and your message. We
              also receive standard server logs (IP address, browser type, pages requested) from our
              hosting provider.
            </p>

            <h2>Why we process it</h2>
            <p>
              We use your details to answer your enquiry, prepare a quotation, arrange samples and
              manage any resulting order. Our lawful basis is the performance of a contract or steps
              taken at your request before entering a contract, and our legitimate interest in
              responding to business enquiries.
            </p>

            <h2>How long we keep it</h2>
            <p>
              Enquiries that do not lead to an order are deleted after 24 months. Order records,
              invoices and shipping documents are retained for the period required by Chinese tax
              and customs law.
            </p>

            <h2>Who we share it with</h2>
            <p>
              We do not sell personal data. We share delivery details with the freight forwarder and
              courier handling your shipment, and we use an email provider to send quotations. Both
              act as processors under written instruction.
            </p>

            <h2>Your rights</h2>
            <p>
              If you are in the EU or UK you may request access to, correction of, or deletion of
              your personal data, object to processing, or request portability. Write to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within 30 days.
              You also have the right to complain to your local supervisory authority.
            </p>

            <h2>Cookies</h2>
            <p>
              This website sets no advertising or analytics cookies. Any cookies used are strictly
              necessary for the site to function and are not used to build a profile.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
