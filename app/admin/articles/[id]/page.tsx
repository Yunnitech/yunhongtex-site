import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/article-form";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data } = supabase
    ? await supabase.from("articles").select("*").eq("id", id).single()
    : { data: null };
  if (!data) notFound();

  return (
    <div className="max-w-4xl">
      <p className="eyebrow">Content</p>
      <h1 className="mt-3 font-display text-[2rem] leading-tight">{data.title}</h1>
      <div className="card mt-8 p-6 sm:p-8">
        <ArticleForm initial={data} />
      </div>
    </div>
  );
}
