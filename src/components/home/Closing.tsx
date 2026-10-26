import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Arrow, Button } from "@/components/ui/Button";
import { COMPANY, QUOTES } from "@/lib/company";

/** Dark closing panel on the light page: the one place we invert for contrast. */
export function Closing() {
  return (
    <section aria-labelledby="closing-title" className="relative pb-section">
      <div className="container-site">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-milk shadow-soft sm:px-12 lg:px-20 lg:py-24">
          <div
            aria-hidden
            className="aura absolute inset-0 -z-10 opacity-80 [--aura-a:rgba(180,140,85,0.35)] [--aura-b:rgba(207,79,124,0.22)]"
          />
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <p className="eyebrow mb-5 text-gold">Sample programme</p>
              </Reveal>
              <SplitText
                as="h2"
                text="Test any three fragrances free before committing."
                italic={["free"]}
                className="font-display text-h1 max-w-[16ch]"
              />
              <span id="closing-title" className="sr-only">
                Test any three fragrances free before committing.
              </span>
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-[48ch] text-lead font-light text-milk/75">
                  “{QUOTES[1]}” Tell us about your space and we will send a tailored sample set with
                  usage guidelines.
                </p>
              </Reveal>
              <Reveal delay={0.3} className="mt-9 flex flex-wrap gap-3">
                <Button href="/partner#samples" tone="light">
                  Request samples <Arrow />
                </Button>
                <Button href={`mailto:${COMPANY.email}`} tone="light" variant="outline">
                  Email us
                </Button>
              </Reveal>
            </div>
            <Reveal delay={0.35} className="lg:col-span-4">
              <dl className="grid gap-5 border-t border-milk/15 pt-6 text-small lg:border-t-0 lg:pt-0">
                <div>
                  <dt className="eyebrow text-milk/50">Call</dt>
                  <dd className="mt-2 space-y-1">
                    {COMPANY.phones.map((ph) => (
                      <a key={ph.tel} href={`tel:${ph.tel}`} className="block hover:text-gold">
                        {ph.display} <span className="text-milk/45">{ph.label}</span>
                      </a>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-milk/50">Write</dt>
                  <dd className="mt-2 break-all">
                    <a href={`mailto:${COMPANY.email}`} className="hover:text-gold">
                      {COMPANY.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-milk/50">Visit</dt>
                  <dd className="mt-2">
                    {COMPANY.city}, {COMPANY.country}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
