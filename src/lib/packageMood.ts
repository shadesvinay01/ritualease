// Maps a package id to a mood-setting background class for tiles.
// Falls back to category-level mood if no specific id match.
export const PACKAGE_MOOD: Record<string, string> = {
  // Parties
  "kids-premium": "bg-mood-kids",
  "kids-standard": "bg-mood-kids",
  "anniv-couple": "bg-mood-romance",
  "anniv-family": "bg-mood-romance",
  "anniv-grand": "bg-mood-romance",
  "bach-premium": "bg-mood-bachelorette",
  "bach-standard": "bg-mood-bachelorette",
  "house-party": "bg-mood-house",
  // Pujas
  "satyanarayan": "bg-mood-puja-sattva",
  "rudrabhishek": "bg-mood-puja-shiva",
  "grah-pravesh": "bg-mood-puja-ganesh",
  "mulshaanti": "bg-mood-puja-shanti",
};

export const getPackageMood = (id: string, category?: string): string => {
  if (PACKAGE_MOOD[id]) return PACKAGE_MOOD[id];
  if (category === "Pujas") return "bg-mood-puja-sattva";
  return "bg-mood-house";
};