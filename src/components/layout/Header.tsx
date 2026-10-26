"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { products } from "@/lib/products";
import { COMPANY } from "@/lib/company";
import { cn } from "@/lib/utils";
import { EASE_IN_OUT, EASE_OUT } from "@/components/motion/presets";
import { Wordmark } from "@/components/ui/Wordmark";

const NAV = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/partner", label: "Partner" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  // Only commit state when the threshold flips, so scrolling never re-renders.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 24;
    if (next !== scrolled) setScrolled(next);
  });

  // Close the menu when the route changes (state adjusted during render, no effect).
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  // Lock scroll and listen for Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Entrance is pure CSS so navigation never depends on JS or on Motion loading. */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-ink transition-[background-color,backdrop-filter,box-shadow] duration-500",
          pathname === "/" ? "motion-safe:animate-header-in-delayed" : "motion-safe:animate-header-in",
          scrolled && !open ? "bg-cream/80 shadow-[0_1px_0_rgba(39,33,29,0.06)] backdrop-blur-md" : "",
        )}
      >
        <nav
          aria-label="Primary"
          className="container-site flex h-[4.5rem] items-center justify-between lg:h-20"
        >
          <Link href="/" aria-label="Prana Secret, home" className="py-2">
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-9 md:flex">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "eyebrow link-draw py-2",
                      active ? "text-ink" : "text-ink/60 hover:text-ink",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/partner#samples"
              className="eyebrow hidden rounded-full bg-ink px-5 py-3 text-milk transition-colors duration-500 hover:bg-gold md:inline-flex"
            >
              Request samples
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="relative -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span
                aria-hidden
                className={cn(
                  "absolute h-[1.5px] w-6 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open ? "rotate-45" : "-translate-y-1",
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "absolute h-[1.5px] w-6 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open ? "-rotate-45" : "translate-y-1",
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <m.div
            id="site-menu"
            key="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-cream text-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
            transition={{ duration: 0.5, ease: EASE_IN_OUT }}
          >
            <div aria-hidden className="aura absolute inset-0" />
            <div className="container-site relative flex flex-1 flex-col justify-end pb-[max(2rem,env(safe-area-inset-bottom))] pt-24">
              <m.ul
                className="flex flex-col gap-1"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
              >
                {[{ href: "/", label: "Home" }, ...NAV].map((item) => (
                  <m.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="font-display block py-2 text-h2 leading-none active:text-gold"
                    >
                      {item.label}
                    </Link>
                  </m.li>
                ))}
              </m.ul>

              <m.div
                className="mt-8 border-t border-ink/10 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <p className="eyebrow mb-4 text-stone">Our scents</p>
                <ul className="flex flex-wrap gap-2">
                  {products.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/products/${p.slug}`}
                        onClick={() => setOpen(false)}
                        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-ink/10 bg-milk/70 px-4 text-small active:bg-ink active:text-milk"
                      >
                        <span
                          aria-hidden
                          className="h-2 w-2 rounded-full"
                          style={{ background: p.palette.accent }}
                        />
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/partner#samples"
                  onClick={() => setOpen(false)}
                  className="eyebrow mt-6 inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-milk active:bg-gold"
                >
                  Request samples
                </Link>
                <p className="mt-6 text-small text-stone">
                  {COMPANY.city}, {COMPANY.country} ·{" "}
                  <a href={`tel:${COMPANY.phones[0].tel}`} className="text-ink">
                    {COMPANY.phones[0].display}
                  </a>
                </p>
              </m.div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
