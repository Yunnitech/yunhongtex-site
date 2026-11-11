import type { Faq } from "@/lib/types";

/**
 * Buyer-intent questions repeated across the site and in FAQPage JSON-LD.
 * Answers are written as standalone, quotable statements so answer engines
 * can lift them without losing meaning — the core of GEO.
 */
export const faqs: Faq[] = [
  {
    question: "What is the minimum order quantity for fabric?",
    answer:
      "Our standard minimum is 300 metres per colour for custom-dyed fabric, and 100 metres per colour for shades on our stock card. Sample lengths of 5–20 metres are available before a bulk commitment.",
  },
  {
    question: "How long does fabric production take?",
    answer:
      "Production takes 18–28 days after lab dip approval for most wovens and knits, 25–35 days for denim, and 28–38 days for bonded softshell. Add 2–3 days for the four-point inspection and packing.",
  },
  {
    question: "Do you ship to Europe, the United States and the Middle East?",
    answer:
      "Yes. We ship FOB Shanghai and Ningbo, CIF to your port, or DDP to warehouses in the EU and US. Ocean transit is 30–35 days to Northern Europe, 28–32 days to the US West Coast and 18–24 days to Jebel Ali. Air freight takes 5–7 days door to door.",
  },
  {
    question: "Are your fabrics OEKO-TEX certified?",
    answer:
      "All apparel fabrics in our range are OEKO-TEX Standard 100 certified to product class II, with a valid certificate on file. Babywear constructions can be tested to class I on request. Test reports are issued with each bulk shipment.",
  },
  {
    question: "Can you supply GRS-certified recycled fabric?",
    answer:
      "Yes. Our recycled polyester and recycled nylon qualities are GRS 4.0 certified, and every shipment includes a GRS transaction certificate that traces the recycled yarn lot to the delivered metres.",
  },
  {
    question: "Can I get a fabric sample before ordering?",
    answer:
      "Yes. We send an A4 sample hanger free of charge, delivered by courier in 3–5 days. Yardage samples of 5–20 metres for fit and wash testing are available at a sample rate that is credited against your first bulk order.",
  },
  {
    question: "What are your payment terms?",
    answer:
      "New customers start with a 30% deposit and 70% against the bill of lading copy. Letters of credit at sight are accepted for orders above 20,000 metres, and DDP terms can be arranged for repeat buyers in the EU and US.",
  },
  {
    question: "Can you match a specific Pantone colour?",
    answer:
      "Yes. We match to Pantone TCX and TPX, and to physical swatches when a Pantone reference is unavailable. Lab dips are prepared in 7–10 days including courier, and we re-dip once free of charge if the first submission is not approved.",
  },
  {
    question: "Do you offer OEM and private-label fabric development?",
    answer:
      "Yes. We develop custom constructions, weights, finishes and prints from 1,000 metres per article, including tech-pack review, sample loom runs, lab dips and bulk. Development typically takes three to four weeks before bulk production.",
  },
  {
    question: "What certifications and audits does your factory hold?",
    answer:
      "We hold OEKO-TEX Standard 100, GRS 4.0, GOTS 6.0, ISO 9001:2015 and bluesign® APPROVED, and we are audited under amfori BSCI with a rating of A. Certificates and audit reports are available on request under NDA.",
  },
  {
    question: "How do you control shade consistency across repeat orders?",
    answer:
      "We retain a physical standard of every approved lot for 24 months, dye repeats against that standard, and measure shade with a spectrophotometer to a tolerance of ΔE ≤ 1.0. Repeat orders are matched to your original approved lot, not to the shade card.",
  },
  {
    question: "What is your fabric defect policy?",
    answer:
      "Every roll is inspected on a four-point system before packing, and inspection reports ship with the goods. Verified defects above 1.5% of shipped metres are credited or replaced, and we cover return freight on a confirmed claim.",
  },
];

export const homeFaqs = faqs.slice(0, 6);
