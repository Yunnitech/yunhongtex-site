import { FaqForm } from "@/components/admin/faq-form";

export default function NewFaqPage() {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">Content</p>
      <h1 className="mt-3 font-display text-[2rem] leading-tight">New FAQ</h1>
      <div className="card mt-8 p-6 sm:p-8">
        <FaqForm />
      </div>
    </div>
  );
}
