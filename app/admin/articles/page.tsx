import Link from "next/link";
import { deleteArticle } from "@/app/admin/actions";
import { getStoreArticles } from "@/lib/store";
import type { Article } from "@/lib/types";

export default async function AdminArticlesPage() {
  const rows = ((await getStoreArticles<Article[]>()) ?? []).sort((a, b) =>
    String(b.date ?? "").localeCompare(String(a.date ?? "")),
  );

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Content</p>
          <h1 className="mt-3 font-display text-[2rem] leading-tight">Articles</h1>
        </div>
        <Link href="/admin/articles/new" className="btn btn-primary">
          + New article
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-[14px] border border-line bg-surface">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[0.625rem] uppercase tracking-[0.12em] text-muted">
              <th scope="col" className="px-5 py-3 font-medium">Title</th>
              <th scope="col" className="px-5 py-3 font-medium">Topic</th>
              <th scope="col" className="px-5 py-3 font-medium">Date</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row) => (
              <tr key={row.slug} className="hover:bg-sand/50">
                <td className="px-5 py-3.5 font-medium">{row.title}</td>
                <td className="px-5 py-3.5 text-ink-soft">{row.topic}</td>
                <td className="px-5 py-3.5 text-muted">{row.date}</td>
                <td className="px-5 py-3.5 whitespace-nowrap text-right">
                  <Link
                    href={`/admin/articles/${row.slug}`}
                    className="text-sm text-ink underline-offset-4 hover:underline"
                  >
                    Edit
                  </Link>
                  <span className="mx-2 text-line-strong">·</span>
                  <form action={deleteArticle.bind(null, row.slug)} className="inline">
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
          No articles yet — create the first guide manually.
        </p>
      )}
    </div>
  );
}
