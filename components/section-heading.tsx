import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  id,
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  id?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow", align === "center" && "justify-center", tone === "light" && "text-paper/60")}>
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "mt-4 text-[2rem] leading-[1.06] sm:text-[2.5rem] lg:text-[2.9rem]",
          tone === "light" ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-[1.0625rem]",
            tone === "light" ? "text-paper/70" : "text-ink-soft",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
