"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { InteractiveDNA } from "@/components/InteractiveDNA";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { TextReveal } from "@/components/ui/TextReveal";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate mx-auto grid min-h-[calc(100svh-72px)] max-w-none items-center gap-10 overflow-hidden bg-[#090c14] px-5 pb-16 pt-28 text-[#f3f3f0] sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12 lg:px-10 lg:py-24 xl:px-14"
    >
      <InteractiveDNA />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_18%_35%,rgba(51,91,151,0.13),transparent_48%),radial-gradient(ellipse_at_78%_68%,rgba(102,65,148,0.12),transparent_45%),linear-gradient(90deg,rgba(9,12,20,0.3),transparent_55%,rgba(9,12,20,0.12))]"
      />
      <div className="relative z-10 min-w-0">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#9a6a22]"
        >
          AI &amp; Data Science
        </motion.p>
        <h1
          aria-label="Building intelligent digital experiences"
          className="max-w-4xl text-[clamp(2.1rem,4.8vw,5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.075em] text-[#f3f3f0]"
        >
          <TextReveal lines={["Building", "Intelligent", "Digital Experiences"]} />
        </h1>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg"
        >
          I&apos;m Harikishore K, an Artificial Intelligence and Data Science student focused on building intelligent systems, data-driven applications, and modern digital experiences.
        </motion.p>

        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
          <MagneticLink
            href="#projects"
            className="group inline-flex items-center gap-3 border-b border-white/65 pb-2 text-sm font-semibold uppercase tracking-[0.1em] text-[#f3f3f0] transition-colors hover:border-[#67e8f9] hover:text-[#a5f3fc]"
          >
            View my work
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </MagneticLink>
        </div>

        <div className="mt-9">
          <SocialLinks tone="dark" />
        </div>

        <div className="mt-8 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-white/50">
          <span>Final-year B.Tech AI &amp; DS, Thiruvarur, Tamil Nadu</span>
        </div>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="group relative z-10 mx-auto w-[88%] max-w-[24rem] lg:ml-auto"
      >
        <ImageReveal
          src="/images/harikishore-photo.png"
          alt="Portrait of Harikishore K"
          sizes="(max-width: 1023px) 90vw, 42vw"
          priority
          slideInFromX={-44}
          className="relative aspect-[4/4.6] overflow-hidden bg-[#deded8]"
          imageClassName="object-[center_24%]"
        />
        <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-3 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white/55">
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.9, ease: "easeOut" }}
            className="group/name relative text-white"
          >
            Harikishore K
            <motion.span
              aria-hidden="true"
              initial={reduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, delay: 1.2, ease: "easeOut" }}
              className="absolute -bottom-1 left-0 h-px w-full origin-left bg-[#67e8f9]"
            />
          </motion.span>
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 1.05, ease: "easeOut" }}
          >
            AI · Data
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
