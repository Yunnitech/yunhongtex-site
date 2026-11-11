import { ArticleForm } from "@/components/admin/article-form";

export default function NewArticlePage() {
  return (
    <div className="max-w-4xl">
      <p className="eyebrow">Content</p>
      <h1 className="mt-3 font-display text-[2rem] leading-tight">New article</h1>
      <div className="card mt-8 p-6 sm:p-8">
        <ArticleForm />
      </div>
    </div>
  );
}
