import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const DOTS = 12;

/**
 * Tiny CSS bubbles that rise from a spray nozzle. Opacity + transform only.
 * Hidden automatically under prefers-reduced-motion.
 */
export function SprayMist({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("spray-mist", className)}>
      {Array.from({ length: DOTS }, (_, i) => (
        <span key={i} style={{ "--i": i } as CSSProperties} />
      ))}
    </span>
  );
}
