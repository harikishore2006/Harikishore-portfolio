import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-24 md:py-28", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  singleLineTitle = false,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  singleLineTitle?: boolean;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <div className={cn("mb-12 md:mb-16", singleLineTitle ? "max-w-none" : "max-w-3xl")}>
      <p className={cn("mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.24em]", isDark ? "text-[#e7a847]" : "text-[#9a6a22]")}>
        {eyebrow}
      </p>
      <h2 className={cn("text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-5xl md:text-6xl", isDark ? "text-[#f3f3f0]" : "text-[#171715]", singleLineTitle && "lg:text-4xl lg:whitespace-nowrap xl:text-5xl")}>
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-5 max-w-2xl text-base leading-7 md:text-lg", isDark ? "text-white/65" : "text-[#65655f]")}>{description}</p>
      ) : null}
    </div>
  );
}
