import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";
/** "dark" = dark button for light backgrounds (default). "light" = for dark panels. */
type Tone = "light" | "dark";

const base =
  "group/btn relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-7 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-[transform,color,border-color,background-color] duration-500 ease-[var(--ease-out-expo)] active:scale-[0.97] select-none touch-manipulation";

const variants: Record<Tone, Record<Variant, string>> = {
  dark: {
    solid:
      "bg-ink text-milk hover:text-milk [&>span.fill]:bg-gold hover:[&>span.fill]:translate-y-0",
    outline:
      "border border-ink/25 text-ink hover:border-ink hover:text-milk [&>span.fill]:bg-ink hover:[&>span.fill]:translate-y-0",
    ghost: "text-ink/80 hover:text-ink px-0 min-h-0 rounded-none",
  },
  light: {
    solid:
      "bg-milk text-ink hover:text-milk [&>span.fill]:bg-gold hover:[&>span.fill]:translate-y-0",
    outline:
      "border border-milk/40 text-milk hover:border-milk hover:text-ink [&>span.fill]:bg-milk hover:[&>span.fill]:translate-y-0",
    ghost: "text-milk/80 hover:text-milk px-0 min-h-0 rounded-none",
  },
};

interface CommonProps {
  variant?: Variant;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/**
 * Pill button with a transform-only fill sweep on hover-capable devices and a
 * scale press on tap. Renders a Next Link when `href` is provided.
 */
export function Button(props: ButtonProps) {
  const { variant = "solid", tone = "dark", className, children, ...rest } = props;
  const classes = cn(base, variants[tone][variant], className);

  const inner = (
    <>
      {variant !== "ghost" ? (
        <span
          aria-hidden
          className="fill pointer-events-none absolute inset-0 translate-y-full rounded-full transition-transform duration-600 ease-[var(--ease-out-expo)]"
        />
      ) : null}
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...linkRest } = rest;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {inner}
      </Link>
    );
  }

  const { href: _unused, ...buttonRest } = rest;
  void _unused;
  return (
    <button type="button" className={classes} {...buttonRest}>
      {inner}
    </button>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={cn(
        "h-3.5 w-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-1",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
