import { notFound } from "next/navigation";
import { CategoryForm, type CategoryRow } from "@/components/admin/category-form";
import { getStoreCategories } from "@/lib/store";
import type { Category } from "@/lib/types";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categories = (await getStoreCategories<Category[]>()) ?? [];

  const category = categories.find((item) => item.slug === id);
  if (!category) notFound();

  const initial: CategoryRow = {
    id: category.slug,
    slug: category.slug,
    name: category.name,
    nav_name: category.navName ?? "",
    tagline: category.tagline ?? "",
    summary: category.summary ?? "",
    intro: category.intro ?? [],
    image: category.image ?? "",
    image_alt: category.imageAlt ?? "",
    highlights: category.highlights ?? [],
    applications: category.applications ?? [],
    faqs: category.faqs ?? [],
  };

  return (
    <div className="max-w-4xl">
      <p className="eyebrow">Catalog</p>
      <h1 className="mt-3 font-display text-[2rem] leading-tight">{category.name}</h1>
      <div className="card mt-8 p-6 sm:p-8">
        <CategoryForm initial={initial} />
      </div>
    </div>
  );
}
