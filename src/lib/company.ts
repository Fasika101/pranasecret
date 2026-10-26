/** Company facts, taken from the Prana Secret marketing brochure. */
export const COMPANY = {
  manufacturer: "Miracle Self-Care Products Manufacturing",
  shortName: "Miracle Self-Care",
  brand: "Prana Secret",
  founded: 2020,
  city: "Addis Ababa",
  country: "Ethiopia",
  email: "Miracle.manufacturing@yahoo.com",
  phones: [
    { label: "Ethiopia", display: "+251 948 486 648", tel: "+251948486648" },
    { label: "Ethiopia", display: "+251 961 573 561", tel: "+251961573561" },
    { label: "U.A.E.", display: "+971 58 541 5741", tel: "+971585415741" },
  ],
} as const;

export const TAGLINE = "Fresh air, anytime, anywhere.";

export const QUOTES = [
  "Scent is the silent welcome. Make it unforgettable.",
  "Freshness is not a luxury. It's a lifestyle.",
  "One space, one scent. Endless possibilities.",
] as const;

export const PROMISES = [
  {
    title: "Memorable ambiance",
    text: "Customise the mood of any space with a scent that guests remember.",
    stat: "5",
    statLabel: "signature scents",
  },
  {
    title: "Long-lasting freshness",
    text: "Up to 48+ hours per application, so refills are rare and rooms stay consistent.",
    stat: "48+",
    statLabel: "hours per application",
  },
  {
    title: "Natural and safe",
    text: "Plant-based, allergy-friendly formulas that meet IFRA fragrance standards.",
    stat: "IFRA",
    statLabel: "compliant formulas",
  },
  {
    title: "Versatile formats",
    text: "Sprays, gels, reed diffusers and auto-dispensers for every room and routine.",
    stat: "4",
    statLabel: "product formats",
  },
] as const;

export const FORMATS = [
  { name: "Sprays", text: "Instant freshness for housekeeping rounds and quick resets. Our 230 ml range." },
  { name: "Gels", text: "Steady, low-maintenance scenting for bathrooms, closets and small rooms." },
  { name: "Reed diffusers", text: "Quiet, continuous ambiance for lobbies, suites and lounges." },
  { name: "Auto-dispensers", text: "Programmable release for large or busy spaces. Saves staff time." },
] as const;

export const PHILOSOPHY = [
  { title: "Quality first, service first", text: "Zero defects, zero complaints. Every batch is checked before it leaves Addis Ababa." },
  { title: "Nature meets science", text: "Eco-friendly, biodegradable formulas built on plant-based ingredients." },
  { title: "Accessible luxury", text: "A premium experience at fair, volume-based pricing." },
] as const;

export const BUSINESS_CASE = [
  {
    stat: "30%",
    title: "More positive reviews",
    text: "Studies show pleasant scents increase positive reviews by up to 30%. Guests remember how your space felt.",
  },
  {
    stat: "1",
    title: "Signature identity",
    text: "Create a scent that becomes uniquely yours. From lobby to spa, every zone tells one story.",
  },
  {
    stat: "48h",
    title: "Operational ease",
    text: "Long-lasting formulas reduce refill frequency, and auto-dispenser options save housekeeping time.",
  },
  {
    stat: "Bulk",
    title: "Cost control",
    text: "Bulk ordering and refill packs give excellent value and keep your operational budget predictable.",
  },
] as const;

export const PARTNERSHIP = [
  {
    title: "Customised solutions",
    text: "Flexible ordering, delivery schedules and bulk purchasing options tailored to your property.",
  },
  {
    title: "Dedicated account management",
    text: "One point of contact for orders, support and reordering, with ongoing technical help.",
  },
  {
    title: "Product training",
    text: "Usage guidelines, safety data sheets and dispenser set-up for your housekeeping team.",
  },
  {
    title: "Flexible payment terms",
    text: "Terms tailored to your volume and partnership level.",
  },
  {
    title: "Sample programme",
    text: "Test any three fragrances free before committing.",
  },
  {
    title: "Volume pricing",
    text: "Competitive, volume-based pricing with bulk discounts, subscription refill plans and introductory offers.",
  },
] as const;
