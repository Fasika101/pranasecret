import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { type Product } from "@/lib/products";

const STEPS = [
  { title: "Shake", text: "Shake the bottle gently so the plant-based oils blend evenly." },
  { title: "Spray", text: "Two to three sprays into the centre of the room, aimed upward." },
  { title: "Breathe", text: "The scent settles within minutes and holds for up to 48+ hours." },
] as const;

/** Scent notes, best-for spaces and how to use, below the product hero. */
export function ProductDetails({ product }: { product: Product }) {
  return (
    <section
      aria-labelledby="details-title"
      className="relative py-section"
      style={{ "--accent": product.palette.accent, "--tint": product.palette.tint } as CSSProperties}
    >
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow mb-4 text-gold-deep">Inside the bottle</p>
            <h2 id="details-title" className="font-display text-h2">
              Scent notes
            </h2>
          </Reveal>
          <RevealGroup staggerChildren={0.08} className="mt-6 flex flex-wrap gap-2">
            {product.notes.map((note, i) => (
              <RevealItem key={note}>
                <span
                  className="inline-flex min-h-10 items-center rounded-full border border-ink/8 px-4 text-small font-medium"
                  style={{
                    background: product.palette.tint,
                    opacity: 1 - i * 0.12,
                  }}
                >
                  {note}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="lg:col-span-4">
          <Reveal delay={0.05}>
            <p className="eyebrow mb-4 text-gold-deep">Best for</p>
            <h2 className="font-display text-h2">Spaces</h2>
          </Reveal>
          <RevealGroup staggerChildren={0.08} className="mt-6 divide-y divide-ink/8 border-y border-ink/8">
            {product.bestFor.map((venue) => (
              <RevealItem key={venue}>
                <Link
                  href="/products#spaces"
                  className="flex items-center justify-between py-4 text-body transition-colors hover:text-[var(--accent)] active:text-[var(--accent)]"
                >
                  <span className="flex items-center gap-3">
                    <span aria-hidden className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                    {venue}
                  </span>
                  <span aria-hidden className="text-stone">
                    →
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="lg:col-span-4">
          <Reveal delay={0.1}>
            <p className="eyebrow mb-4 text-gold-deep">How to use</p>
            <h2 className="font-display text-h2">Three steps</h2>
          </Reveal>
          <RevealGroup staggerChildren={0.1} className="mt-6 grid gap-3">
            {STEPS.map((s, i) => (
              <RevealItem key={s.title}>
                <div className="glass grid grid-cols-[2.5rem_1fr] gap-3 rounded-2xl p-5">
                  <span className="font-display text-h3 leading-none text-[var(--accent)]">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{s.title}</p>
                    <p className="mt-1 text-small text-cocoa">{s.text}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
