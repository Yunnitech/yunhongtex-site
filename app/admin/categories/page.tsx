import Link from "next/link";
import { deleteCategory } from "@/app/admin/actions";
import { getStoreCategories } from "@/lib/store";
import type { Category } from "@/lib/types";

export default async function AdminCategoriesPage() {
  const rows = (await getStoreCategories<Category[]>()) ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1 className="mt-3 font-display text-[2rem] leading-tight">Categories</h1>
        </div>
        <Link href="/admin/categories/new" className="btn btn-primary">
          + New category
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-[14px] border border-line bg-surface">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[0.625rem] uppercase tracking-[0.12em] text-muted">
              <th scope="col" className="px-5 py-3 font-medium">Name</th>
              <th scope="col" className="px-5 py-3 font-medium">Slug</th>
              <th scope="col" className="px-5 py-3 font-medium">Tagline</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row) => (
              <tr key={row.slug} className="hover:bg-sand/50">
                <td className="px-5 py-3.5 font-medium">{row.name}</td>
                <td className="px-5 py-3.5 text-muted">{row.slug}</td>
                <td className="max-w-md px-5 py-3.5 text-ink-soft">{row.tagline}</td>
                <td className="px-5 py-3.5 whitespace-nowrap text-right">
                  <Link
                    href={`/admin/categories/${row.slug}`}
                    className="text-sm text-ink underline-offset-4 hover:underline"
                  >
                    Edit
                  </Link>
                  <span className="mx-2 text-line-strong">·</span>
                  <form action={deleteCategory.bind(null, row.slug)} className="inline">
                    <button type="submit" className="text-sm text-clay underline-offset-4 hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length === 0 && (
        <p className="mt-6 text-sm text-muted">
          No categories yet — create the first category manually.
        </p>
      )}
    </div>
  );
}
