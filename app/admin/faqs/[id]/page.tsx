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

  // Stable id first; legacy numeric index for old store data without ids.
  const byId = faqs.find((f) => f.id === id);
  const legacyIndex = /^\d+$/.test(id) && Number(id) < faqs.length ? Number(id) : -1;
  const faq = byId ?? (legacyIndex >= 0 ? faqs[legacyIndex] : undefined);
  if (!faq) notFound();

  const currentIndex = byId ? faqs.findIndex((f) => f.id === id) : legacyIndex;

  const initial: FaqRow = {
    id: faq.id ?? id,
    question: faq.question,
    answer: faq.answer,
    sort_order: currentIndex,
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
