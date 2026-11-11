import type { Faq } from "@/lib/products";
import { cn } from "@/lib/utils";

export function FaqList({
  faqs,
  className,
  defaultOpen = 0,
}: {
  faqs: Faq[];
  className?: string;
  defaultOpen?: number;
}) {
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {faqs.map((faq, index) => (
        <details key={faq.question} open={index < defaultOpen} className="group py-5">
          <summary className="flex items-start justify-between gap-6">
            <span className="font-sans text-[1.0625rem] font-medium leading-snug text-ink">
              {faq.question}
            </span>
            <span
              aria-hidden="true"
              className="faq-icon mt-0.5 shrink-0 text-xl font-light leading-none text-clay"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl pr-8 text-[0.9375rem] leading-relaxed text-ink-soft">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
