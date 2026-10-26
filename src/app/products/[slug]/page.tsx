import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductHero } from "@/components/product/ProductHero";
import { COMPANY } from "@/lib/company";
import { FORMAT, getAdjacent, getProduct, products } from "@/lib/products";
import { SITE } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

/**
 * Every slug is prerendered via generateStaticParams, so there is no dynamic
 * data to stream. Opting out of the "instant shell" lets the page read
 * `params` directly instead of wrapping the whole route in Suspense.
 */
export const instant = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} air freshener`,
    description: `${product.tagline} ${product.description}`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} — ${SITE.name}`,
      description: product.description,
      type: "website",
      images: [{ url: product.image.src, width: product.image.width, height: product.image.height, alt: product.alt }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const { prev, next } = getAdjacent(slug);
  const related = products.filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${SITE.name} ${product.name} Air Freshener`,
    description: product.description,
    image: `${SITE.url}${product.image.src}`,
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: { "@type": "Organization", name: COMPANY.manufacturer },
    category: FORMAT.type,
    size: FORMAT.size,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: { "@type": "PriceSpecification", description: "Volume-based pricing on request" },
      url: `${SITE.url}/partner`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductHero product={product} />
      <ProductDetails product={product} />

      <section aria-labelledby="related-title" className="pb-section">
        <div className="container-site">
          <Reveal>
            <div className="flex items-end justify-between gap-6 border-t border-ink/8 pt-10">
              <h2 id="related-title" className="font-display text-h2">
                Also in the collection
              </h2>
              <Link
                href="/products"
                className="eyebrow link-draw hidden py-2 text-stone hover:text-ink sm:inline-block"
              >
                View all
              </Link>
            </div>
          </Reveal>
          <RevealGroup
            staggerChildren={0.12}
            amount={0.1}
            className="-mx-gutter mt-flow flex snap-x snap-mandatory gap-stack overflow-x-auto scroll-px-gutter px-gutter pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {related.map((p) => (
              <RevealItem
                key={p.slug}
                className="w-[min(72vw,20rem)] shrink-0 snap-start md:w-[min(42vw,22rem)] lg:w-auto"
              >
                <ProductCard product={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <nav aria-label="Previous and next scent" className="border-t border-ink/8">
        <div className="container-site grid grid-cols-2">
          <Link
            href={`/products/${prev.slug}`}
            className="group flex flex-col gap-2 border-r border-ink/8 py-10 pr-6 transition-colors hover:bg-milk/60 active:bg-milk/60"
          >
            <span className="eyebrow text-stone">← Previous</span>
            <span className="font-display text-h3 leading-none">{prev.name}</span>
          </Link>
          <Link
            href={`/products/${next.slug}`}
            className="group flex flex-col items-end gap-2 py-10 pl-6 text-right transition-colors hover:bg-milk/60 active:bg-milk/60"
          >
            <span className="eyebrow text-stone">Next →</span>
            <span className="font-display text-h3 leading-none">{next.name}</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
