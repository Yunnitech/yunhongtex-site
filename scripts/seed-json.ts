/**
 * Seeds data/*.json from the bundled static catalogues.
 * Run once after clone:  npm run seed:json
 */
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { categories, products } from "../lib/products";
import { articles } from "../lib/articles";
import { faqs } from "../lib/faqs";
import { defaultSite } from "../lib/site";

const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "data");

if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });

const files: Record<string, unknown> = {
  "categories.json": categories,
  "products.json": products,
  "articles.json": articles,
  "faqs.json": faqs,
  "site.json": defaultSite,
};

for (const [name, data] of Object.entries(files)) {
  writeFileSync(join(DATA_DIR, name), JSON.stringify(data, null, 2), "utf-8");
  console.log(`✅ data/${name} written`);
}

console.log(`
🎉 JSON seed complete! ${Object.keys(files).length} files in data/

Now you can:
  1. Run \`npm run dev\` to preview locally
  2. Visit /admin to edit content (no database needed)
  3. Commit data/*.json and push — Vercel deploys with your latest content
`);
