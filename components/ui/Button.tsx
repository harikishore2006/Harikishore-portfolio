import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CommonProps = {
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  children: ReactNode;
};

type AnchorButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
    type?: "button" | "submit" | "reset";
  };

type ButtonProps = AnchorButtonProps | NativeButtonProps;

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const common =
    "inline-flex items-center justify-center gap-2 border px-5 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b57816] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f3f0] disabled:cursor-not-allowed disabled:opacity-60";

  const classes =
    variant === "primary"
      ? "border-[#171715] bg-[#171715] text-[#f3f3f0] hover:border-[#9a6a22] hover:bg-[#9a6a22]"
      : variant === "secondary"
        ? "border-black/20 bg-transparent text-[#171715] hover:border-black hover:bg-black/[0.04]"
        : "border-transparent text-[#4d4d47] hover:text-[#171715]";

  if ("href" in props) {
    return (
      <a {...props} className={cn(common, classes, className)}>
        {children}
      </a>
    );
  }

  return (
    <button {...props} className={cn(common, classes, className)}>
      {children}
    </button>
  );
}
