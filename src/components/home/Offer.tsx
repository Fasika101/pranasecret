import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { FORMATS, PARTNERSHIP } from "@/lib/company";

/** What we offer: product formats and the partnership model, side by side. */
export function Offer() {
  return (
    <section aria-labelledby="offer-title" className="relative py-section">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow mb-4 text-gold-deep">What we offer</p>
          <h2 id="offer-title" className="font-display text-h2 max-w-[18ch]">
            Every format your property needs, with the support to run it.
          </h2>
        </Reveal>

        <div className="mt-flow grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <h3 className="eyebrow text-stone">Formats</h3>
            </Reveal>
            <RevealGroup staggerChildren={0.08} className="mt-5 divide-y divide-ink/8 border-y border-ink/8">
              {FORMATS.map((f, i) => (
                <RevealItem key={f.name}>
                  <div className="grid grid-cols-[2.5rem_1fr] gap-4 py-5">
                    <span className="font-display text-small text-gold-deep">0{i + 1}</span>
                    <div>
                      <p className="text-lg font-medium">{f.name}</p>
                      <p className="mt-1 text-small text-cocoa">{f.text}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="eyebrow text-stone">Partnership and supply model</h3>
            </Reveal>
            <RevealGroup staggerChildren={0.07} className="mt-5 grid gap-3 sm:grid-cols-2">
              {PARTNERSHIP.map((p) => (
                <RevealItem key={p.title}>
                  <article className="h-full rounded-2xl border border-ink/8 bg-milk/70 p-5">
                    <p className="font-medium">{p.title}</p>
                    <p className="mt-1.5 text-small text-cocoa">{p.text}</p>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
