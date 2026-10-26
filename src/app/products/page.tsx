import type { Metadata } from "next";
import { Spaces } from "@/components/home/Spaces";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { ProductGallery } from "@/components/product/ProductGallery";
import { FORMAT } from "@/lib/products";


export const metadata: Metadata = {
  title: "Products",
  description:
    "Five Prana Secret air freshener sprays: Lavender, Obsession, Attraction, Inspiration and Temptation. 230 ml, up to 48+ hours, plant-based and IFRA-compliant. Filter by the space you want to scent.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <section aria-labelledby="products-title" className="container-site pt-32 pb-section lg:pt-40">
        <Reveal>
          <p className="eyebrow mb-4 text-gold-deep">Products</p>
        </Reveal>
        <SplitText
          as="h1"
          text="Choose the scent your space deserves."
          italic={["deserves."]}
          className="font-display text-h1 max-w-[16ch]"
        />
        <span id="products-title" className="sr-only">
          Choose the scent your space deserves.
        </span>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-prose text-lead font-light text-cocoa">
            Each spray comes in a {FORMAT.size} bottle, lasts up to 48+ hours per application
            and is plant-based, allergy-friendly and IFRA-compliant. Filter by where you will
            use it.
          </p>
        </Reveal>

        <div className="mt-flow">
          <ProductGallery />
        </div>
      </section>

      <Spaces />
    </>
  );
}
