"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/components/motion/presets";

/**
 * Re-mounts on every route change, giving each page a short, non-blocking
 * entrance. Opacity + transform only; content is interactive immediately.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <m.div
      data-reveal
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
    >
      {children}
    </m.div>
  );
}
