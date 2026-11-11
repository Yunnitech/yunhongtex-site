import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { getCategories } from "@/lib/queries";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const categories = await getCategories();
  const { data } = supabase
    ? await supabase.from("products").select("*").eq("id", id).single()
    : { data: null };
  if (!data) notFound();

  return (
    <div className="max-w-4xl">
      <p className="eyebrow">Catalog</p>
      <h1 className="mt-3 font-display text-[2rem] leading-tight">{data.name}</h1>
      <div className="card mt-8 p-6 sm:p-8">
        <ProductForm initial={data} categories={categories} />
      </div>
    </div>
  );
}
