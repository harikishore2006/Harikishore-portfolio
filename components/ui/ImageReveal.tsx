"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ImageReveal({
  src,
  alt,
  sizes,
  priority = false,
  slideInFromX = 0,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  slideInFromX?: number;
  className?: string;
  imageClassName?: string;
}) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-1.5%", "1.5%"]);

  return (
    <div ref={containerRef} className={className}>
      <motion.div
        initial={
          reduceMotion
            ? false
            : { clipPath: "inset(100% 0 0 0)", x: slideInFromX }
        }
        animate={
          reduceMotion || isInView
            ? { clipPath: "inset(0% 0 0 0)", x: 0 }
            : { clipPath: "inset(100% 0 0 0)", x: slideInFromX }
        }
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <motion.div
          style={reduceMotion ? undefined : { y: parallaxY }}
          className="absolute -inset-y-[2%] inset-x-0"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${imageClassName ?? ""}`}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
