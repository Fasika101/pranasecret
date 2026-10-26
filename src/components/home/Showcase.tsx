import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { Arrow } from "@/components/ui/Button";
import { FORMAT, products } from "@/lib/products";

export function Showcase() {
  return (
    <section aria-labelledby="showcase-title" className="relative py-section">
      <div className="container-site">
        <Reveal>
          <div className="grid items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-4 text-gold-deep">The collection</p>
              <h2 id="showcase-title" className="font-display text-h2 max-w-[18ch]">
                Five scents. One for every space.
              </h2>
            </div>
            <p className="max-w-[38ch] text-small text-stone lg:col-span-4 lg:justify-self-end lg:text-right">
              {FORMAT.type}, {FORMAT.size}. {FORMAT.longevity}. {FORMAT.safety}.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Mobile: native snap row. Large: grid. */}
      <RevealGroup
        staggerChildren={0.1}
        amount={0.1}
        className="snap-row mt-flow lg:container-site lg:grid lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14 lg:overflow-visible"
      >
        {products.map((p, i) => (
          <RevealItem
            key={p.slug}
            className="w-[min(72vw,20rem)] sm:w-[min(44vw,22rem)] lg:w-auto"
          >
            <ProductCard product={p} priority={i < 2} />
          </RevealItem>
        ))}
        <RevealItem className="w-[min(72vw,20rem)] sm:w-[min(44vw,22rem)] lg:w-auto">
          <Link
            href="/partner"
            className="group flex aspect-[4/5] flex-col justify-between rounded-3xl bg-ink p-7 text-milk shadow-soft transition-colors duration-500 hover:bg-cocoa active:bg-cocoa"
          >
            <p className="eyebrow text-milk/60">Signature scent</p>
            <div>
              <h3 className="font-display text-h3 leading-tight">
                A fragrance that becomes uniquely yours.
              </h3>
              <p className="mt-3 text-small text-milk/70">
                From lobby to spa, we help you build one scent identity across every zone.
              </p>
              <span className="eyebrow mt-6 inline-flex items-center gap-3 text-gold">
                Talk to us <Arrow className="group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
