"use client";

import Link from "next/link";
import {
  m,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useRef, type PointerEvent } from "react";
import { Arrow, Button } from "@/components/ui/Button";
import { ProductShot } from "@/components/ui/ProductShot";
import { SplitText } from "@/components/motion/SplitText";
import { EASE_OUT } from "@/components/motion/presets";
import { useDeviceCapabilities } from "@/lib/hooks/useDeviceCapabilities";
import { COMPANY, TAGLINE } from "@/lib/company";
import { getProduct, products } from "@/lib/products";

const featured = getProduct("inspiration")!;

const rise = (delay: number, distance = 28, duration = 1.1): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition: { delay, duration, ease: EASE_OUT } },
});

const orchestrate: Variants = { hidden: {}, visible: {} };

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const { allowAmbientMotion, prefersReducedMotion, isMobile } = useDeviceCapabilities();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const visualDrift = useTransform(scrollYProgress, [0, 1], [0, allowAmbientMotion ? 90 : 32]);
  const textDrift = useTransform(scrollYProgress, [0, 1], [0, allowAmbientMotion ? -56 : -20]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 60, damping: 18, mass: 0.7 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-5, 5]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [3, -3]);

  function cacheRect() {
    rectRef.current = sectionRef.current?.getBoundingClientRect() ?? null;
  }
  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (!allowAmbientMotion || e.pointerType === "touch") return;
    const r = rectRef.current ?? sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onPointerLeave() {
    px.set(0);
    py.set(0);
  }

  const still = prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      onPointerEnter={cacheRect}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <m.div
        aria-hidden
        className="aura absolute inset-0 -z-10"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.1 }}
      />

      <m.div
        className="container-site grid min-h-[100svh] grid-cols-1 content-center items-center gap-y-8 pt-20 pb-14 md:gap-y-12 md:pt-24 md:pb-20 lg:grid-cols-12 lg:gap-x-8 lg:pt-32 lg:pb-28"
        variants={orchestrate}
        initial="hidden"
        animate="visible"
      >
        <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:col-start-8">
          <m.div
            style={{ y: still ? 0 : visualDrift, opacity: still ? 1 : fadeOut }}
            className="w-full max-w-[18rem]"
          >
            <m.div
              style={{ rotateX, rotateY, transformPerspective: 1400 }}
              initial={{ y: 28 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.25 }}
            >
              <m.div
                animate={allowAmbientMotion ? { y: [0, -8, 0] } : undefined}
                transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
                className="relative mx-auto aspect-[3/4] w-[clamp(8.5rem,28svh,14rem)] lg:w-[clamp(11rem,min(20vw,40svh),16rem)]"
              >
                <ProductShot
                  product={featured}
                  mist
                  priority
                  sizes="(min-width: 1024px) 20vw, 40vw"
                />
              </m.div>
            </m.div>

            <m.ul
              variants={rise(1.1, 16, 0.9)}
              className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
            >
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="inline-flex items-center gap-2 text-small text-cocoa hover:text-ink"
                  >
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: p.palette.accent }}
                    />
                    {p.name}
                  </Link>
                </li>
              ))}
            </m.ul>
          </m.div>
        </div>

        <m.div
          style={{ y: still ? 0 : textDrift, opacity: still ? 1 : fadeOut }}
          className="order-2 text-center lg:order-1 lg:col-span-7 lg:col-start-1 lg:text-left"
        >
          <m.p variants={rise(0.7, 14, 1)} className="eyebrow mb-5 text-gold-deep">
            Premium air fresheners · {COMPANY.city}
          </m.p>

          <SplitText
            as="h1"
            text={TAGLINE}
            italic={["anywhere."]}
            trigger="parent"
            staggerChildren={isMobile ? 0.09 : 0.08}
            delayChildren={0.8}
            className="font-display text-h1 mx-auto max-w-[14ch] lg:mx-0"
          />
          <span id="hero-title" className="sr-only">
            {TAGLINE}
          </span>

          <m.p
            variants={rise(1.45, 22, 1.1)}
            className="mx-auto mt-5 max-w-[44ch] text-lead font-light text-cocoa md:mt-7 lg:mx-0"
          >
            Prana Secret is a premium collection of air fresheners and ambient perfumes by{" "}
            {COMPANY.shortName}, crafted to turn hotels, spas, offices and homes into havens of
            freshness.
          </m.p>

          <m.div
            variants={rise(1.65, 18, 1)}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 md:mt-9 lg:justify-start"
          >
            <Button href="/products">
              Explore the scents <Arrow />
            </Button>
            <Button href="/partner#samples" variant="outline">
              Request samples
            </Button>
          </m.div>

          <m.ul
            variants={rise(1.9, 12, 1)}
            className="mt-7 hidden flex-wrap justify-center gap-x-6 gap-y-2 text-small text-stone sm:flex md:mt-9 lg:justify-start"
          >
            <li>Up to 48+ hours</li>
            <li>Plant-based · IFRA-compliant</li>
            <li>Since {COMPANY.founded}</li>
          </m.ul>
        </m.div>
      </m.div>

      <m.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3, duration: 1 }}
        className="absolute inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-10 hidden flex-col items-center gap-3 sm:flex"
      >
        <span className="eyebrow text-stone">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-ink/10">
          <span className="motion-safe:animate-cue absolute inset-0 bg-gold" />
        </span>
      </m.div>
    </section>
  );
}
