"use client";

import { motion, useReducedMotion } from "framer-motion";
import { education } from "@/data/education";

export function Education() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative isolate overflow-hidden border border-white/10 bg-[#171a1b] p-5 shadow-[0_24px_70px_rgba(17,23,25,0.2)] sm:p-8 md:p-10">
      {!reduceMotion ? (
        <>
          <motion.span
            aria-hidden="true"
            animate={{ x: [0, 24, 0], y: [0, 12, 0], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full bg-[#e7a847] opacity-10 blur-3xl"
          />
          <motion.span
            aria-hidden="true"
            animate={{ x: [0, -18, 0], y: [0, -14, 0], opacity: [0.06, 0.16, 0.06] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -bottom-32 -left-20 -z-10 h-72 w-72 rounded-full bg-[#5596a8] opacity-10 blur-3xl"
          />
        </>
      ) : null}
      <div className="relative z-10 mb-3 flex items-center justify-between border-b border-white/15 pb-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e7a847]">
          Education
        </h3>
        <span className="text-[0.62rem] font-medium uppercase tracking-[0.16em] text-white/50">
          01 — {String(education.length).padStart(2, "0")}
        </span>
      </div>
      <div className="relative z-10">
        {education.map((item, index) => (
          <motion.article
            key={item.school}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 220, damping: 22, delay: index * 0.1 }
            }
            className={`grid gap-5 border-b border-white/10 py-6 last:border-0 last:pb-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-8 sm:py-7 ${
              index === 0 ? "pt-5" : ""
            }`}
          >
            <div className="min-w-0">
              <p className="mb-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#e7a847]">
                {index === 0 ? "Undergraduate" : "High school"}
              </p>
              <h4 className="text-xl font-semibold leading-tight tracking-[-0.035em] text-[#f3f3f0] sm:text-2xl">
                {item.degree}
              </h4>
              <p className="mt-2 text-sm text-white/75">{item.school}</p>
              <p className="mt-1 text-sm text-white/50">{item.location}</p>
              {item.specialization ? (
                <p className="mt-3 text-sm text-white/65">{item.specialization}</p>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium uppercase tracking-[0.12em] text-white/60 sm:justify-end">
              <span>{item.range}</span>
              <span className="text-[#e7a847]">{item.result}</span>
              {item.website ? (
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-white/30 pb-1 text-white transition-colors hover:border-[#e7a847] hover:text-[#e7a847]"
                >
                  Institution ↗
                </a>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
