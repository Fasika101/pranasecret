"use client";

import { AnimatePresence, m } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { EASE_OUT } from "@/components/motion/presets";
import { Arrow, Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/company";
import { VENUES, products } from "@/lib/products";
import { cn } from "@/lib/utils";

const MAX_SCENTS = 3;

/**
 * Sample programme request. There is no backend yet, so on submit we open a
 * pre-filled email to the company address and show a confirmation. Everything
 * works without JavaScript too: the form's native action is the same mailto.
 */
export function SampleRequestForm() {
  const id = useId();
  const params = useSearchParams();
  const preselected = params.get("scent");

  const [chosen, setChosen] = useState<string[]>(() =>
    preselected && products.some((p) => p.slug === preselected) ? [preselected] : [],
  );
  const [state, setState] = useState<"idle" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  function toggle(slug: string) {
    setError(null);
    setChosen((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_SCENTS) return prev;
      return [...prev, slug];
    });
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (chosen.length === 0) {
      setError("Pick at least one scent to sample.");
      return;
    }
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const company = String(data.get("company") ?? "");
    const venue = String(data.get("venue") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const notes = String(data.get("notes") ?? "");
    const scents = chosen.map((s) => products.find((p) => p.slug === s)!.name).join(", ");

    const subject = encodeURIComponent(`Sample request: ${scents}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Company / property: ${company}`,
        `Type of space: ${venue}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Scents to sample: ${scents}`,
        "",
        notes,
      ].join("\n"),
    );
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
    setState("sent");
  }

  const field =
    "min-h-12 w-full rounded-xl border border-ink/12 bg-milk/80 px-4 text-body text-ink outline-none transition-[border-color,box-shadow] placeholder:text-stone/70 focus:border-gold focus:shadow-[0_0_0_3px_rgba(180,140,85,0.18)]";
  const label = "eyebrow mb-2 block text-stone";

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {state === "idle" ? (
          <m.form
            key="form"
            onSubmit={onSubmit}
            action={`mailto:${COMPANY.email}`}
            method="post"
            encType="text/plain"
            className="grid gap-6"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
          >
            <fieldset>
              <legend className={label}>
                Choose up to {MAX_SCENTS} scents{" "}
                <span className="normal-case tracking-normal text-stone/70">
                  ({chosen.length}/{MAX_SCENTS})
                </span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {products.map((p) => {
                  const on = chosen.includes(p.slug);
                  const full = !on && chosen.length >= MAX_SCENTS;
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      aria-pressed={on}
                      disabled={full}
                      onClick={() => toggle(p.slug)}
                      className={cn(
                        "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-small font-medium transition-[background-color,border-color,color,opacity] duration-300",
                        on
                          ? "border-ink bg-ink text-milk"
                          : "border-ink/12 bg-milk/70 text-ink hover:border-ink/40 active:border-ink/40",
                        full && "opacity-40",
                      )}
                    >
                      <span
                        aria-hidden
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: p.palette.accent }}
                      />
                      {p.name}
                    </button>
                  );
                })}
                <input type="hidden" name="scents" value={chosen.join(", ")} />
              </div>
              {error ? (
                <p role="alert" className="mt-3 text-small text-[#b4473a]">
                  {error}
                </p>
              ) : null}
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-name`} className={label}>
                  Your name
                </label>
                <input id={`${id}-name`} name="name" required autoComplete="name" className={field} />
              </div>
              <div>
                <label htmlFor={`${id}-company`} className={label}>
                  Company or property
                </label>
                <input
                  id={`${id}-company`}
                  name="company"
                  required
                  autoComplete="organization"
                  className={field}
                />
              </div>
              <div>
                <label htmlFor={`${id}-email`} className={label}>
                  Email
                </label>
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  className={field}
                />
              </div>
              <div>
                <label htmlFor={`${id}-phone`} className={label}>
                  Phone
                </label>
                <input
                  id={`${id}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className={field}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${id}-venue`} className={label}>
                  Type of space
                </label>
                <select id={`${id}-venue`} name="venue" required defaultValue="" className={field}>
                  <option value="" disabled>
                    Select one
                  </option>
                  {VENUES.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${id}-notes`} className={label}>
                  Anything we should know
                </label>
                <textarea
                  id={`${id}-notes`}
                  name="notes"
                  rows={3}
                  placeholder="Number of rooms, current scenting set-up, delivery city…"
                  className={cn(field, "min-h-28 resize-y py-3")}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit">
                Send request <Arrow />
              </Button>
              <p className="text-small text-stone">Opens your email app with the details filled in.</p>
            </div>
          </m.form>
        ) : (
          <m.div
            key="sent"
            role="status"
            className="glass rounded-3xl p-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <p className="font-display text-h3">Thank you.</p>
            <p className="mt-3 text-cocoa">
              Your email app should now be open with the request. If it is not, write to{" "}
              <a href={`mailto:${COMPANY.email}`} className="link-draw text-ink">
                {COMPANY.email}
              </a>{" "}
              or call{" "}
              <a href={`tel:${COMPANY.phones[0].tel}`} className="link-draw text-ink">
                {COMPANY.phones[0].display}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => setState("idle")}
              className="eyebrow mt-6 text-stone hover:text-ink"
            >
              Send another request
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
