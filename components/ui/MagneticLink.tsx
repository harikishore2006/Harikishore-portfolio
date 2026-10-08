"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

type MagneticLinkProps = Omit<
  HTMLMotionProps<"a">,
  "animate" | "style" | "onPointerMove" | "onPointerLeave"
> & {
  children: ReactNode;
  strength?: number;
  onPointerMove?: (event: PointerEvent<HTMLAnchorElement>) => void;
  onPointerLeave?: (event: PointerEvent<HTMLAnchorElement>) => void;
};

export function MagneticLink({
  children,
  strength = 7,
  onPointerMove,
  onPointerLeave,
  ...props
}: MagneticLinkProps) {
  const reduceMotion = useReducedMotion();
  const xValue = useMotionValue(0);
  const yValue = useMotionValue(0);
  const x = useSpring(xValue, { stiffness: 220, damping: 20, mass: 0.35 });
  const y = useSpring(yValue, { stiffness: 220, damping: 20, mass: 0.35 });

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    onPointerMove?.(event);
    if (reduceMotion || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    xValue.set(((event.clientX - bounds.left) / bounds.width - 0.5) * strength);
    yValue.set(((event.clientY - bounds.top) / bounds.height - 0.5) * strength);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLAnchorElement>) => {
    onPointerLeave?.(event);
    xValue.set(0);
    yValue.set(0);
  };

  return (
    <motion.a
      {...props}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x, y }}
    >
      {children}
    </motion.a>
  );
}
