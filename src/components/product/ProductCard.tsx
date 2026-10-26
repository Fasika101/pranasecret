"use client";

import Link from "next/link";
import { m, type Variants } from "motion/react";
import type { CSSProperties, Ref } from "react";
import { EASE_OUT } from "@/components/motion/presets";
import { ProductShot } from "@/components/ui/ProductShot";
import { FORMAT, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

const imageMotion: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.05, y: -6, transition: { duration: 0.9, ease: EASE_OUT } },
  tap: { scale: 0.98, transition: { duration: 0.2 } },
};

const glowMotion: Variants = {
  rest: { opacity: 0, scale: 0.9 },
  hover: { opacity: 1, scale: 1.1, transition: { duration: 1, ease: EASE_OUT } },
};

const cueMotion: Variants = {
  rest: { opacity: 0, y: 6 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

interface ProductCardProps {
  product: Product;
  className?: string;
  /** Responsive `sizes` hint for the image. */
  sizes?: string;
  priority?: boolean;
  ref?: Ref<HTMLElement>;
}

/**
 * Hover (fine pointers): the render lifts and a tinted glow blooms behind it.
 * Touch: Motion ignores touch for hover; `whileTap` gives press feedback and the
 * whole card is one link so a single tap navigates.
 */
export function ProductCard({
  product,
  className,
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw",
  priority = false,
  ref,
}: ProductCardProps) {
  const { palette } = product;

  return (
    <m.article
      ref={ref}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={cn("group relative", className)}
      style={{ "--accent": palette.accent, "--tint": palette.tint } as CSSProperties}
    >
      <Link
        href={`/products/${product.slug}`}
        className="block rounded-3xl outline-offset-4"
        aria-label={`${product.name} air freshener, ${product.mood}`}
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-sand shadow-card">
          <m.div
            aria-hidden
            variants={glowMotion}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(60% 50% at 50% 60%, ${palette.glow} 0%, transparent 70%)`,
            }}
          />
          <m.div variants={imageMotion} className="absolute inset-[4%]">
            <ProductShot product={product} sizes={sizes} priority={priority} />
          </m.div>

          <span className="eyebrow absolute top-4 left-4 rounded-full bg-milk/80 px-3 py-1.5 text-ink/70 backdrop-blur-sm">
            {product.numeral}
          </span>
          <span className="eyebrow absolute top-4 right-4 rounded-full bg-milk/80 px-3 py-1.5 text-ink/70 backdrop-blur-sm">
            {FORMAT.size.split(" · ")[0]}
          </span>

          <m.span
            aria-hidden
            variants={cueMotion}
            className="eyebrow absolute right-4 bottom-4 rounded-full bg-ink px-4 py-2 text-milk"
          >
            View scent →
          </m.span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-h3 leading-none">{product.name}</h3>
            <p className="mt-2 text-small text-stone">{product.mood}</p>
          </div>
          <span
            aria-hidden
            className="mt-1 h-3 w-3 shrink-0 rounded-full"
            style={{ background: palette.accent }}
          />
        </div>
      </Link>
    </m.article>
  );
}
