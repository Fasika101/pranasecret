import { Hero } from "@/components/home/Hero";
import { PromiseStrip } from "@/components/home/PromiseStrip";
import { Showcase } from "@/components/home/Showcase";
import { Spaces } from "@/components/home/Spaces";
import { WhyPartner } from "@/components/home/WhyPartner";
import { Offer } from "@/components/home/Offer";
import { Closing } from "@/components/home/Closing";
import { COMPANY } from "@/lib/company";
import { SITE } from "@/lib/utils";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.manufacturer,
  brand: { "@type": "Brand", name: SITE.name },
  url: SITE.url,
  description: SITE.description,
  foundingDate: String(COMPANY.founded),
  email: COMPANY.email,
  telephone: COMPANY.phones.map((p) => p.tel),
  address: {
    "@type": "PostalAddress",
    addressLocality: COMPANY.city,
    addressCountry: "ET",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <PromiseStrip />
      <Showcase />
      <Spaces />
      <WhyPartner />
      <Offer />
      <Closing />
    </>
  );
}
