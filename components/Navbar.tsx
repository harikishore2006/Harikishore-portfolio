"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Expertise", href: "#skills" },
  { label: "Recognition", href: "#achievements" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sections = ["home", ...navItems.map((item) => item.href.slice(1)), "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current?.target instanceof HTMLElement) setActiveSection(current.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0.1, 0.3, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[#f3f3f0]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] items-center justify-between px-5 sm:px-8 lg:px-10 xl:px-14">
        <a href="#home" aria-label="Harikishore K — home" className="group flex items-center gap-3">
          <span className="relative h-8 w-8 overflow-hidden rounded-full border border-black/15">
            <Image src="/images/harikishore-logo.jpeg" alt="" fill sizes="32px" className="object-cover" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#171715] sm:text-sm">
            Harikishore K
          </span>
        </a>

        <div className="hidden text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[#73736c] lg:block">
          AI &amp; Data Science
        </div>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeSection === item.href.slice(1) ? "location" : undefined}
              className={`text-[0.62rem] font-medium uppercase tracking-[0.13em] transition-colors hover:text-[#9a6a22] ${activeSection === item.href.slice(1) ? "text-[#9a6a22]" : "text-[#565650]"}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden xl:block">
          <MagneticLink
            href="#contact"
            className="group inline-flex items-center gap-2 border-b border-[#171715] pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#171715] hover:border-[#9a6a22] hover:text-[#9a6a22]"
          >
            Contact <span className="transition-transform group-hover:translate-x-1">↗</span>
          </MagneticLink>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
          className="relative z-50 flex h-11 w-11 items-center justify-center border border-black/15 text-[#171715] xl:hidden"
        >
          {isOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={reduceMotion ? undefined : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#f3f3f0] px-7 pt-20 xl:hidden sm:px-12"
          >
            <nav aria-label="Mobile navigation" className="mx-auto flex w-full max-w-3xl flex-col">
              {[...navItems, { label: "Contact", href: "#contact" }].map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.06 }}
                  className="flex items-center justify-between border-b border-black/15 py-4 text-3xl font-medium tracking-[-0.06em] text-[#171715] transition-colors hover:text-[#9a6a22] sm:text-5xl"
                >
                  {item.label}
                  <span className="text-base">↗</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <ScrollProgress />
    </header>
  );
}
