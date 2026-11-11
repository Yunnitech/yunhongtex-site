import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getSite } from "@/lib/queries";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Sale",
  description:
    "Standard terms of sale for fabric supplied by Yunhong Textiles: quotations, deposits, tolerances, inspection, claims and delivery.",
  path: "/terms",
});

export default async function TermsPage() {
  const site = await getSite();

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            {
              title: "Terms of sale",
              description: "Standard commercial terms for Yunhong fabric orders.",
              path: "/terms",
            },
            site,
          ),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Terms of sale", href: "/terms" },
          ]),
        ]}
      />
      <div className="border-b border-line">
        <div className="shell py-6">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Terms of sale", href: "/terms" }]}
          />
        </div>
      </div>
      <section className="py-14 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16">
          <div>
            <h1 className="text-[2.3rem] leading-tight">Terms of sale</h1>
            <p className="mt-3 text-[0.8125rem] text-muted">Last updated: 1 October 2026</p>
          </div>
          <div className="prose-loom max-w-2xl">
            <h2 className="!mt-0">Quotations</h2>
            <p>
              Prices are quoted in USD, FOB Shanghai or Ningbo unless stated otherwise, and are valid
              for 30 days. Prices exclude freight, insurance, duty and local taxes unless a DDP term
              is agreed in writing.
            </p>

            <h2>Orders and payment</h2>
            <p>
              Production begins after a written purchase order and deposit. Standard terms are 30%
              deposit and 70% against the bill of lading copy. Letters of credit at sight are
              accepted above 20,000 metres. Bank charges outside China are for the buyer&apos;s
              account.
            </p>

            <h2>Tolerances</h2>
            <p>
              Fabric is supplied to the following industry tolerances unless the order confirms
              otherwise: weight ±5%, usable width ±2 cm, roll length −2% / +5%, and shipped quantity
              ±3%. Colour is matched to the approved lab dip under standard illuminant D65, with a
              tolerance of ΔE ≤ 1.0.
            </p>

            <h2>Inspection and claims</h2>
            <p>
              Every roll is inspected on a four-point system before shipment and the report is
              supplied with the documents. Claims for defects visible on arrival must be raised
              within 14 days of container arrival with roll numbers and photographs. Verified defects
              above 1.5% of shipped metres are credited or replaced. Cut or washed fabric cannot be
              claimed.
            </p>

            <h2>Delivery</h2>
            <p>
              Lead times run from lab dip approval, not from order date. Delays caused by late shade
              approval, incomplete shipping instructions or force majeure extend the delivery date
              accordingly.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of the People&apos;s Republic of China. Disputes
              are referred to the China International Economic and Trade Arbitration Commission
              (CIETAC) in Shanghai. Questions: {site.email}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
