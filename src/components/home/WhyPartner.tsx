import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ScrollHighlightText } from "@/components/motion/ScrollHighlightText";
import { Arrow, Button } from "@/components/ui/Button";
import { BUSINESS_CASE } from "@/lib/company";

export function WhyPartner() {
  return (
    <section aria-labelledby="why-title" className="relative py-section">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow mb-4 text-gold-deep">The business case for beautiful air</p>
              <h2 id="why-title" className="font-display text-h2 max-w-[14ch]">
                More than a fragrance. A strategic asset.
              </h2>
            </Reveal>
            <ScrollHighlightText
              className="mt-6 max-w-[40ch] text-lead font-light text-ink"
              text="Prana drives loyalty, comfort and repeat visits. Guests remember how your space felt, and scent is what triggers that memory."
            />
            <Reveal delay={0.1} className="mt-8">
              <Button href="/partner">
                Partner with us <Arrow />
              </Button>
            </Reveal>
          </div>
        </div>

        <RevealGroup
          staggerChildren={0.12}
          amount={0.1}
          className="grid gap-4 sm:grid-cols-2 lg:col-span-7"
        >
          {BUSINESS_CASE.map((item, i) => (
            <RevealItem key={item.title} className={i % 2 === 1 ? "sm:mt-10" : ""}>
              <article className="glass h-full rounded-3xl p-6 shadow-card lg:p-8">
                <p className="font-display text-[clamp(2.25rem,1.6rem+2.8vw,3.5rem)] leading-none font-medium tracking-[-0.03em] text-gold-deep">
                  {item.stat}
                </p>
                <h3 className="mt-6 text-lg font-medium">{item.title}</h3>
                <p className="mt-2 text-small text-cocoa">{item.text}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
