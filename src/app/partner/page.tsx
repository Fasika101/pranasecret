import type { Metadata } from "next";
import { Suspense } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { SampleRequestForm } from "@/components/partner/SampleRequestForm";
import { BUSINESS_CASE, COMPANY, PARTNERSHIP } from "@/lib/company";

export const metadata: Metadata = {
  title: "Partner with us",
  description:
    "Partner with Miracle Self-Care for premium ambient scenting: customised solutions, dedicated account management, product training, flexible payment terms and a free three-scent sample programme.",
  alternates: { canonical: "/partner" },
};

export default function PartnerPage() {
  return (
    <>
      <section aria-labelledby="partner-title" className="container-site pt-32 pb-section lg:pt-40">
        <Reveal>
          <p className="eyebrow mb-4 text-gold-deep">Partnership and supply</p>
        </Reveal>
        <SplitText
          as="h1"
          text="One reliable partner for premium ambiance."
          italic={["reliable"]}
          className="font-display text-h1 max-w-[16ch]"
        />
        <span id="partner-title" className="sr-only">
          One reliable partner for premium ambiance.
        </span>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-prose text-lead font-light text-cocoa">
            Our model is designed for seamless integration and operational support, tailored to
            hotels, malls, spas, offices, clinics and residences across Ethiopia and the U.A.E.
          </p>
        </Reveal>

        <RevealGroup staggerChildren={0.07} amount={0.1} className="mt-flow grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERSHIP.map((p, i) => (
            <RevealItem key={p.title}>
              <article className="glass h-full rounded-3xl p-6 shadow-card">
                <p className="font-display text-small text-gold-deep">0{i + 1}</p>
                <h2 className="mt-5 text-lg font-medium">{p.title}</h2>
                <p className="mt-2 text-small text-cocoa">{p.text}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section aria-labelledby="case-title" className="pb-section">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow mb-4 text-gold-deep">Why it pays</p>
            <h2 id="case-title" className="font-display text-h2 max-w-[18ch]">
              The business case for beautiful air.
            </h2>
          </Reveal>
          <RevealGroup staggerChildren={0.1} className="mt-flow grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {BUSINESS_CASE.map((c) => (
              <RevealItem key={c.title}>
                <p className="font-display text-[clamp(2rem,1.4rem+2.6vw,3.25rem)] leading-none font-medium tracking-[-0.03em] text-gold-deep">
                  {c.stat}
                </p>
                <h3 className="mt-5 font-medium">{c.title}</h3>
                <p className="mt-2 text-small text-cocoa">{c.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section id="samples" aria-labelledby="samples-title" className="scroll-mt-24 pb-section">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="eyebrow mb-4 text-gold-deep">Sample programme</p>
                <h2 id="samples-title" className="font-display text-h2 max-w-[14ch]">
                  Test any three fragrances free.
                </h2>
                <p className="mt-5 max-w-prose text-cocoa">
                  Tell us about your space and we will prepare a sample set with usage guidelines.
                  Pricing is competitive and volume-based, with bulk discounts, subscription refill
                  plans and introductory offers for new partners.
                </p>
              </Reveal>
              <Reveal delay={0.1} className="mt-8">
                <dl className="grid gap-4 text-small">
                  <div>
                    <dt className="eyebrow text-stone">Call</dt>
                    <dd className="mt-1.5 space-y-1">
                      {COMPANY.phones.map((ph) => (
                        <a key={ph.tel} href={`tel:${ph.tel}`} className="block hover:text-gold-deep">
                          {ph.display} <span className="text-stone">{ph.label}</span>
                        </a>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-stone">Email</dt>
                    <dd className="mt-1.5 break-all">
                      <a href={`mailto:${COMPANY.email}`} className="hover:text-gold-deep">
                        {COMPANY.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-stone">Address</dt>
                    <dd className="mt-1.5">
                      {COMPANY.manufacturer}
                      <br />
                      {COMPANY.city}, {COMPANY.country}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
          <Reveal className="lg:col-span-7" delay={0.1} amount={0.05}>
            <div className="rounded-[2rem] border border-ink/8 bg-milk/60 p-6 shadow-card sm:p-8 lg:p-10">
              <Suspense fallback={<div className="min-h-[32rem]" aria-busy="true" />}>
                <SampleRequestForm />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
