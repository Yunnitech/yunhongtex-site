import { CategoryForm } from "@/components/admin/category-form";

export default function NewCategoryPage() {
  return (
    <div className="max-w-4xl">
      <p className="eyebrow">Catalog</p>
      <h1 className="mt-3 font-display text-[2rem] leading-tight">New category</h1>
      <div className="card mt-8 p-6 sm:p-8">
        <CategoryForm />
      </div>
    </div>
  );
}
