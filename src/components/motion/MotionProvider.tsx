"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { useEffect, type ReactNode } from "react";

/**
 * App-wide motion setup.
 *
 * - `LazyMotion` + `m` components keep the core bundle small (domAnimation
 *   covers animations, gestures, exit transitions and in-view). Layout
 *   animations (`domMax`) are loaded only where needed (collection gallery).
 * - `strict` throws if a full `motion` component slips in, protecting bundle size.
 * - `reducedMotion="user"` makes transform animations instant while keeping
 *   opacity fades for users who prefer reduced motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  // Signals hydration to CSS. Until this class exists, `globals.css` force-reveals
  // any [data-reveal] element after a short delay, so content never depends on
  // JavaScript (or an animation) succeeding.
  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
