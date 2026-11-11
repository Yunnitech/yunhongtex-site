import { notFound } from "next/navigation";
import { FaqForm, type FaqRow } from "@/components/admin/faq-form";
import { getStoreFaqs } from "@/lib/store";
import type { Faq } from "@/lib/types";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faqs = (await getStoreFaqs<Faq[]>()) ?? [];

  const index = Number(id);
  const faq =
    Number.isInteger(index) && index >= 0 && index < faqs.length ? faqs[index] : undefined;
  if (!faq) notFound();

  const initial: FaqRow = {
    id: String(index),
    question: faq.question,
    answer: faq.answer,
    sort_order: index,
  };

  return (
    <div className="max-w-2xl">
      <p className="eyebrow">Content</p>
      <h1 className="mt-3 font-display text-[2rem] leading-tight">Edit FAQ</h1>
      <div className="card mt-8 p-6 sm:p-8">
        <FaqForm initial={initial} />
      </div>
    </div>
  );
}
