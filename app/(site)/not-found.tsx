import Link from "next/link";
import { getCategories } from "@/lib/queries";

export default async function NotFound() {
  const categories = await getCategories();
  return (
    <section className="py-20 lg:py-28">
      <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow">404</p>
          <h1 className="mt-5 text-[2.6rem] leading-[1.03] sm:text-[3.2rem]">
            This page has gone off the loom
          </h1>
          <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-ink-soft">
            The page you are looking for does not exist, or the fabric it described has been
            retired. Start from the fabric range, or send us a message and we will point you to the
            right quality.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/fabrics" className="btn btn-primary">
              Browse fabrics
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Contact sales
            </Link>
          </div>
        </div>
        <nav aria-label="Fabric categories" className="rounded-[18px] border border-line bg-surface p-7">
          <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
            Popular destinations
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/fabrics/${category.slug}`}
                  className="link-underline text-[0.9375rem] text-ink-soft"
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/insights" className="link-underline text-[0.9375rem] text-ink-soft">
                Sourcing insights
              </Link>
            </li>
            <li>
              <Link href="/faq" className="link-underline text-[0.9375rem] text-ink-soft">
                Buyer FAQ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
