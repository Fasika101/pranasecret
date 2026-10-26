"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE_IN_OUT, EASE_OUT, VIEWPORT_ONCE } from "./presets";

interface MediaRevealProps {
  children: ReactNode;
  className?: string;
  /** Curtain color; should match the surrounding section background. */
  curtainClassName?: string;
  /** Direction the curtain retreats toward. */
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

const ORIGIN: Record<NonNullable<MediaRevealProps["direction"]>, string> = {
  up: "top",
  down: "bottom",
  left: "left",
  right: "right",
};

/**
 * Image / media reveal: the media settles from a slight zoom while a solid
 * curtain scales away. Both are transform-only, so no paint or layout cost.
 */
export function MediaReveal({
  children,
  className,
  curtainClassName = "bg-cream",
  direction = "up",
  delay = 0,
}: MediaRevealProps) {
  const vertical = direction === "up" || direction === "down";

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <m.div
        className="relative h-full w-full"
        initial={{ scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 1.6, ease: EASE_OUT, delay }}
      >
        {children}
      </m.div>
      <m.div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0", curtainClassName)}
        style={{ transformOrigin: ORIGIN[direction] }}
        initial={vertical ? { scaleY: 1 } : { scaleX: 1 }}
        whileInView={vertical ? { scaleY: 0 } : { scaleX: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 1.1, ease: EASE_IN_OUT, delay }}
      />
    </div>
  );
}
