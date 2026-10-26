"use client";

import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { useDeviceCapabilities } from "@/lib/hooks/useDeviceCapabilities";
import { cn } from "@/lib/utils";

interface ScrollHighlightTextProps {
  text: string;
  className?: string;
}

/**
 * Editorial scroll-linked paragraph: words shift from dim to full as the
 * block travels through the viewport. Opacity-only; progress is a MotionValue
 * so there are no React re-renders on scroll.
 *
 * The DOM structure is identical with and without reduced motion (only the
 * opacity source changes), which keeps server and client markup in sync.
 */
export function ScrollHighlightText({ text, className }: ScrollHighlightTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { prefersReducedMotion } = useDeviceCapabilities();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} aria-label={text} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          still={prefersReducedMotion}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  still,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span aria-hidden className="relative mr-[0.28em]">
      <span className="absolute inset-0 opacity-15">{children}</span>
      <m.span style={{ opacity: still ? 1 : opacity }}>{children}</m.span>
    </span>
  );
}
