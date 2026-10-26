import type { Variants } from "motion/react";

export type Bezier = [number, number, number, number];

/** Editorial easing: fast start, long, soft settle. */
export const EASE_OUT: Bezier = [0.16, 1, 0.3, 1];
/** Symmetric easing for curtains / masks. */
export const EASE_IN_OUT: Bezier = [0.76, 0, 0.24, 1];

export const DURATION = {
  fast: 0.45,
  base: 0.9,
  slow: 1.3,
  cinematic: 1.8,
} as const;

/** Default in-view settings: trigger once, slightly before fully visible. */
export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -8% 0px",
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: "easeOut" },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

/** Parent orchestrator for staggered children. */
export function stagger(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}

/** Word mask reveal: used by SplitText. */
export const wordReveal: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: 1.1, ease: EASE_OUT },
  },
};
