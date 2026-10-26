import { cn } from "@/lib/utils";

/**
 * Brand wordmark. The labels on the bottles use a script "Prana Secret";
 * on screen we keep it typographic in Ubuntu with a gold spray-dot accent.
 */
export function Wordmark({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  return (
    <span
      className={cn(
        "font-display inline-flex items-baseline gap-2 leading-none tracking-[-0.01em]",
        size === "lg" ? "text-3xl" : "text-[1.3rem] sm:text-2xl",
        className,
      )}
    >
      <span className="font-medium">Prana</span>
      <span className="font-light italic">Secret</span>
      <span aria-hidden className="relative -top-[0.1em] flex items-end gap-[3px]">
        <span className="block h-[0.22em] w-[0.22em] rounded-full bg-gold" />
        <span className="block h-[0.16em] w-[0.16em] rounded-full bg-gold/70" />
        <span className="block h-[0.1em] w-[0.1em] rounded-full bg-gold/45" />
      </span>
    </span>
  );
}
