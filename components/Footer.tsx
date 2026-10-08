import { Suspense } from "react";
import { io } from "next/cache";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/15 bg-[#111110] text-[#f3f3f0]">
      <div className="grid gap-6 px-5 py-7 sm:px-8 md:grid-cols-3 md:items-center lg:px-10 xl:px-14">
        <a href="#home" className="text-xs font-semibold uppercase tracking-[0.13em] hover:text-[#e7a847]">
          © <Suspense fallback={null}><CurrentYear /></Suspense> {siteConfig.name}
        </a>
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white/45 md:text-center">
          AI &amp; Data Science
        </p>
        <a
          href="#home"
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-[#e7a847] md:justify-self-end"
        >
          Back to top
          <span className="transition-transform duration-300 group-hover:-translate-y-1">↑</span>
        </a>
      </div>
    </footer>
  );
}

async function CurrentYear() {
  await io();
  return new Date().getFullYear();
}
