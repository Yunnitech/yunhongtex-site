import Link from "next/link";
import { deleteProduct } from "@/app/admin/actions";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getCategories } from "@/lib/queries";

export default async function AdminProductsPage() {
  const supabase = await createServerSupabaseClient();
  const categories = await getCategories();
  const categoryName = (slug: string) =>
    categories.find((category) => category.slug === slug)?.name ?? slug;

  const { data: rows } = supabase
    ? await supabase.from("products").select("*").order("sort_order").order("name")
    : { data: [] };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1 className="mt-3 font-display text-[2rem] leading-tight">Products</h1>
        </div>
        <Link href="/admin/products/new" className="btn btn-primary">
          + New product
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-[14px] border border-line bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[0.625rem] uppercase tracking-[0.12em] text-muted">
              <th scope="col" className="px-5 py-3 font-medium">Name</th>
              <th scope="col" className="px-5 py-3 font-medium">Code</th>
              <th scope="col" className="px-5 py-3 font-medium">Category</th>
              <th scope="col" className="px-5 py-3 font-medium">Weight</th>
              <th scope="col" className="px-5 py-3 font-medium">Price (USD/m)</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows?.map((row: any) => (
              <tr key={row.id} className="hover:bg-sand/50">
                <td className="px-5 py-3.5 font-medium">
                  {row.name}
                  {row.featured && (
                    <span className="ml-2 rounded-full bg-clay-soft px-2 py-0.5 text-[0.625rem] uppercase tracking-wide text-clay-deep">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-muted">{row.code}</td>
                <td className="px-5 py-3.5 text-ink-soft">{categoryName(row.category_slug)}</td>
                <td className="px-5 py-3.5 text-ink-soft">{row.weight_gsm} gsm</td>
                <td className="px-5 py-3.5 text-ink-soft">
                  {Number(row.price_from).toFixed(2)}–{Number(row.price_to).toFixed(2)}
                </td>
                <td className="px-5 py-3.5 text-right whitespace-nowrap">
                  <Link
                    href={`/admin/products/${row.id}`}
                    className="text-sm text-ink underline-offset-4 hover:underline"
                  >
                    Edit
                  </Link>
                  <span className="mx-2 text-line-strong">·</span>
                  <form action={deleteProduct.bind(null, row.id)} className="inline">
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
          No rows in the database yet — run <code>node scripts/seed.mjs</code> to import the
          bundled catalogue, or create the first product manually.
        </p>
      )}
    </div>
  );
}
