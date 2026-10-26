"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE_OUT, VIEWPORT_ONCE, fadeUp, stagger } from "./presets";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  duration?: number;
  amount?: number;
}

/**
 * Single element fade + rise when it enters the viewport.
 * Transform/opacity only; triggers once.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  duration = DURATION.base,
  amount = VIEWPORT_ONCE.amount,
}: RevealProps) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ ...VIEWPORT_ONCE, amount }}
      transition={{ duration, ease: EASE_OUT, delay }}
    >
      {children}
    </m.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  amount?: number;
}

/** Parent that staggers any `RevealItem` children as a group. */
export function RevealGroup({
  children,
  className,
  staggerChildren = 0.09,
  delayChildren = 0,
  amount = VIEWPORT_ONCE.amount,
}: RevealGroupProps) {
  return (
    <m.div
      className={className}
      variants={stagger(staggerChildren, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...VIEWPORT_ONCE, amount }}
    >
      {children}
    </m.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.div data-reveal className={className} variants={fadeUp}>
      {children}
    </m.div>
  );
}
