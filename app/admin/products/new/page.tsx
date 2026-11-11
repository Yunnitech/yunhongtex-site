import { ProductForm } from "@/components/admin/product-form";
import { getCategories } from "@/lib/queries";

export default async function NewProductPage() {
  const categories = await getCategories();
  return (
    <div className="max-w-4xl">
      <p className="eyebrow">Catalog</p>
      <h1 className="mt-3 font-display text-[2rem] leading-tight">New product</h1>
      <div className="card mt-8 p-6 sm:p-8">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
