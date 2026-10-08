import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-black/15 px-2.5 py-1 text-[0.64rem] font-medium uppercase tracking-[0.14em] text-[#55554f]",
        className,
      )}
    >
      {children}
    </span>
  );
}
