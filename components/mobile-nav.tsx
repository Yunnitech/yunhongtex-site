"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-line-strong"
      >
        <span
          className={cn(
            "block h-px w-4 bg-ink transition-transform",
            open && "translate-y-[3px] rotate-45",
          )}
        />
        <span
          className={cn(
            "block h-px w-4 bg-ink transition-transform",
            open && "-translate-y-[3px] -rotate-45",
          )}
        />
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-line bg-paper px-5 pb-10 pt-4 shadow-[0_20px_40px_-24px_rgba(23,20,15,0.35)]"
        >
          <nav aria-label="Mobile navigation">
            <ul className="divide-y divide-line">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-4 font-display text-2xl"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-muted">
                      →
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="flex items-center justify-between py-4 font-display text-2xl text-clay"
                >
                  Request a quote
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </nav>
          <a href="mailto:sales@yunhongtex.com" className="mt-8 block text-sm text-muted">
            sales@yunhongtex.com
          </a>
        </div>
      )}
    </div>
  );
}
