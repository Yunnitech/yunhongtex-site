import { notFound } from "next/navigation";
import { FaqForm } from "@/components/admin/faq-form";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data } = supabase
    ? await supabase.from("faqs").select("*").eq("id", id).single()
    : { data: null };
  if (!data) notFound();

  return (
    <div className="max-w-2xl">
      <p className="eyebrow">Content</p>
      <h1 className="mt-3 font-display text-[2rem] leading-tight">Edit FAQ</h1>
      <div className="card mt-8 p-6 sm:p-8">
        <FaqForm initial={data} />
      </div>
    </div>
  );
}
