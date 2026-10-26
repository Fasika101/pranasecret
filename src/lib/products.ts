import type { StaticImageData } from "next/image";
import lavender from "@/components/airfrshners/Prana Secret Lavender Air Freshener-1.png";
import obsession from "@/components/airfrshners/Prana Secret Aqua Air Freshener Spray-2.png";
import attraction from "@/components/airfrshners/Prana Secret Floral Air Freshener-3.png";
import inspiration from "@/components/airfrshners/Prana Secret Floral Air Freshener-4.png";
import temptation from "@/components/airfrshners/Prana Secret Temptation Air Freshener-5.png";

export const VENUES = [
  "Hotels",
  "Malls",
  "Spas",
  "Offices",
  "Living rooms",
  "Meeting halls",
  "Clinics",
  "Cafes",
  "Luxury residences",
] as const;
export type Venue = (typeof VENUES)[number];

export interface Palette {
  /** Saturated accent (chips, highlights, bubbles). */
  accent: string;
  /** Very light tint for card and section backgrounds. */
  tint: string;
  /** Mid-tone used for soft glows behind the bottle. */
  glow: string;
}

export interface Product {
  slug: string;
  name: string;
  numeral: string;
  /** Short scent character shown under the name. */
  mood: string;
  tagline: string;
  description: string;
  notes: string[];
  bestFor: Venue[];
  palette: Palette;
  image: StaticImageData;
  /** Alt text for the render. */
  alt: string;
}

/** Shared format details for the current spray range. */
export const FORMAT = {
  type: "Air freshener spray",
  size: "230 ml · 8 fl oz",
  longevity: "Up to 48+ hours per application",
  safety: "Plant-based, allergy-friendly, IFRA-compliant",
} as const;

export const products: Product[] = [
  {
    slug: "lavender",
    name: "Lavender",
    numeral: "01",
    mood: "Calm · Clean · Unhurried",
    tagline: "A field in Provence, bottled for quiet rooms.",
    description:
      "True lavender softened with white musk and fresh linen. It settles a room within minutes and keeps it calm for days, which is why it is our most requested scent for wellness and rest.",
    notes: ["French lavender", "White musk", "Fresh linen", "Soft cedar"],
    bestFor: ["Spas", "Clinics", "Hotels", "Living rooms"],
    palette: { accent: "#7a5fc7", tint: "#f1ecfb", glow: "#c9b9f2" },
    image: lavender,
    alt: "Prana Secret Lavender air freshener spray, 230 ml bottle with lavender artwork",
  },
  {
    slug: "obsession",
    name: "Obsession",
    numeral: "02",
    mood: "Aquatic · Tropical · Bright",
    tagline: "Ocean air and hibiscus, cool as a sea breeze.",
    description:
      "Marine freshness lifted by hibiscus and green monstera leaves. Obsession cuts through busy, high-traffic air and leaves it feeling newly opened, which makes it ideal for malls, gyms and cafés.",
    notes: ["Sea breeze", "Hibiscus", "Green leaves", "White tea"],
    bestFor: ["Malls", "Cafes", "Offices", "Meeting halls"],
    palette: { accent: "#22a89d", tint: "#e5f6f3", glow: "#a9e4dc" },
    image: obsession,
    alt: "Prana Secret Obsession air freshener spray, turquoise 230 ml bottle with tropical flowers",
  },
  {
    slug: "attraction",
    name: "Attraction",
    numeral: "03",
    mood: "Warm · Floral · Elegant",
    tagline: "Jasmine and warm amber for a first impression.",
    description:
      "Creamy jasmine over sandalwood and amber. Attraction is the scent of a well-kept lobby: warm, polished and memorable without ever being loud. Guests notice it the moment they walk in.",
    notes: ["Jasmine", "Warm amber", "Sandalwood", "Honeyed vanilla"],
    bestFor: ["Hotels", "Luxury residences", "Malls", "Meeting halls"],
    palette: { accent: "#b38545", tint: "#f8f0e3", glow: "#ead6b3" },
    image: attraction,
    alt: "Prana Secret Attraction air freshener spray, golden 230 ml bottle with white blossoms",
  },
  {
    slug: "inspiration",
    name: "Inspiration",
    numeral: "04",
    mood: "Fresh · Floral · Uplifting",
    tagline: "Peach blossom and rose to brighten a working day.",
    description:
      "Peach blossom, soft rose and a touch of vanilla. Inspiration keeps shared spaces light and optimistic for hours, so meeting rooms, offices and family living rooms feel welcoming from morning to evening.",
    notes: ["Peach blossom", "Garden rose", "Soft vanilla", "Clean musk"],
    bestFor: ["Offices", "Meeting halls", "Living rooms", "Cafes"],
    palette: { accent: "#e2846b", tint: "#fdece6", glow: "#f6c7b7" },
    image: inspiration,
    alt: "Prana Secret Inspiration air freshener spray, peach-pink 230 ml bottle with blossoms",
  },
  {
    slug: "temptation",
    name: "Temptation",
    numeral: "05",
    mood: "Rich · Rosy · Indulgent",
    tagline: "Damask rose and peony for evenings that linger.",
    description:
      "A full bouquet of damask rose and peony with a flicker of pink pepper. Temptation gives spas, salons and dining rooms a sense of occasion, and its long-lasting formula holds through a whole evening service.",
    notes: ["Damask rose", "Peony", "Pink pepper", "Soft woods"],
    bestFor: ["Spas", "Luxury residences", "Hotels", "Cafes"],
    palette: { accent: "#cf4f7c", tint: "#fbe7ee", glow: "#f3bfd1" },
    image: temptation,
    alt: "Prana Secret Temptation air freshener spray, rose-pink 230 ml bottle with roses and peonies",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAdjacent(slug: string): { prev: Product; next: Product } {
  const i = products.findIndex((p) => p.slug === slug);
  const n = products.length;
  return { prev: products[(i - 1 + n) % n], next: products[(i + 1) % n] };
}

/** Suggested scent per venue, in display order for the venue guide. */
export const VENUE_GUIDE: { venue: Venue; product: Product["slug"]; note: string }[] = [
  { venue: "Hotels", product: "attraction", note: "Lobbies, corridors and guest rooms" },
  { venue: "Malls", product: "obsession", note: "Atriums and high-traffic walkways" },
  { venue: "Spas", product: "lavender", note: "Treatment rooms and relaxation areas" },
  { venue: "Offices", product: "inspiration", note: "Open plans and reception desks" },
  { venue: "Living rooms", product: "inspiration", note: "Everyday freshness at home" },
  { venue: "Meeting halls", product: "obsession", note: "Large rooms between sessions" },
  { venue: "Clinics", product: "lavender", note: "Waiting rooms and consultation spaces" },
  { venue: "Cafes", product: "temptation", note: "Dining rooms and terraces" },
  { venue: "Luxury residences", product: "temptation", note: "Entrances, lounges and suites" },
];
