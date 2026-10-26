"use client";

import { m } from "motion/react";
import { cn } from "@/lib/utils";
import { VIEWPORT_ONCE, stagger, wordReveal } from "./presets";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "blockquote";

interface SplitTextProps {
  text: string;
  as?: Tag;
  className?: string;
  /**
   * "inView" (default) animates when scrolled into view.
   * "parent" inherits variants from an orchestrating parent (e.g. the hero).
   */
  trigger?: "inView" | "parent";
  staggerChildren?: number;
  delayChildren?: number;
  /** Words to render in italic display style. Matches case-insensitively. */
  italic?: string[];
}

/**
 * Word-level masked reveal. Each word slides up from behind an overflow clip.
 * The full string is exposed to assistive tech via aria-label.
 */
export function SplitText({
  text,
  as = "p",
  className,
  trigger = "inView",
  staggerChildren = 0.06,
  delayChildren = 0,
  italic = [],
}: SplitTextProps) {
  const Component = m[as] as typeof m.p;
  const words = text.split(" ");
  const italicSet = new Set(italic.map((w) => w.toLowerCase()));

  const triggerProps =
    trigger === "inView"
      ? { initial: "hidden", whileInView: "visible", viewport: VIEWPORT_ONCE }
      : {};

  return (
    <Component
      aria-label={text}
      className={className}
      variants={stagger(staggerChildren, delayChildren)}
      {...triggerProps}
    >
      {words.map((word, i) => {
        const clean = word.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();
        return (
          <span
            key={`${word}-${i}`}
            aria-hidden
            className="inline-block overflow-hidden align-bottom [padding:0.12em_0.08em_0.16em] [margin:-0.12em_-0.08em_-0.16em]"
          >
            <m.span
              data-reveal
              className={cn("inline-block", italicSet.has(clean) && "italic")}
              variants={wordReveal}
            >
              {word}
            </m.span>
            {i < words.length - 1 ? "\u00A0" : null}
          </span>
        );
      })}
    </Component>
  );
}
