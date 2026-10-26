import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { QUOTES } from "@/lib/company";
import { VENUE_GUIDE, getProduct } from "@/lib/products";

export function Spaces({ id = "spaces" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby="spaces-title" className="relative scroll-mt-24 py-section">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow mb-4 text-gold-deep">Quick-reference venue guide</p>
          <h2 id="spaces-title" className="font-display text-h2 max-w-[18ch]">
            {QUOTES[2]}
          </h2>
          <p className="mt-5 max-w-prose text-lead font-light text-cocoa">
            Perfect for hotels, malls, spas, offices, living rooms, meeting halls, clinics, cafés
            and luxury residences. Start with our suggestion for each space, then tune it with a
            free sample set.
          </p>
        </Reveal>

        <RevealGroup
          staggerChildren={0.06}
          amount={0.1}
          className="mt-flow grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {VENUE_GUIDE.map((entry) => {
            const product = getProduct(entry.product)!;
            return (
              <RevealItem key={entry.venue}>
                <Link
                  href={`/products/${product.slug}`}
                  style={{ "--accent": product.palette.accent, "--tint": product.palette.tint } as CSSProperties}
                  className="group flex min-h-[8.5rem] items-start justify-between gap-4 rounded-2xl border border-ink/8 bg-milk/70 p-5 transition-[background-color,border-color,transform] duration-500 ease-[var(--ease-out-expo)] hover:border-[var(--accent)]/40 hover:bg-[var(--tint)] active:bg-[var(--tint)]"
                >
                  <div>
                    <h3 className="text-lg font-medium">{entry.venue}</h3>
                    <p className="mt-1 text-small text-stone">{entry.note}</p>
                    <p className="mt-4 inline-flex items-center gap-2 text-small font-medium text-ink">
                      <span
                        aria-hidden
                        className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]"
                      />
                      {product.name}
                      <span className="text-stone">· {product.mood.split(" · ")[0]}</span>
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="eyebrow mt-1 text-stone transition-transform duration-500 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
