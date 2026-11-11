"use client";

import { useActionState } from "react";
import type { AdminFormState } from "@/app/admin/actions";

export function AdminForm({
  action,
  children,
  submitLabel,
  cancelHref,
}: {
  action: (prev: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  children: React.ReactNode;
  submitLabel?: string;
  cancelHref?: string;
}) {
  const [state, formAction, pending] = useActionState(action, {
    status: "idle",
  } as AdminFormState);

  return (
    <form action={formAction} className="space-y-6">
      {children}
      {state.status === "error" && (
        <p
          role="alert"
          className="rounded-lg border border-clay/40 bg-clay-soft px-4 py-3 text-sm text-clay-deep"
        >
          {state.message}
        </p>
      )}
      <div className="flex items-center gap-3 border-t border-line pt-5">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Saving…" : (submitLabel ?? "Save")}
        </button>
        {cancelHref && (
          <a href={cancelHref} className="btn btn-outline">
            Cancel
          </a>
        )}
      </div>
    </form>
  );
}
