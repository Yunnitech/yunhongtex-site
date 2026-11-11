import Link from "next/link";
import { cn } from "@/lib/utils";

export function LoomtexMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
      fill="none"
    >
      <rect x="0.5" y="0.5" width="31" height="31" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M4 11h24M4 16h24M4 21h24" stroke="currentColor" strokeWidth="1.25" />
      <path d="M11 4v24M16 4v24M21 4v24" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.45" />
      <rect x="11" y="11" width="5" height="5" fill="currentColor" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label="Yunhong Textiles — home"
      className={cn(
        "group inline-flex items-center gap-3",
        tone === "light" ? "text-paper" : "text-ink",
      )}
    >
      <LoomtexMark className="transition-opacity group-hover:opacity-70" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] tracking-[0.02em]">yunhongtex</span>
        <span className="mt-1 text-[0.5625rem] uppercase tracking-[0.32em] opacity-60">
          Textiles
        </span>
      </span>
    </Link>
  );
}
