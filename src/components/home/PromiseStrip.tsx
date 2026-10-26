import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { PROMISES, QUOTES } from "@/lib/company";

export function PromiseStrip() {
  return (
    <section aria-labelledby="promise-title" className="relative py-section">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow mb-4 text-gold-deep">Our promise</p>
          <h2 id="promise-title" className="font-display text-h2 max-w-[20ch]">
            Elevating every environment with signature scents.
          </h2>
        </Reveal>

        <RevealGroup
          staggerChildren={0.1}
          amount={0.15}
          className="mt-flow grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PROMISES.map((item) => (
            <RevealItem key={item.title}>
              <article className="glass flex h-full flex-col justify-between rounded-3xl p-6 shadow-card lg:p-7">
                <p className="font-display text-[clamp(2rem,1.4rem+2.6vw,3.25rem)] leading-none font-medium tracking-[-0.03em] text-ink">
                  {item.stat}
                </p>
                <p className="eyebrow mt-2 text-stone">{item.statLabel}</p>
                <h3 className="mt-8 text-lg font-medium">{item.title}</h3>
                <p className="mt-2 text-small text-cocoa">{item.text}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-flow" delay={0.1}>
          <blockquote className="mx-auto max-w-prose text-center text-lead font-light text-cocoa italic">
            “{QUOTES[0]}”
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
