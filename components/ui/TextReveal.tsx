"use client";

import { motion, useReducedMotion } from "framer-motion";

export function TextReveal({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <span aria-hidden="true" className={className}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: "105%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
