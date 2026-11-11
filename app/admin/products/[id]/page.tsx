import { notFound } from "next/navigation";
import { ProductForm, type ProductRow } from "@/components/admin/product-form";
import { getStoreCategories, getStoreProducts } from "@/lib/store";
import type { Category, Product } from "@/lib/types";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [products, categories] = await Promise.all([
    getStoreProducts<Product[]>(),
    getStoreCategories<Category[]>(),
  ]);

  const product = products?.find((item) => item.slug === id);
  if (!product) notFound();

  const [leadTimeMin, leadTimeMax] = [
    product.leadTimeDays?.[0] ?? 0,
    product.leadTimeDays?.[1] ?? 0,
  ];

  const initial: ProductRow = {
    id: product.slug,
    slug: product.slug,
    name: product.name,
    code: product.code,
    category_slug: product.categorySlug ?? "",
    summary: product.summary ?? "",
    description: product.description ?? [],
    composition: product.composition ?? "",
    weight_gsm: product.weightGsm ?? 0,
    width_cm: product.widthCm ?? 0,
    weave: product.weave ?? "",
    finish: product.finish ?? "",
    shrinkage: product.shrinkage ?? "",
    moq_meters: product.moqMeters ?? 0,
    stock_meters: product.stockMeters ?? 0,
    lead_time_min: leadTimeMin,
    lead_time_max: leadTimeMax,
    price_from: product.priceFrom ?? 0,
    price_to: product.priceTo ?? 0,
    colors: product.colors ?? 0,
    certifications: product.certifications ?? [],
    applications: product.applications ?? [],
    features: product.features ?? [],
    image: product.image ?? "",
    image_alt: product.imageAlt ?? "",
    featured: product.featured ?? false,
    faqs: product.faqs ?? [],
  };

  return (
    <div className="max-w-4xl">
      <p className="eyebrow">Catalog</p>
      <h1 className="mt-3 font-display text-[2rem] leading-tight">{product.name}</h1>
      <div className="card mt-8 p-6 sm:p-8">
        <ProductForm initial={initial} categories={categories ?? []} />
      </div>
    </div>
  );
}
