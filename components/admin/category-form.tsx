import { AdminForm } from "@/components/admin/admin-form";
import { saveCategory } from "@/app/admin/actions";

export type CategoryRow = {
  id?: string;
  slug: string;
  name: string;
  nav_name: string;
  tagline: string;
  summary: string;
  intro: unknown;
  image: string;
  image_alt: string;
  highlights: unknown;
  applications: unknown;
  faqs: unknown;
};

function json(value: unknown): string {
  return value ? JSON.stringify(value, null, 2) : "";
}

export function CategoryForm({ initial }: { initial?: CategoryRow }) {
  return (
    <AdminForm
      action={saveCategory}
      submitLabel={initial ? "Save category" : "Create category"}
      cancelHref="/admin/categories"
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
          />
        </div>
        <div>
          <label className="field-label" htmlFor="navName">
            Short nav name
          </label>
          <input
            id="navName"
            name="navName"
            className="field"
            defaultValue={initial?.nav_name ?? ""}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="tagline">
            Tagline
          </label>
          <input
            id="tagline"
            name="tagline"
            className="field"
            defaultValue={initial?.tagline ?? ""}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="summary">
            Summary (answer-first sentence)
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
            ["intro", "Intro paragraphs (JSON array of strings)", initial?.intro, 6],
            ["highlights", "Highlights (JSON array of strings)", initial?.highlights, 3],
            ["applications", "Applications (JSON array of strings)", initial?.applications, 3],
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

        <div>
          <label className="field-label" htmlFor="image">
            Image URL
          </label>
          <input id="image" name="image" className="field" defaultValue={initial?.image ?? ""} />
        </div>
        <div>
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
      </div>
    </AdminForm>
  );
}
