"use client";

import Link from "next/link";
import { m, useScroll, useTransform, type Variants } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { Arrow, Button } from "@/components/ui/Button";
import { ProductShot } from "@/components/ui/ProductShot";
import { SplitText } from "@/components/motion/SplitText";
import { EASE_OUT } from "@/components/motion/presets";
import { useDeviceCapabilities } from "@/lib/hooks/useDeviceCapabilities";
import { FORMAT, type Product } from "@/lib/products";

const rise = (delay: number, y = 24): Variants => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 1, ease: EASE_OUT } },
});

export function ProductHero({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null);
  const { prefersReducedMotion, allowAmbientMotion } = useDeviceCapabilities();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [0, allowAmbientMotion ? 90 : 30]);

  return (
    <section
      ref={ref}
      aria-labelledby="product-title"
      className="relative isolate overflow-hidden"
      style={{ "--accent": product.palette.accent, "--tint": product.palette.tint } as CSSProperties}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[70svh] bg-[radial-gradient(70%_60%_at_70%_30%,var(--tint)_0%,transparent_70%)]"
      />

      <m.div
        className="container-site grid min-h-[100svh] grid-cols-1 content-center items-center gap-y-10 pt-28 pb-16 lg:grid-cols-12 lg:gap-x-10 lg:pt-32 lg:pb-24"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: {} }}
      >
        {/* Render */}
        <m.div variants={rise(0.15, 40)} className="order-1 lg:col-span-6 lg:col-start-7">
          <m.div
            style={{ y: prefersReducedMotion ? 0 : drift }}
            className="relative mx-auto w-[clamp(11rem,38svh,16rem)] lg:mx-0 lg:ml-auto lg:w-[clamp(14rem,min(26vw,52svh),20rem)]"
          >
            <m.div
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.15 }}
              className="relative aspect-[3/4]"
            >
              <ProductShot
                product={product}
                mist
                priority
                sizes="(min-width: 1024px) 22vw, 50vw"
              />
            </m.div>
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] opacity-60 blur-2xl"
              style={{ background: product.palette.glow }}
            />
          </m.div>
        </m.div>

        {/* Copy */}
        <div className="order-2 lg:col-span-6 lg:col-start-1 lg:row-start-1">
          <m.p variants={rise(0.25, 12)} className="eyebrow mb-5 flex items-center gap-3 text-gold-deep">
            <Link href="/products" className="link-draw text-stone hover:text-ink">
              Products
            </Link>
            <span aria-hidden className="text-stone">/</span>
            {product.numeral} · {FORMAT.type}
          </m.p>

          <SplitText
            as="h1"
            text={product.name}
            trigger="parent"
            delayChildren={0.35}
            className="font-display text-h1"
          />
          <span id="product-title" className="sr-only">
            {product.name}
          </span>

          <m.p variants={rise(0.6, 16)} className="mt-3 text-lead font-light text-[var(--accent)]">
            {product.mood}
          </m.p>
          <m.p variants={rise(0.75)} className="mt-6 max-w-[48ch] text-lead font-light text-cocoa">
            {product.tagline}
          </m.p>
          <m.p variants={rise(0.85)} className="mt-4 max-w-prose text-cocoa">
            {product.description}
          </m.p>

          <m.dl
            variants={rise(0.95)}
            className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-ink/8 py-5 text-small sm:grid-cols-3"
          >
            <div>
              <dt className="eyebrow text-stone">Size</dt>
              <dd className="mt-1 font-medium">{FORMAT.size}</dd>
            </div>
            <div>
              <dt className="eyebrow text-stone">Lasts</dt>
              <dd className="mt-1 font-medium">48+ hours</dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="eyebrow text-stone">Formula</dt>
              <dd className="mt-1 font-medium">Plant-based · IFRA</dd>
            </div>
          </m.dl>

          <m.div variants={rise(1.05)} className="mt-8 flex flex-wrap gap-3">
            <Button href={`/partner?scent=${product.slug}#samples`}>
              Request a sample <Arrow />
            </Button>
            <Button href="/partner" variant="outline">
              Bulk pricing
            </Button>
          </m.div>
        </div>
      </m.div>
    </section>
  );
}
