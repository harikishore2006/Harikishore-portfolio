"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { skillGroups } from "@/data/skills";

export function Skills() {
  const [activeGroup, setActiveGroup] = useState("All");
  const reduceMotion = useReducedMotion();
  const groups = useMemo(() => ["All", ...skillGroups.map((group) => group.name)], []);
  const filteredGroups =
    activeGroup === "All" ? skillGroups : skillGroups.filter((group) => group.name === activeGroup);

  return (
    <Section id="skills" className="border-y border-black/10 bg-[#e9e9e4] px-5 sm:px-8 lg:px-10 xl:px-14">
      <SectionHeading
        eyebrow="04 / EXPERTISE"
        title="Tools and strengths built for product, AI and data work."
        description="A hands-on toolkit across programming, intelligent systems, the web, and creative production."
        singleLineTitle
      />

      <div className="mb-10 flex flex-wrap gap-x-5 gap-y-3 border-b border-black/15 pb-4">
        {groups.map((group) => (
          <button
            key={group}
            type="button"
            aria-pressed={activeGroup === group}
            onClick={() => setActiveGroup(group)}
            className={`relative rounded-full px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition-colors ${
              activeGroup === group
                ? "text-[#82571c]"
                : "text-[#73736c] hover:text-[#171715]"
            }`}
          >
            {activeGroup === group ? (
              <motion.span
                layoutId="skills-filter-highlight"
                aria-hidden="true"
                transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-[#deddd5] shadow-[inset_0_0_0_1px_rgba(154,106,34,0.16)]"
              />
            ) : null}
            <span className="relative z-10">{group}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
        {filteredGroups.map((group, groupIndex) => {
          const isActive = activeGroup === group.name;

          return (
            <motion.div
              key={group.name}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: groupIndex * 0.04 }}
              className={`relative overflow-hidden rounded-sm border-t border-black/20 px-4 pb-5 pt-4 transition-[background-color,box-shadow] duration-500 ${
                isActive
                  ? "bg-[#e0dfd8] shadow-[0_12px_32px_rgba(23,23,21,0.06)]"
                  : "bg-transparent"
              }`}
            >
              {isActive && !reduceMotion ? (
                <motion.span
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 0.45, scale: 1 }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className="pointer-events-none absolute -right-12 -top-14 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(231,168,71,0.24),transparent_70%)]"
                />
              ) : null}
              <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#9a6a22]">
                  <span className="mr-2 text-[#aaa99f]">{String(skillGroups.indexOf(group) + 1).padStart(2, "0")}</span>
                  {group.name}
                </h3>
                <span className="text-[0.58rem] tabular-nums tracking-[0.12em] text-[#929188]">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="space-y-1.5">
                {group.items.map((item, itemIndex) => (
                  <motion.li
                    key={item}
                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={reduceMotion ? undefined : { x: 4 }}
                    transition={{ duration: 0.3, delay: groupIndex * 0.04 + itemIndex * 0.025 }}
                    className="group/skill flex items-center gap-2 text-lg font-medium tracking-[-0.03em] text-[#282824] transition-colors hover:text-[#9a6a22] sm:text-xl"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 scale-0 rounded-full bg-[#9a6a22] transition-transform duration-200 group-hover/skill:scale-100" aria-hidden="true" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
