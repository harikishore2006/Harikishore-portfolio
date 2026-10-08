"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRightIcon } from "@/components/ui/icons";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { projects } from "@/data/projects";

const projectStyles = [
  {
    background: "bg-[#182633]",
    accent: "text-[#e7a847]",
    glow: "bg-[#e7a847]/15",
    tag: "border-white/15 bg-white/5 text-white/75",
    tagHover: "hover:border-[#e7a847]/70 hover:bg-[#e7a847]/15",
    accentLine: "bg-[#e7a847]",
    link: "text-white hover:border-[#e7a847] hover:text-[#e7a847]",
  },
  {
    background: "bg-[#19302d]",
    accent: "text-[#79c9b2]",
    glow: "bg-[#65c4a8]/15",
    tag: "border-white/15 bg-white/5 text-white/75",
    tagHover: "hover:border-[#79c9b2]/70 hover:bg-[#79c9b2]/15",
    accentLine: "bg-[#79c9b2]",
    link: "text-white hover:border-[#79c9b2] hover:text-[#79c9b2]",
  },
  {
    background: "bg-[#282238]",
    accent: "text-[#c4a8f0]",
    glow: "bg-[#a88be7]/15",
    tag: "border-white/15 bg-white/5 text-white/75",
    tagHover: "hover:border-[#c4a8f0]/70 hover:bg-[#c4a8f0]/15",
    accentLine: "bg-[#c4a8f0]",
    link: "text-white hover:border-[#c4a8f0] hover:text-[#c4a8f0]",
  },
];

const projectTextVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function Projects() {
  const reduceMotion = useReducedMotion();
  const textVariants = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : projectTextVariants;

  return (
    <Section id="projects" className="border-y border-black/10 bg-[#e9e9e4] px-5 sm:px-8 lg:px-10 xl:px-14">
      <SectionHeading
        eyebrow="01 / PROJECTS"
        title="Projects."
        description="A few projects exploring the intersection of AI, data, and practical technology."
      />

      <div className="space-y-16 md:space-y-24">
        {projects.map((project, index) => {
          const imageFirst = index % 2 === 0;
          const projectLink = project.github ?? "#contact";
          const linkLabel = project.github ? "View project" : "Discuss project";
          const style = projectStyles[index % projectStyles.length];

          return (
            <motion.article
              key={project.id}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduceMotion ? undefined : { y: -5 }}
              className={`group relative isolate grid min-w-0 items-center gap-7 overflow-hidden border border-white/10 px-5 py-6 shadow-[0_8px_24px_rgba(10,14,18,0.1)] transition-[box-shadow,border-color] duration-500 hover:border-white/25 hover:shadow-[0_22px_50px_rgba(10,14,18,0.25)] md:grid-cols-2 md:gap-10 md:px-7 md:py-8 lg:gap-16 ${style.background}`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100 ${style.accentLine}`}
              />
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${style.accentLine}`}
              />
              {!reduceMotion ? (
                <>
                  <motion.span
                    aria-hidden="true"
                    animate={{
                      x: [0, index % 2 === 0 ? 26 : -22, 0],
                      y: [0, index % 2 === 0 ? -18 : 16, 0],
                      opacity: [0.45, 0.85, 0.45],
                    }}
                    transition={{
                      duration: 11 + index * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`pointer-events-none absolute -right-14 -top-20 z-0 h-64 w-64 rounded-full blur-3xl ${style.glow}`}
                  />
                  <motion.span
                    aria-hidden="true"
                    animate={{
                      x: [0, index % 2 === 0 ? -18 : 22, 0],
                      y: [0, index % 2 === 0 ? 14 : -12, 0],
                      opacity: [0.2, 0.55, 0.2],
                    }}
                    transition={{
                      duration: 15 + index * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`pointer-events-none absolute -bottom-28 -left-16 z-0 h-56 w-56 rounded-full blur-3xl ${style.glow}`}
                  />
                </>
              ) : null}
              <div className={`group/image relative z-10 ${imageFirst ? "md:order-1" : "md:order-2"}`}>
                <ImageReveal
                  src={project.image}
                  alt={`${project.title} project preview`}
                  sizes="(max-width: 767px) 92vw, 48vw"
                  className={`relative ${project.imageAspectRatio === "cinematic" ? "aspect-[1.91]" : project.imageAspectRatio === "wide" ? "aspect-[16/9]" : "aspect-[1.48]"} overflow-hidden bg-[#171715]`}
                  imageClassName="object-cover"
                />
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 border border-white/0 transition-[border-color,box-shadow] duration-500 group-hover/image:border-white/35 group-hover/image:shadow-[inset_0_0_36px_rgba(255,255,255,0.08)]`}
                />
              </div>

              <motion.div
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: reduceMotion ? 0 : 0.075,
                      delayChildren: reduceMotion ? 0 : 0.12,
                    },
                  },
                }}
                className={`relative z-10 min-w-0 ${imageFirst ? "md:order-2 md:pl-2" : "md:order-1 md:pr-2"}`}
              >
                <motion.div
                  variants={textVariants}
                  className="mb-5 flex flex-wrap items-center justify-between gap-3"
                >
                  <span className={`text-xs font-semibold uppercase tracking-[0.18em] ${style.accent}`}>
                    Project {project.number ?? String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`border px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.14em] ${style.tag}`}>
                    {project.category}
                  </span>
                </motion.div>
                <motion.h3
                  variants={textVariants}
                  className="text-3xl font-semibold uppercase leading-[0.98] tracking-[-0.06em] text-[#f3f3f0] transition-transform duration-500 group-hover:translate-x-1 sm:text-4xl lg:text-5xl"
                >
                  {project.shortTitle}
                </motion.h3>
                <motion.p
                  variants={textVariants}
                  className="mt-5 max-w-xl text-base leading-7 text-white/70"
                >
                  {project.description}
                </motion.p>

                <motion.div
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: reduceMotion ? 0 : 0.035 },
                    },
                  }}
                  className="mt-6 flex flex-wrap gap-x-2 gap-y-2"
                >
                  {project.technologies.map((technology) => (
                    <motion.span
                      key={technology}
                      variants={textVariants}
                      whileHover={reduceMotion ? undefined : { y: -2 }}
                      className={`border px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.11em] transition-colors duration-300 ${style.tag} ${style.tagHover}`}
                    >
                      {technology}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.a
                  variants={textVariants}
                  href={projectLink}
                  target={project.github ? "_blank" : undefined}
                  rel={project.github ? "noopener noreferrer" : undefined}
                  className={`group/link mt-7 inline-flex items-center gap-3 border-b border-white/30 pb-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${style.link}`}
                >
                  {linkLabel}
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                </motion.a>
              </motion.div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
