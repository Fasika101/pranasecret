/** Minimal className joiner; avoids pulling in a dependency for this. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export const SITE = {
  name: "Prana Secret",
  tagline: "Fresh air, anytime, anywhere.",
  url: "https://pranasecret.example.com",
  description:
    "Prana Secret by Miracle Self-Care is a premium collection of air fresheners and ambient perfumes made in Addis Ababa for hotels, malls, spas, offices, clinics, cafés and homes. Long-lasting, plant-based, IFRA-compliant.",
};
