import { AdminForm } from "@/components/admin/admin-form";
import { saveProduct } from "@/app/admin/actions";
import type { Category } from "@/lib/types";

export type ProductRow = {
  id?: string;
  slug: string;
  name: string;
  code: string;
  category_slug: string;
  summary: string;
  description: unknown;
  composition: string;
  weight_gsm: number;
  width_cm: number;
  weave: string;
  finish: string;
  shrinkage: string;
  moq_meters: number;
  stock_meters: number;
  lead_time_min: number;
  lead_time_max: number;
  price_from: number;
  price_to: number;
  colors: number;
  certifications: unknown;
  applications: unknown;
  features: unknown;
  image: string;
  image_alt: string;
  featured: boolean;
  faqs: unknown;
};

function json(value: unknown): string {
  return value ? JSON.stringify(value, null, 2) : "";
}

export function ProductForm({
  initial,
  categories,
}: {
  initial?: ProductRow;
  categories: Category[];
}) {
  return (
    <AdminForm
      action={saveProduct}
      submitLabel={initial ? "Save product" : "Create product"}
      cancelHref="/admin/products"
    >
      {initial?.id && <input type="hidden" name="id" value={initial.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="name">
            Name *
          </label>
          <input id="name" name="name" className="field" defaultValue={initial?.name ?? ""} required />
        </div>
        <div>
          <label className="field-label" htmlFor="slug">
            Slug (URL) *
          </label>
          <input
            id="slug"
            name="slug"
            className="field"
            defaultValue={initial?.slug ?? ""}
            required
            pattern="[a-z0-9-]+"
            title="Lowercase letters, numbers and dashes only"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="code">
            Article code *
          </label>
          <input id="code" name="code" className="field" defaultValue={initial?.code ?? ""} required />
        </div>
        <div>
          <label className="field-label" htmlFor="categorySlug">
            Category *
          </label>
          <select
            id="categorySlug"
            name="categorySlug"
            className="field"
            defaultValue={initial?.category_slug ?? ""}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {(
          [
            ["composition", "Composition", initial?.composition],
            ["weave", "Weave / knit", initial?.weave],
            ["finish", "Finish", initial?.finish],
            ["shrinkage", "Shrinkage", initial?.shrinkage],
            ["weightGsm", "Weight (gsm)", initial?.weight_gsm],
            ["widthCm", "Usable width (cm)", initial?.width_cm],
            ["moqMeters", "MOQ (m)", initial?.moq_meters],
            ["stockMeters", "Stock per colour (m)", initial?.stock_meters],
            ["leadTimeMin", "Lead time min (days)", initial?.lead_time_min],
            ["leadTimeMax", "Lead time max (days)", initial?.lead_time_max],
            ["priceFrom", "Price from (USD/m)", initial?.price_from],
            ["priceTo", "Price to (USD/m)", initial?.price_to],
            ["colors", "Colour count", initial?.colors],
          ] as Array<[string, string, string | number | undefined]>
        ).map(([name, label, value]) => (
          <div key={name}>
            <label className="field-label" htmlFor={name}>
              {label}
            </label>
            <input id={name} name={name} className="field" defaultValue={value ?? ""} />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="summary">
            Summary (one sentence — quoted by AI answer engines)
          </label>
          <textarea
            id="summary"
            name="summary"
            rows={2}
            className="field"
            defaultValue={initial?.summary ?? ""}
          />
        </div>

        {(
          [
            ["description", "Description paragraphs (JSON array of strings)", initial?.description, 6],
            ["certifications", "Certifications (JSON array of strings)", initial?.certifications, 3],
            ["applications", "Applications (JSON array of strings)", initial?.applications, 3],
            ["features", "Features (JSON array of strings)", initial?.features, 3],
            ["faqs", "FAQs (JSON array of {question, answer})", initial?.faqs, 8],
          ] as Array<[string, string, unknown, number]>
        ).map(([name, label, value, rows]) => (
          <div key={name} className="sm:col-span-2">
            <label className="field-label" htmlFor={name}>
              {label}
            </label>
            <textarea
              id={name}
              name={name}
              rows={rows}
              className="field font-mono text-xs leading-relaxed"
              defaultValue={json(value)}
              placeholder="[]"
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="image">
            Image URL
          </label>
          <input id="image" name="image" className="field" defaultValue={initial?.image ?? ""} />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="imageAlt">
            Image alt text
          </label>
          <input
            id="imageAlt"
            name="imageAlt"
            className="field"
            defaultValue={initial?.image_alt ?? ""}
          />
        </div>

        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" name="featured" defaultChecked={initial?.featured ?? false} />
          Featured on the homepage
        </label>
      </div>
    </AdminForm>
  );
}
