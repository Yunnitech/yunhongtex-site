import Link from "next/link";
import { deleteFaq } from "@/app/admin/actions";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function AdminFaqsPage() {
  const supabase = await createServerSupabaseClient();
  const { data: rows } = supabase
    ? await supabase.from("faqs").select("*").order("sort_order")
    : { data: [] };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Content</p>
          <h1 className="mt-3 font-display text-[2rem] leading-tight">Buyer FAQs</h1>
        </div>
        <Link href="/admin/faqs/new" className="btn btn-primary">
          + New FAQ
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-[14px] border border-line bg-surface">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[0.625rem] uppercase tracking-[0.12em] text-muted">
              <th scope="col" className="px-5 py-3 font-medium">Order</th>
              <th scope="col" className="px-5 py-3 font-medium">Question</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows?.map((row: any) => (
              <tr key={row.id} className="hover:bg-sand/50">
                <td className="px-5 py-3.5 text-muted">{row.sort_order}</td>
                <td className="max-w-xl px-5 py-3.5 font-medium">{row.question}</td>
                <td className="px-5 py-3.5 whitespace-nowrap text-right">
                  <Link
                    href={`/admin/faqs/${row.id}`}
                    className="text-sm text-ink underline-offset-4 hover:underline"
                  >
                    Edit
                  </Link>
                  <span className="mx-2 text-line-strong">·</span>
                  <form action={deleteFaq.bind(null, row.id)} className="inline">
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
      {(!rows || rows.length === 0) && (
        <p className="mt-6 text-sm text-muted">
          No rows yet — run <code>node scripts/seed.mjs</code> to import the bundled FAQs.
        </p>
      )}
    </div>
  );
}
