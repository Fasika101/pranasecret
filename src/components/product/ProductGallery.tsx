"use client";

import { AnimatePresence, LazyMotion, m } from "motion/react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { EASE_OUT } from "@/components/motion/presets";
import { VENUES, products, type Venue } from "@/lib/products";
import { useDeviceCapabilities } from "@/lib/hooks/useDeviceCapabilities";
import { cn } from "@/lib/utils";

type Filter = Venue | "All spaces";
const OPTIONS: Filter[] = ["All spaces", ...VENUES];

/** Layout animations need domMax; load it only here, on demand. */
const loadDomMax = () => import("@/components/motion/domMax").then((mod) => mod.default);

export function ProductGallery() {
  const [filter, setFilter] = useState<Filter>("All spaces");
  const { prefersReducedMotion } = useDeviceCapabilities();

  const visible = useMemo(
    () =>
      filter === "All spaces" ? products : products.filter((p) => p.bestFor.includes(filter)),
    [filter],
  );

  return (
    <LazyMotion features={loadDomMax}>
      <div
        role="group"
        aria-label="Filter scents by space"
        className="-mx-gutter flex gap-2 overflow-x-auto px-gutter pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {OPTIONS.map((option) => {
          const active = option === filter;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option)}
              className={cn(
                "relative min-h-11 shrink-0 rounded-full px-4 text-small font-medium whitespace-nowrap transition-colors duration-500",
                active ? "text-milk" : "text-cocoa hover:text-ink active:text-ink",
              )}
            >
              {active ? (
                <m.span
                  layoutId="filter-pill"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.65 }}
                />
              ) : (
                <span aria-hidden className="absolute inset-0 rounded-full border border-ink/12 bg-milk/60" />
              )}
              <span className="relative z-10">{option}</span>
            </button>
          );
        })}
      </div>

      <p className="eyebrow mt-6 text-stone" aria-live="polite">
        {visible.length} {visible.length === 1 ? "scent" : "scents"}
        {filter !== "All spaces" ? ` recommended for ${filter.toLowerCase()}` : ""}
      </p>

      <m.ul layout className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((product, i) => (
            <m.li
              key={product.slug}
              layout={!prefersReducedMotion}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: EASE_OUT, layout: { duration: 0.7, ease: EASE_OUT } }}
            >
              <ProductCard product={product} priority={i < 3} />
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>
    </LazyMotion>
  );
}
