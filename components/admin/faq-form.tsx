import { AdminForm } from "@/components/admin/admin-form";
import { saveFaq } from "@/app/admin/actions";

export type FaqRow = {
  id?: string;
  question: string;
  answer: string;
  sort_order: number;
};

export function FaqForm({ initial }: { initial?: FaqRow }) {
  return (
    <AdminForm
      action={saveFaq}
      submitLabel={initial ? "Save FAQ" : "Create FAQ"}
      cancelHref="/admin/faqs"
    >
      {initial?.id && <input type="hidden" name="id" value={initial.id} />}
      <div className="grid gap-5">
        <div>
          <label className="field-label" htmlFor="question">
            Question *
          </label>
          <input
            id="question"
            name="question"
            className="field"
            defaultValue={initial?.question ?? ""}
            required
          />
        </div>
        <div>
          <label className="field-label" htmlFor="answer">
            Answer *
          </label>
          <textarea
            id="answer"
            name="answer"
            rows={5}
            className="field"
            defaultValue={initial?.answer ?? ""}
            required
          />
        </div>
        <div>
          <label className="field-label" htmlFor="sortOrder">
            Sort order (smaller = higher)
          </label>
          <input
            id="sortOrder"
            name="sortOrder"
            inputMode="numeric"
            className="field"
            defaultValue={initial?.sort_order ?? 0}
          />
        </div>
      </div>
    </AdminForm>
  );
}
