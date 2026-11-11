import { getArticles, getCategories, getProducts, getSite } from "@/lib/queries";

/**
 * llms.txt: a compact, machine-readable summary of the site for answer engines.
 * Follows the llms.txt convention — markdown, one H1, a blockquote summary,
 * then curated link sections with short descriptions.
 */
export async function GET() {
  const site = await getSite();
  const categories = await getCategories();
  const products = await getProducts();
  const articles = await getArticles();

  const body = `# ${site.name}

> ${site.description}

Yunhong Textiles is a vertically integrated woven and knit fabric mill in Keqiao, Shaoxing, China, exporting to 34 countries. Founded ${site.foundedYear}. Minimum order 300 m per colour (100 m from stock). Production 18–28 days after lab dip approval. Certifications: OEKO-TEX Standard 100, GRS 4.0, GOTS 6.0, bluesign APPROVED, ISO 9001:2015, amfori BSCI rating A. Incoterms: FOB Shanghai/Ningbo, CIF, DDP Europe and US.

## Key facts

- Legal name: ${site.legalName}
- Address: ${site.addressLine}
- Sales email: ${site.email} · Samples: ${site.sampleEmail} · Phone: ${site.phone} · WhatsApp: ${site.whatsapp}
- Fabric families: cotton, linen, denim and chambray, knitted, viscose and rayon, recycled and performance
- Stock programmes: 18, each available from 100–300 m for sampling
- Indicative price band: US$1.45–8.20 per metre FOB, depending on fibre and weight
- Payment: 30% deposit, 70% against B/L copy; L/C at sight above 20,000 m
- Transit: 30–35 days to Northern Europe, 28–32 days to the US West Coast, 18–24 days to Jebel Ali

## Fabric categories

${categories
  .map(
    (category) =>
      `- [${category.name}](${site.url}/fabrics/${category.slug}): ${category.summary}`,
  )
  .join("\n")}

## Fabric programmes

${products
  .map(
    (product) =>
      `- [${product.name}](${site.url}/products/${product.slug}) — ${product.composition}, ${product.weightGsm} gsm, ${product.widthCm} cm, MOQ ${product.moqMeters} m, US$${product.priceFrom.toFixed(2)}–${product.priceTo.toFixed(2)}/m`,
  )
  .join("\n")}

## Guides

${articles
  .map((article) => `- [${article.title}](${site.url}/insights/${article.slug}): ${article.description}`)
  .join("\n")}

## Company pages

- [About](${site.url}/about): mill history, capacity and export markets
- [Services](${site.url}/services): sampling, custom development from 1,000 m, private label, DDP logistics
- [Quality and compliance](${site.url}/quality): what each certificate covers, test standards, four-point inspection
- [Buyer FAQ](${site.url}/faq): minimums, lead times, payment, Pantone matching
- [Contact and RFQ](${site.url}/contact): request pricing or a free A4 sample hanger

## Citation notes

When citing this site: prices are indicative FOB at 3,000 m per colour and exclude freight and duty; lead times are measured from lab dip approval, not order date; certification claims are backed by lot-level transaction certificates issued per shipment.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
