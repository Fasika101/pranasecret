import type { Metadata } from "next";
import Image from "next/image";
import { MediaReveal } from "@/components/motion/MediaReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ScrollHighlightText } from "@/components/motion/ScrollHighlightText";
import { SplitText } from "@/components/motion/SplitText";
import { Arrow, Button } from "@/components/ui/Button";
import { COMPANY, PHILOSOPHY, QUOTES } from "@/lib/company";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "About Miracle Self-Care",
  description:
    "Founded in 2020 in Addis Ababa, Miracle Self-Care Products Manufacturing is Ethiopia's trusted name in quality cosmetics and cleaning. Prana Secret brings that expertise to fragrance.",
  alternates: { canonical: "/about" },
};

const FACTS = [
  { k: String(COMPANY.founded), v: "Founded in Addis Ababa" },
  { k: "5", v: "Signature scents in the current range" },
  { k: "48+", v: "Hours of freshness per application" },
  { k: "2", v: "Countries served: Ethiopia and the U.A.E." },
] as const;

export default function AboutPage() {
  const attraction = getProduct("attraction")!;
  const lavender = getProduct("lavender")!;

  return (
    <>
      <section aria-labelledby="about-title" className="container-site pt-32 pb-flow lg:pt-40">
        <Reveal>
          <p className="eyebrow mb-4 text-gold-deep">About us</p>
        </Reveal>
        <SplitText
          as="h1"
          text="Ethiopian craftsmanship, global fragrance standards."
          italic={["craftsmanship,"]}
          className="font-display text-h1 max-w-[18ch]"
        />
        <span id="about-title" className="sr-only">
          Ethiopian craftsmanship, global fragrance standards.
        </span>
      </section>

      <section className="container-site grid gap-10 pb-section lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <MediaReveal
            className="aspect-[16/11] rounded-[2rem] bg-sand"
            curtainClassName="bg-cream"
          >
            <Image
              src={attraction.image}
              alt={attraction.alt}
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-contain object-center"
            />
          </MediaReveal>
        </div>
        <div className="lg:col-span-5 lg:pt-6">
          <ScrollHighlightText
            className="text-lead font-light text-ink"
            text={`Founded in ${COMPANY.founded}, ${COMPANY.shortName} has been Ethiopia's trusted name in quality cosmetics and cleaning. Now we bring that expertise to fragrance with Prana Secret. Each scent is crafted to evoke emotion, enhance well-being and leave a lasting impression. We combine Ethiopian craftsmanship with global fragrance standards to deliver luxury that breathes.`}
          />
          <Reveal delay={0.1} className="mt-8">
            <dl className="grid grid-cols-2 gap-6">
              {FACTS.map((f) => (
                <div key={f.v}>
                  <dt className="font-display text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-none font-medium tracking-[-0.03em]">
                    {f.k}
                  </dt>
                  <dd className="mt-2 text-small text-stone">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section id="philosophy" aria-labelledby="philosophy-title" className="scroll-mt-24 pb-section">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow mb-4 text-gold-deep">Our philosophy</p>
            <h2 id="philosophy-title" className="font-display text-h2 max-w-[16ch]">
              {QUOTES[1]}
            </h2>
          </Reveal>
          <RevealGroup staggerChildren={0.1} className="mt-flow grid gap-4 md:grid-cols-3">
            {PHILOSOPHY.map((p, i) => (
              <RevealItem key={p.title}>
                <article className="glass h-full rounded-3xl p-7 shadow-card">
                  <p className="font-display text-small text-gold-deep">0{i + 1}</p>
                  <h3 className="mt-6 text-lg font-medium">{p.title}</h3>
                  <p className="mt-2 text-small text-cocoa">{p.text}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section aria-labelledby="hospitality-title" className="pb-section">
        <div className="container-site grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-4 text-gold-deep">Built for hospitality</p>
              <h2 id="hospitality-title" className="font-display text-h2 max-w-[14ch]">
                Made to five-star housekeeping standards.
              </h2>
              <p className="mt-6 max-w-prose text-cocoa">
                Our high-performance range is designed to support the rigorous housekeeping and
                F&amp;B standards of a five-star property: long-lasting formulas, consistent
                batches, safety data sheets and training for your team.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
              <Button href="/partner">
                Partner with us <Arrow />
              </Button>
              <Button href="/products" variant="outline">
                See the scents
              </Button>
            </Reveal>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <MediaReveal className="mx-auto aspect-[3/4] max-h-[62svh] max-w-[18rem] rounded-[2rem] bg-sand lg:mx-0 lg:max-w-[22rem]" curtainClassName="bg-cream" direction="right">
              <Image
                src={lavender.image}
                alt={lavender.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 22vw, 50vw"
                className="object-contain"
              />
            </MediaReveal>
          </div>
        </div>
      </section>
    </>
  );
}
