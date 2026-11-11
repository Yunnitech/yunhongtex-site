import { AdminForm } from "@/components/admin/admin-form";
import { saveArticle } from "@/app/admin/actions";

export type ArticleRow = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  updated?: string;
  author: string;
  reading_minutes: number;
  topic: string;
  image: string;
  image_alt: string;
  key_takeaways: unknown;
  sections: unknown;
  faqs: unknown;
  related_categories: unknown;
};

function json(value: unknown): string {
  return value ? JSON.stringify(value, null, 2) : "";
}

export function ArticleForm({ initial }: { initial?: ArticleRow }) {
  return (
    <AdminForm
      action={saveArticle}
      submitLabel={initial ? "Save article" : "Create article"}
      cancelHref="/admin/articles"
    >
      {initial?.id && <input type="hidden" name="id" value={initial.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="title">
            Title *
          </label>
          <input id="title" name="title" className="field" defaultValue={initial?.title ?? ""} required />
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
          <label className="field-label" htmlFor="topic">
            Topic
          </label>
          <input id="topic" name="topic" className="field" defaultValue={initial?.topic ?? ""} />
        </div>
        <div>
          <label className="field-label" htmlFor="author">
            Author
          </label>
          <input id="author" name="author" className="field" defaultValue={initial?.author ?? ""} />
        </div>
        <div>
          <label className="field-label" htmlFor="date">
            Publish date (YYYY-MM-DD)
          </label>
          <input id="date" name="date" className="field" defaultValue={initial?.date ?? ""} />
        </div>
        <div>
          <label className="field-label" htmlFor="readingMinutes">
            Reading minutes
          </label>
          <input
            id="readingMinutes"
            name="readingMinutes"
            className="field"
            defaultValue={initial?.reading_minutes ?? ""}
          />
        </div>
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

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="description">
            Meta description
          </label>
          <textarea
            id="description"
            name="description"
            rows={2}
            className="field"
            defaultValue={initial?.description ?? ""}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="excerpt">
            Excerpt (shown on list cards)
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            className="field"
            defaultValue={initial?.excerpt ?? ""}
          />
        </div>

        {(
          [
            ["keyTakeaways", "Key takeaways (JSON array of strings)", initial?.key_takeaways, 4],
            [
              "sections",
              'Sections (JSON array of {heading, paragraphs, bullets?, table?{caption, head, rows}})',
              initial?.sections,
              14,
            ],
            ["faqs", "FAQs (JSON array of {question, answer})", initial?.faqs, 6],
            ["relatedCategories", "Related category slugs (JSON array)", initial?.related_categories, 3],
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
      </div>
    </AdminForm>
  );
}
