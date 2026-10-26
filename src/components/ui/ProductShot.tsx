import Image from "next/image";
import type { CSSProperties } from "react";
import { SprayMist } from "@/components/motion/SprayMist";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

interface ProductShotProps {
  product: Product;
  /** Responsive `sizes` hint. */
  sizes: string;
  priority?: boolean;
  /** Decorative: omit alt when a parent already names the product. */
  labelled?: boolean;
  /** Rise tiny bubbles from the spray nozzle. */
  mist?: boolean;
  className?: string;
}

/** Full studio render of a bottle, uncropped, sitting on a sand well. */
export function ProductShot({
  product,
  sizes,
  priority = false,
  labelled = true,
  mist = false,
  className,
}: ProductShotProps) {
  return (
    <div
      className={cn("relative h-full w-full", className)}
      style={{ "--accent": product.palette.accent } as CSSProperties}
    >
      <Image
        src={product.image}
        alt={labelled ? product.alt : ""}
        fill
        priority={priority}
        placeholder="blur"
        sizes={sizes}
        className="object-contain object-center"
      />
      {mist ? <SprayMist /> : null}
    </div>
  );
}
