import { notFound } from "next/navigation";
import { ArticleForm, type ArticleRow } from "@/components/admin/article-form";
import { getStoreArticles } from "@/lib/store";
import type { Article } from "@/lib/types";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const articles = (await getStoreArticles<Article[]>()) ?? [];

  const article = articles.find((item) => item.slug === id);
  if (!article) notFound();

  const initial: ArticleRow = {
    id: article.slug,
    slug: article.slug,
    title: article.title,
    description: article.description ?? "",
    excerpt: article.excerpt ?? "",
    date: article.date ?? "",
    updated: article.updated,
    author: article.author ?? "",
    reading_minutes: article.readingMinutes ?? 0,
    topic: article.topic ?? "",
    image: article.image ?? "",
    image_alt: article.imageAlt ?? "",
    key_takeaways: article.keyTakeaways ?? [],
    sections: article.sections ?? [],
    faqs: article.faqs ?? [],
    related_categories: article.relatedCategories ?? [],
  };

  return (
    <div className="max-w-4xl">
      <p className="eyebrow">Content</p>
      <h1 className="mt-3 font-display text-[2rem] leading-tight">{article.title}</h1>
      <div className="card mt-8 p-6 sm:p-8">
        <ArticleForm initial={initial} />
      </div>
    </div>
  );
}
