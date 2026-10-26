import Link from "next/link";
import { products } from "@/lib/products";
import { COMPANY, TAGLINE } from "@/lib/company";
import { Reveal } from "@/components/motion/Reveal";
import { Wordmark } from "@/components/ui/Wordmark";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/8 bg-sand/70 text-ink backdrop-blur-sm">
      <div className="container-site pt-flow pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <Wordmark />
            <p className="mt-4 max-w-xs text-small text-stone">
              Premium air fresheners and ambient perfumes by {COMPANY.manufacturer}. {TAGLINE}
            </p>
            <Link
              href="/partner#samples"
              className="eyebrow mt-8 inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-milk transition-colors hover:bg-gold"
            >
              Test three scents free
            </Link>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3 lg:col-span-8"
          >
            <div>
              <p className="eyebrow mb-4 text-stone">Products</p>
              <ul className="space-y-2.5">
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      className="link-draw text-small text-cocoa hover:text-ink"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/products" className="link-draw text-small text-gold-deep">
                    All products
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4 text-stone">Company</p>
              <ul className="space-y-2.5">
                {[
                  { href: "/about", label: "About Miracle Self-Care" },
                  { href: "/about#philosophy", label: "Our philosophy" },
                  { href: "/partner", label: "Partner with us" },
                  { href: "/partner#samples", label: "Sample programme" },
                  { href: "/products#spaces", label: "Scents by space" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="link-draw text-small text-cocoa hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="eyebrow mb-4 text-stone">Contact</p>
              <ul className="space-y-2.5 text-small text-cocoa">
                <li>
                  {COMPANY.city}, {COMPANY.country}
                </li>
                {COMPANY.phones.map((ph) => (
                  <li key={ph.tel}>
                    <a href={`tel:${ph.tel}`} className="link-draw hover:text-ink">
                      {ph.display}
                    </a>
                    <span className="ml-2 text-stone">{ph.label}</span>
                  </li>
                ))}
                <li className="pt-2 break-all">
                  <a href={`mailto:${COMPANY.email}`} className="link-draw hover:text-ink">
                    {COMPANY.email}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <Reveal className="mt-flow" y={40} amount={0.1}>
          <p
            aria-hidden
            className="font-display select-none text-display leading-none font-bold tracking-[-0.03em] text-ink/[0.05]"
          >
            Prana Secret
          </p>
        </Reveal>

        <div className="mt-8 flex flex-col gap-3 border-t border-ink/8 pt-6 text-[0.7rem] tracking-[0.12em] text-stone uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {COMPANY.manufacturer}. All rights reserved.
          </p>
          <p>Made in {COMPANY.city} · Since {COMPANY.founded}</p>
        </div>
      </div>
    </footer>
  );
}
