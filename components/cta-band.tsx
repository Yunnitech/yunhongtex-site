import Link from "next/link";
import { getSite } from "@/lib/queries";

export async function CtaBand({
  eyebrow = "Next step",
  title = "Send us your fabric spec and we will quote within one business day",
  body = "Share the composition, weight, width, colour reference and quantity. We will reply with a price, a lab dip timetable and a sampling plan — no account setup needed.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  const site = await getSite();
  return (
    <section className="bg-forest text-paper">
      <div className="weave-texture">
        <div className="shell grid gap-10 py-16 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:py-20">
          <div>
            <p className="eyebrow text-paper/60">{eyebrow}</p>
            <h2 className="mt-4 max-w-xl font-display text-[2rem] leading-[1.08] sm:text-[2.6rem]">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-paper/70">{body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link href="/contact" className="btn btn-clay">
              Request a quote
            </Link>
            <a href={`mailto:${site.email}`} className="btn border border-paper/30 text-paper hover:bg-paper hover:text-ink">
              Email sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
