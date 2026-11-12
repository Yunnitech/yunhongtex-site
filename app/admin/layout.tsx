import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { adminSignOut } from "@/app/admin/actions";
import { sha256Hex } from "@/lib/utils";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin" },
  openGraph: { title: "Admin — Yunhong Textiles", url: "/admin" },
};

const sections = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/faqs", label: "Buyer FAQs" },
  { href: "/admin/settings", label: "Company settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  // Same fail-closed hash check as middleware — no fallback password.
  const adminPassword = process.env.ADMIN_PASSWORD;
  const expectedHash = adminPassword ? sha256Hex(adminPassword) : null;
  const authenticated =
    expectedHash !== null && cookieStore.get("admin_auth")?.value === expectedHash;

  // Login page — no sidebar chrome.
  if (!authenticated) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="flex w-60 shrink-0 flex-col border-r border-line bg-surface">
        <div className="border-b border-line px-6 py-5">
          <Logo />
          <p className="mt-2 text-[0.625rem] uppercase tracking-[0.18em] text-muted">
            Admin console
          </p>
        </div>
        <nav className="flex-1 px-4 py-5" aria-label="Admin navigation">
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.href}>
                <Link
                  href={section.href}
                  className="block rounded-lg px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-sand hover:text-ink"
                >
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-line px-4 py-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-sand"
          >
            View live site ↗
          </a>
          <form action={adminSignOut}>
            <button
              type="submit"
              className="w-full rounded-lg px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-sand"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-8 py-8 lg:px-12">{children}</main>
    </div>
  );
}
