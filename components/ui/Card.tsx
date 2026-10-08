import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "border border-black/10 bg-white/45 p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
