"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { achievements } from "@/data/achievements";

const certificationCourses = [
  { name: "Machine Learning with AI Applications", file: "machine-learning-ai-applications.jpg" },
];

const courseCardColors = [
  "border-[#dfc181] bg-[#f2e8d2] hover:bg-[#eee0c1]",
  "border-[#b6d2c6] bg-[#e2eee8] hover:bg-[#d6e8df]",
  "border-[#c9bfdf] bg-[#ebe7f3] hover:bg-[#e1dbed]",
  "border-[#b7cde0] bg-[#e3edf5] hover:bg-[#d8e7f2]",
  "border-[#dfc0b8] bg-[#f2e5e0] hover:bg-[#eddad2]",
];

const recognitionRowColors = [
  "border-[#d8b56b] bg-[#f7f1e4] hover:bg-[#f2e8d2]",
  "border-[#8fb7a5] bg-[#edf4f0] hover:bg-[#e2eee8]",
  "border-[#b0a2ce] bg-[#f0edf6] hover:bg-[#ebe7f3]",
  "border-[#89aeca] bg-[#edf3f8] hover:bg-[#e3edf5]",
  "border-[#c99b8e] bg-[#f6eeeb] hover:bg-[#f2e5e0]",
];

export function Achievements() {
  const reduceMotion = useReducedMotion();
  const [openCertificates, setOpenCertificates] = useState<string | null>(null);

  return (
    <Section id="achievements" className="px-5 sm:px-8 lg:px-10 xl:px-14">
      <SectionHeading
        eyebrow="05 / RECOGNITION"
        title="Recognition, research, and continued learning."
        description="A record of teamwork, technical curiosity, and participation in the wider student community."
      />

      <ol className="divide-y divide-black/15 border-y border-black/15">
        {achievements.map((achievement, index) => (
          <motion.li
            key={achievement.title}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: index * 0.035 }}
            className={`relative mx-[-0.5rem] grid gap-2 border-l-2 px-3 py-3 transition-colors duration-300 sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:gap-6 ${
              openCertificates === achievement.title ? "z-20" : ""
            } ${recognitionRowColors[index % recognitionRowColors.length]}`}
          >
            <span className="text-xs font-semibold tabular-nums text-[#9a6a22]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-semibold tracking-[-0.035em] text-[#171715] sm:text-2xl">
              {achievement.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:justify-end">
              {!achievement.certificates?.length ? (
                <p className="text-sm text-[#65655f] sm:text-right">{achievement.description}</p>
              ) : null}
              {achievement.certificates?.length ? (
                <div
                  className="relative"
                  onMouseLeave={() => {
                    setOpenCertificates((current) =>
                      current === achievement.title ? null : current,
                    );
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") setOpenCertificates(null);
                  }}
                >
                  <motion.button
                    type="button"
                    aria-expanded={openCertificates === achievement.title}
                    aria-controls={`certificates-${index}`}
                    onClick={() =>
                      setOpenCertificates((current) =>
                        current === achievement.title ? null : achievement.title,
                      )
                    }
                    whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                    className="group/view relative flex min-w-24 items-center justify-center gap-2 overflow-hidden rounded-full border border-[#171715] bg-[#171715] px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[#f3f3f0] shadow-[0_3px_10px_rgba(23,23,21,0.12)] transition-colors duration-300 hover:border-[#e7a847] hover:bg-[#e7a847] hover:text-[#171715] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a6a22]"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 transition-transform duration-500 group-hover/view:translate-x-[450%]"
                    />
                    <span className="relative">View</span>
                    <span
                      aria-hidden="true"
                      className={`relative transition-transform duration-300 ${
                        openCertificates === achievement.title
                          ? "rotate-45"
                          : "group-hover/view:translate-x-0.5 group-hover/view:-translate-y-0.5"
                      }`}
                    >
                      {openCertificates === achievement.title ? "+" : "↗"}
                    </span>
                  </motion.button>
                  <AnimatePresence>
                    {openCertificates === achievement.title ? (
                      <motion.div
                        id={`certificates-${index}`}
                        initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: reduceMotion ? 0 : 0.2 }}
                        className="absolute right-0 top-full z-30 grid w-64 max-w-[calc(100vw-2.5rem)] gap-2 border border-[#d8c69f] bg-[#fbf8f0] p-3 shadow-[0_16px_40px_rgba(23,23,21,0.18)]"
                      >
                        {achievement.certificates.map((certificate, certificateIndex) => (
                          <motion.div
                            key={certificate.file}
                            initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: reduceMotion ? 0 : 0.18,
                              delay: reduceMotion ? 0 : certificateIndex * 0.035,
                            }}
                            className="flex items-center justify-between gap-4 border-b border-[#171715]/10 py-2 last:border-0 last:pb-1"
                          >
                            <span className="text-xs font-medium text-[#565650]">
                              {certificate.name}
                            </span>
                            <a
                              href={`/certificates/${certificate.file}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${certificate.name} certificate in a new tab`}
                              className="shrink-0 rounded-full bg-[#e7a847]/25 px-2.5 py-1.5 text-[0.52rem] font-semibold uppercase tracking-[0.08em] text-[#5d421b] transition-colors hover:bg-[#e7a847] hover:text-[#171715] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a6a22]"
                            >
                              View certificate
                            </a>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              ) : null}
            </div>
          </motion.li>
        ))}
      </ol>

      <div className="mt-16">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#9a6a22]">
              Continued learning
            </p>
            <h3 className="text-2xl font-semibold tracking-[-0.045em] text-[#171715] sm:text-3xl">
              Certification courses
            </h3>
          </div>
          <span className="text-[0.62rem] font-medium uppercase tracking-[0.14em] text-[#73736c]">
            {String(certificationCourses.length).padStart(2, "0")} certificates
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {certificationCourses.map((course, index) => (
            <motion.a
              key={course.file}
              href={`/certificates/${course.file}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${course.name} certificate in a new tab`}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 240, damping: 20, delay: index * 0.07 }
              }
              whileHover={reduceMotion ? undefined : { y: -5, scale: 1.015 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              className={`group relative isolate flex min-h-28 flex-col justify-between overflow-hidden border p-5 shadow-[0_2px_8px_rgba(23,23,21,0.025)] transition-[background-color,border-color,box-shadow] duration-300 hover:border-[#9a6a22]/50 hover:shadow-[0_14px_30px_rgba(23,23,21,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a6a22] ${courseCardColors[index % courseCardColors.length]}`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-10 -z-10 h-28 w-28 rounded-full bg-white/35 blur-2xl transition-transform duration-500 group-hover:scale-150"
              />
              <span className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[#929188]">
                Course certificate · {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-5 flex items-center justify-between gap-3 text-lg font-semibold tracking-[-0.035em] text-[#171715]">
                {course.name}
                <span aria-hidden="true" className="shrink-0 text-[#9a6a22] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  ↗
                </span>
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-[#9a6a22] transition-transform duration-300 group-hover:scale-x-100"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
}
