import type { Metadata, Viewport } from "next";
import { Ubuntu } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BubbleField } from "@/components/motion/BubbleField";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SITE } from "@/lib/utils";
import "./globals.css";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "air freshener",
    "ambient perfume",
    "hotel scenting",
    "Addis Ababa",
    "Ethiopia",
    "Miracle Self-Care",
    "Prana Secret",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf7f1",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${ubuntu.variable} h-full antialiased`}
    >
      <body className={`${ubuntu.className} flex min-h-full flex-col`}>
        {/* Without JS, Motion's SSR'd "hidden" initial styles would persist. Force content visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#content"
          className="eyebrow sr-only z-[70] rounded-full bg-ink px-5 py-3 text-milk focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <BubbleField />
        <MotionProvider>
          <Header />
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
