import kids from "@/assets/pkg-kids-party.jpg";
import kidsStandard from "@/assets/pkg-kids-standard.jpg";
import anniv from "@/assets/pkg-anniversary.jpg";
import annivFamily from "@/assets/pkg-anniversary-family.jpg";
import annivGrand from "@/assets/pkg-anniversary-grand.jpg";
import puja from "@/assets/pkg-puja.jpg";
import bach from "@/assets/pkg-bachelorette.jpg";
import bachPremium from "@/assets/pkg-bachelorette-premium.jpg";
import rudra from "@/assets/pkg-rudrabhishek.jpg";
import grah from "@/assets/pkg-grahpravesh.jpg";
import mulshaanti from "@/assets/pkg-mulshaanti.jpg";
import house from "@/assets/occ-houseparty-mixed.jpg";
import festive from "@/assets/occ-festive.jpg";
import catParties from "@/assets/cat-parties.jpg";
import catAla from "@/assets/cat-alacarte.jpg";

export type Inclusion = { label: string; detail: string };
export type Faq = { q: string; a: string };
export type Review = { name: string; city: string; rating: number; date: string; text: string };

export type CustomizationOptions = {
  cakeFlavours?: string[];
  cakeThemes?: string[];      // Birthday only
  decorThemes?: string[];
  menuTypes?: ("Veg" | "Non-Veg" | "Jain" | "Eggless")[];
};

export type HeadcountConfig = {
  adults?: { min: number; perExtra: number; label?: string };
  kids?: { min: number; perExtra: number; label?: string };
};

export type PackageDetail = {
  id: string;
  category: "Parties" | "Pujas" | "Ala-Carte";
  title: string;
  tagline: string;
  price: number;
  strikePrice?: number;
  guests: string;
  duration: string;
  bullets: string[];
  cover: string;
  gallery: string[];
  inclusions: Inclusion[];
  notIncluded?: string[];
  faqs: Faq[];
  reviews: Review[];
  rating: number;
  reviewCount: number;
  customization?: CustomizationOptions;
  headcount?: HeadcountConfig;
};

const commonFaqs: Faq[] = [
  { q: "How early should I book?", a: "We recommend booking at least 5–7 days in advance to lock your date. Pre-bookings get an additional ₹1,000 off." },
  { q: "Do you handle setup and cleanup?", a: "Yes — our team arrives 2–3 hours before, sets up everything and cleans up after the celebration. You don't lift a finger." },
  { q: "Can I customise the package?", a: "Absolutely. You can add or swap items via add-ons during booking, or chat with us on WhatsApp for custom requests." },
  { q: "What's the cancellation policy?", a: "Free cancellation up to 48 hours before the event. After that, advance payment is non-refundable but can be rescheduled once." },
  { q: "Which cities do you serve?", a: "Currently Delhi NCR (Delhi, Gurgaon, Noida, Faridabad, Ghaziabad). More cities launching soon." },
];

const partyReviews: Review[] = [
  { name: "Priya Sharma", city: "Gurgaon", rating: 5, date: "2 weeks ago", text: "Booked this for my son's 6th birthday — the team arrived on time, decor was stunning, and the kids absolutely loved the cake. Worth every rupee!" },
  { name: "Rohit Mehra", city: "Delhi", rating: 5, date: "1 month ago", text: "Hosted my wife's surprise party at home. Everything was handled end-to-end. I just had to be present and enjoy. Highly recommend." },
  { name: "Aanya Kapoor", city: "Noida", rating: 4, date: "3 weeks ago", text: "Great service, beautiful setup. Food could've been a bit warmer when it arrived but otherwise perfect." },
];

const pujaReviews: Review[] = [
  { name: "Mehta Family", city: "Noida", rating: 5, date: "1 week ago", text: "Pandit ji was very knowledgeable and patient. Samagri was complete, prasad was delicious. Truly stress-free experience." },
  { name: "Suresh Agarwal", city: "Delhi", rating: 5, date: "2 weeks ago", text: "We've done many pujas at home before, but this was by far the most organised. No last-minute running around." },
  { name: "Kavita Singh", city: "Gurgaon", rating: 5, date: "1 month ago", text: "From the pandit ji to the food, everything was top-notch. Will definitely book again for our next puja." },
];

// Reusable customization presets
export const CAKE_FLAVOURS = [
  "Chocolate Truffle", "Black Forest", "Vanilla", "Butterscotch",
  "Red Velvet", "Pineapple", "Strawberry", "Blueberry", "Mango",
  "Choco Chip", "Rasmalai", "KitKat",
];

export const KIDS_CAKE_THEMES = [
  "Spiderman", "Cocomelon", "Frozen", "Barbie", "Unicorn",
  "Cricket", "Cars", "Mickey Mouse", "Doraemon", "Princess",
  "Avengers", "Pokemon", "Dinosaur", "Jungle Safari",
];

export const PARTY_DECOR_THEMES = [
  "Pastel Romantic", "Royal Gold", "Tropical", "Boho Chic",
  "Neon Night", "Floral Garden", "Classic Red Rose", "Rustic White",
];

export const KIDS_DECOR_THEMES = [
  "Spiderman", "Cocomelon", "Frozen", "Barbie", "Unicorn",
  "Cricket", "Cars", "Mickey Mouse", "Jungle Safari", "Space",
  "Princess", "Avengers", "Dinosaur", "Pokemon",
];

export const BACH_DECOR_THEMES = [
  "Bride To Be Pink", "Last Toast Gold", "Disco Neon",
  "Rustic Boho", "Black & Gold", "Tropical",
];

const KIDS_CUSTOMIZATION: CustomizationOptions = {
  cakeFlavours: CAKE_FLAVOURS,
  cakeThemes: KIDS_CAKE_THEMES,
  decorThemes: KIDS_DECOR_THEMES,
  menuTypes: ["Veg", "Non-Veg"],
};

const ANNIV_CUSTOMIZATION: CustomizationOptions = {
  cakeFlavours: CAKE_FLAVOURS,
  decorThemes: PARTY_DECOR_THEMES,
  menuTypes: ["Veg", "Non-Veg"],
};

const BACH_CUSTOMIZATION: CustomizationOptions = {
  cakeFlavours: CAKE_FLAVOURS,
  decorThemes: BACH_DECOR_THEMES,
  menuTypes: ["Veg", "Non-Veg"],
};

const HOUSE_CUSTOMIZATION: CustomizationOptions = {
  decorThemes: PARTY_DECOR_THEMES,
  menuTypes: ["Veg", "Non-Veg"],
};

export const PACKAGES: PackageDetail[] = [
  {
    id: "kids-premium",
    category: "Parties",
    title: "Kids Birthday — Premium",
    tagline: "Big birthday magic, right at home",
    price: 16000, strikePrice: 19000,
    guests: "15 kids + 6 adults",
    duration: "4–5 hours",
    bullets: ["300 balloons + theme decor", "1.5kg theme cake", "Kids food for 15", "Dinner for 6 adults"],
    cover: kids,
    gallery: [kids, catParties, catAla],
    inclusions: [
      { label: "Theme Decor", detail: "300 balloons in cartoon theme of choice + backdrop + props" },
      { label: "Theme Cake", detail: "1.5kg fresh cake (theme of your choice — Cocomelon, Frozen, Spiderman, etc.)" },
      { label: "Kids Food", detail: "Pizza, burger, fries, coke for 15 kids" },
      { label: "Adult Dinner", detail: "Main course + dessert for 6 adults" },
      { label: "Return Gifts", detail: "Stationery + toys + munchies for 15 kids" },
      { label: "Setup & Cleanup", detail: "Full setup 2 hrs before + cleanup after the party" },
    ],
    notIncluded: ["Photography", "Magic show / Game coordinator (available as add-on)"],
    faqs: [
      { q: "Can I choose the cake theme?", a: "Yes! Pick any cartoon or theme — Cocomelon, Spiderman, Frozen, Unicorn, etc. Just share your choice 4 days before." },
      { q: "Is the food vegetarian?", a: "Yes, all kids' food is pure vegetarian. We can arrange jain or eggless cake on request." },
      ...commonFaqs,
    ],
    reviews: partyReviews,
    rating: 4.9, reviewCount: 187,
    customization: KIDS_CUSTOMIZATION,
    headcount: {
      kids: { min: 15, perExtra: 350, label: "Kids" },
      adults: { min: 6, perExtra: 400, label: "Adults" },
    },
  },
  {
    id: "kids-standard",
    category: "Parties",
    title: "Kids Birthday — Standard",
    tagline: "All the joy, simplified",
    price: 12000, strikePrice: 15000,
    guests: "15 kids",
    duration: "3–4 hours",
    bullets: ["300 balloons + cartoon decor", "1kg theme cake", "Kids food for 15", "Return gifts"],
    cover: kidsStandard,
    gallery: [kidsStandard, catParties],
    inclusions: [
      { label: "Theme Decor", detail: "300 balloons in cartoon theme + backdrop" },
      { label: "Theme Cake", detail: "1kg fresh theme cake of your choice" },
      { label: "Kids Food", detail: "Pizza, burger, fries, coke for 15 kids" },
      { label: "Return Gifts", detail: "Stationery + munchies for 15 kids" },
      { label: "Setup & Cleanup", detail: "Full setup + cleanup included" },
    ],
    notIncluded: ["Adult dinner", "Photography (available as add-on)"],
    faqs: commonFaqs,
    reviews: partyReviews,
    rating: 4.8, reviewCount: 142,
    customization: KIDS_CUSTOMIZATION,
    headcount: {
      kids: { min: 15, perExtra: 350, label: "Kids" },
    },
  },
  {
    id: "anniv-couple",
    category: "Parties",
    title: "Anniversary — Couple",
    tagline: "Turn your anniversary into a celebration of love",
    price: 5500, strikePrice: 6500,
    guests: "For 2",
    duration: "3 hours",
    bullets: ["Romantic decor + rose petals", "500g cake", "Starters + main course", "Bouquet + memento OR wine"],
    cover: anniv,
    gallery: [anniv, catAla],
    inclusions: [
      { label: "Romantic Decor", detail: "Rose petals, candles, fairy lights, balloon backdrop" },
      { label: "Cake", detail: "500g fresh cake of your chosen flavour" },
      { label: "Dinner", detail: "Starters + main course (veg or non-veg)" },
      { label: "Gift", detail: "Choice of fresh bouquet + memento OR a bottle of wine" },
      { label: "Setup & Cleanup", detail: "Discreet setup while you're out + cleanup after" },
    ],
    faqs: [
      { q: "Can you set up while we're out?", a: "Yes — share your access details, we'll arrive when you're out and surprise you with a fully set-up romantic evening." },
      ...commonFaqs,
    ],
    reviews: partyReviews,
    rating: 4.9, reviewCount: 96,
    customization: ANNIV_CUSTOMIZATION,
    headcount: {
      adults: { min: 2, perExtra: 400, label: "Guests" },
    },
  },
  {
    id: "anniv-family",
    category: "Parties",
    title: "Anniversary — Family (6)",
    tagline: "Celebrate love with your closest family",
    price: 9000, strikePrice: 10000,
    guests: "For 6",
    duration: "4 hours",
    bullets: ["Main course + dessert", "Decor setup + 500g cake", "Snacks/munchies", "Server or game coordinator"],
    cover: annivFamily, gallery: [annivFamily, anniv, catAla],
    inclusions: [
      { label: "Decor", detail: "Premium balloon + flower decor with backdrop" },
      { label: "Cake", detail: "500g fresh cake" },
      { label: "Food", detail: "Snacks, main course + dessert for 6 people" },
      { label: "Server", detail: "1 server OR game coordinator for 4 hours" },
    ],
    faqs: commonFaqs, reviews: partyReviews,
    rating: 4.8, reviewCount: 64,
    customization: ANNIV_CUSTOMIZATION,
    headcount: {
      adults: { min: 6, perExtra: 400, label: "Guests" },
    },
  },
  {
    id: "anniv-grand",
    category: "Parties",
    title: "Anniversary — Grand (40)",
    tagline: "A milestone deserves a grand celebration",
    price: 36000, strikePrice: 40000,
    guests: "For 40",
    duration: "5 hours",
    bullets: ["2kg cake + premium decor", "Catering + seating", "Snacks + full dinner", "Photo wall"],
    cover: annivGrand, gallery: [annivGrand, anniv, catAla, house],
    inclusions: [
      { label: "Premium Decor", detail: "Floral arch, balloon installation, photo wall, ambient lighting" },
      { label: "Cake", detail: "2kg multi-tier cake of your choice" },
      { label: "Catering", detail: "Snacks + full multi-course dinner for 40 guests" },
      { label: "Seating", detail: "Chairs + tables + linen setup" },
      { label: "Photo Wall", detail: "Custom photo backdrop with props" },
    ],
    faqs: commonFaqs, reviews: partyReviews,
    rating: 4.9, reviewCount: 38,
    customization: ANNIV_CUSTOMIZATION,
    headcount: {
      adults: { min: 40, perExtra: 400, label: "Guests" },
    },
  },
  {
    id: "bach-premium",
    category: "Parties",
    title: "Bachelorette — Premium (6)",
    tagline: "Good friends. Great vibes. One epic night.",
    price: 12000, strikePrice: 13000,
    guests: "For 6",
    duration: "5 hours",
    bullets: ["Premium decor + props", "Main course + 60pc snacks", "Theme cake (500g)", "Server/cleaner 5 hrs"],
    cover: bachPremium, gallery: [bachPremium, bach, house],
    inclusions: [
      { label: "Premium Decor", detail: "Neon signs, balloon arch, themed props" },
      { label: "Bride/Groom Props", detail: "Sash, crown, photo props" },
      { label: "Food", detail: "60 pcs snacks (3 varieties) + main course" },
      { label: "Cake", detail: "500g theme cake" },
      { label: "Drinks", detail: "Soft drinks, juices & water" },
      { label: "Server", detail: "Server/cleaner for 5 hours OR game coordinator (1 hr)" },
    ],
    notIncluded: ["Alcohol (BYOB)", "DJ (available as add-on)"],
    faqs: commonFaqs, reviews: partyReviews,
    rating: 4.9, reviewCount: 52,
    customization: BACH_CUSTOMIZATION,
    headcount: {
      adults: { min: 6, perExtra: 400, label: "Guests" },
    },
  },
  {
    id: "bach-standard",
    category: "Parties",
    title: "Bachelorette — Standard (6)",
    tagline: "Simple, fun, and unforgettable",
    price: 8000, strikePrice: 9000,
    guests: "For 6",
    duration: "4 hours",
    bullets: ["Balloon decor + neon", "Food: starters + biryani + dessert", "Bride/Groom props", "Soft drinks"],
    cover: bach, gallery: [bach, house],
    inclusions: [
      { label: "Decor", detail: "Balloon decor + neon sign" },
      { label: "Props", detail: "Bride/Groom sash + crown + photo props" },
      { label: "Food", detail: "Starters + biryani + dessert OR combo meal" },
      { label: "Cake", detail: "500g theme cake" },
      { label: "Drinks", detail: "Soft drinks, juices & water" },
    ],
    faqs: commonFaqs, reviews: partyReviews,
    rating: 4.7, reviewCount: 41,
    customization: BACH_CUSTOMIZATION,
    headcount: {
      adults: { min: 6, perExtra: 400, label: "Guests" },
    },
  },
  {
    id: "house-party",
    category: "Parties",
    title: "Casual House Party (6)",
    tagline: "Turn your home into the perfect party spot",
    price: 7000, strikePrice: 8000,
    guests: "For 6",
    duration: "5 hours",
    bullets: ["4 snacks (60 pcs)", "Main course + dessert", "1 server/cook (5 hrs)", "Cold drinks"],
    cover: house, gallery: [house, catAla],
    inclusions: [
      { label: "Food", detail: "Choice of 4 snacks (60 pcs) + main course + dessert" },
      { label: "Drinks", detail: "10 cold drink bottles (250ml)" },
      { label: "Server/Cook", detail: "1 server/cook for 5 hours" },
      { label: "Packaging", detail: "Food packaging + 2 carry bags" },
      { label: "Snacks", detail: "Instant snacks throughout the evening" },
    ],
    faqs: commonFaqs, reviews: partyReviews,
    rating: 4.8, reviewCount: 73,
    customization: HOUSE_CUSTOMIZATION,
    headcount: {
      adults: { min: 6, perExtra: 400, label: "Guests" },
    },
  },
  {
    id: "satyanarayan",
    category: "Pujas",
    title: "Satyanarayan Katha",
    tagline: "Complete katha with everything taken care of",
    price: 8500, strikePrice: 9500,
    guests: "For 6",
    duration: "3–4 hours",
    bullets: ["Pandit ji + full samagri", "Mithai, fruits, prasad", "Hawan + aarti + bhog", "Food for 6"],
    cover: puja, gallery: [puja, festive],
    inclusions: [
      { label: "Pandit Ji", detail: "Experienced pandit ji — comes with entire samagri, performs katha, hawan, aarti, visarjan, bhog" },
      { label: "Puja Samagri", detail: "Entire puja samagri for puja, hawan and aarti (excluding rentals)" },
      { label: "Mithai", detail: "500 grams mithai" },
      { label: "Fruits", detail: "5 types of fruits, 2 pieces each" },
      { label: "Flowers", detail: "Flowers, different patte and maalas" },
      { label: "Rentals", detail: "Items not included in samagri, carried back by pandit ji" },
      { label: "Food", detail: "5 puris, aloo sabzee, kadu sabzee, raita, gulab jamun" },
      { label: "Milk + Dahi", detail: "3 litre double tond milk + 250g dahi" },
      { label: "Logistics", detail: "Up to 3 stops included" },
    ],
    faqs: [
      { q: "Will the pandit ji speak Hindi/English?", a: "Our pandit ji speaks Hindi and conducts the katha in Sanskrit with Hindi explanations. English-speaking pandits available on request." },
      { q: "What time does the puja start?", a: "Most pujas start in the morning (9–11 AM) or evening (5–7 PM). We'll coordinate the muhurat with you." },
      { q: "Is the food included?", a: "Yes, full satvik bhog for 6 people is included. Extra people can be added at ₹200/person." },
      ...commonFaqs,
    ],
    reviews: pujaReviews,
    rating: 4.9, reviewCount: 124,
  },
  {
    id: "rudrabhishek",
    category: "Pujas",
    title: "Rudrabhishek",
    tagline: "Sacred Shiva abhishek with full samagri",
    price: 8300, strikePrice: 9300,
    guests: "For 6",
    duration: "3–4 hours",
    bullets: ["Pandit ji + full samagri", "Mithai + fruits + flowers", "Hawan + aarti + visarjan", "Food for 6"],
    cover: rudra, gallery: [rudra, puja, festive],
    inclusions: [
      { label: "Pandit Ji", detail: "Pandit ji with entire samagri — performs katha, puja, hawan, aarti, visarjan, bhog" },
      { label: "Puja Samagri", detail: "Entire samagri for katha, puja, hawan and aarti (excluding rentals)" },
      { label: "Mithai", detail: "500 grams mithai" },
      { label: "Fruits", detail: "5 types of fruits, 2 pieces each" },
      { label: "Flowers", detail: "Flowers, different patte and maalas" },
      { label: "Prasad", detail: "Panjeeri and charanamrit" },
      { label: "Cutlery", detail: "Plates, spoons, plastic glasses, tissues" },
      { label: "Food", detail: "6 puris, aloo sabzee, kadu sabzee, raita, gulab jamun" },
      { label: "Logistics", detail: "1 stop (food)" },
    ],
    faqs: [
      { q: "Do I need to arrange a Shivling?", a: "We can bring a parad/brass shivling on request. If you have one at home, it can be used." },
      { q: "What's the best time for Rudrabhishek?", a: "Mondays and Pradosh days are considered most auspicious. Sawan month is especially recommended." },
      ...commonFaqs,
    ],
    reviews: pujaReviews,
    rating: 4.9, reviewCount: 89,
  },
  {
    id: "grah-pravesh",
    category: "Pujas",
    title: "Grah Pravesh",
    tagline: "Bless your new home with a complete ceremony",
    price: 15000, strikePrice: 16000,
    guests: "For 6+",
    duration: "4–5 hours",
    bullets: ["Pandit ji + full samagri", "Flower decor on door + balcony", "Catering options", "Logistics + packaging"],
    cover: grah, gallery: [grah, puja, festive],
    inclusions: [
      { label: "Pandit Ji", detail: "Senior pandit ji with entire samagri — full grah pravesh ceremony" },
      { label: "Puja Samagri", detail: "Complete samagri for puja, hawan and aarti (excluding rentals)" },
      { label: "Mithai", detail: "1 kg mithai" },
      { label: "Fruits", detail: "5 kg fruits (1 kg each of 5 types)" },
      { label: "Flower Decor", detail: "Marigold torans + flower decor on main door and balcony" },
      { label: "Food", detail: "Catering by Sarita Aunty, Desi Handi (₹300/person) OR Anshu Catering buffet (₹550/person)" },
      { label: "Decor", detail: "Flower decor on main door and balcony" },
      { label: "Logistics", detail: "2 stops + food packaging" },
    ],
    faqs: [
      { q: "When is the best time for Grah Pravesh?", a: "Akshaya Tritiya, Vasant Panchami, and Navratri are very auspicious. We'll help you pick the right muhurat." },
      { q: "Can you handle larger gatherings?", a: "Yes — this package covers 6 core members. Add more guests via catering add-ons during booking." },
      ...commonFaqs,
    ],
    reviews: pujaReviews,
    rating: 4.9, reviewCount: 56,
  },
  {
    id: "mulshaanti",
    category: "Pujas",
    title: "Mulshaanti Puja",
    tagline: "Complete mulshaanti puja with everything taken care of",
    price: 8500, strikePrice: 9500,
    guests: "For 6",
    duration: "3–4 hours",
    bullets: ["Pandit ji + full samagri", "Mithai, fruits, prasad", "Hawan + aarti + bhog", "Food for 6"],
    cover: mulshaanti, gallery: [mulshaanti, festive],
    inclusions: [
      { label: "Pandit Ji", detail: "Experienced pandit ji — comes with entire samagri, performs puja, hawan, aarti, visarjan, bhog" },
      { label: "Puja Samagri", detail: "Entire puja samagri for puja, hawan and aarti (excluding rentals)" },
      { label: "Mithai", detail: "500 grams mithai" },
      { label: "Fruits", detail: "5 types of fruits, 2 pieces each" },
      { label: "Flowers", detail: "Flowers, different patte and maalas" },
      { label: "Rentals", detail: "Items not included in samagri, carried back by pandit ji" },
      { label: "Food", detail: "5 puris, aloo sabzee, kadu sabzee, raita, gulab jamun" },
      { label: "Milk + Dahi", detail: "3 litre double tond milk + 250g dahi" },
      { label: "Logistics", detail: "Up to 3 stops included" },
    ],
    faqs: [
      { q: "What is Mulshaanti puja?", a: "Mulshaanti is performed to pacify the effects of being born under certain nakshatras (Mool, Ashlesha, Jyeshtha, Magha, Revati). It brings peace and prosperity to the child and family." },
      { q: "When should it be done?", a: "Ideally within 27 days of birth, but can be performed later as well. We'll help you pick the right muhurat." },
      ...commonFaqs,
    ],
    reviews: pujaReviews,
    rating: 4.9, reviewCount: 47,
  },
];

// Backwards-compatible thin list for booking flow
export const PACKAGE_LIST = PACKAGES.map(p => ({
  id: p.id, category: p.category, title: p.title, price: p.price, guests: p.guests, bullets: p.bullets,
}));

export type AddOn = { id: string; name: string; price: number; emoji: string; category: string };

export const ADDONS: AddOn[] = [
  { id: "dj", name: "DJ", price: 6000, emoji: "🎧", category: "Entertainment" },
  { id: "live-singer", name: "Live Singer", price: 8000, emoji: "🎤", category: "Entertainment" },
  { id: "magic-show", name: "Magic Show", price: 4500, emoji: "🎩", category: "Entertainment" },
  { id: "puppet-show", name: "Puppet Show", price: 3500, emoji: "🎭", category: "Entertainment" },
  { id: "photographer", name: "Photographer (3 hrs)", price: 5000, emoji: "📸", category: "Entertainment" },
  { id: "game-coord", name: "Game Coordinator", price: 2500, emoji: "🎮", category: "Entertainment" },
  { id: "slime", name: "Slime Activity", price: 2000, emoji: "🧪", category: "Kids" },
  { id: "tattoo", name: "Tattoo Artist", price: 2500, emoji: "🎨", category: "Kids" },
  { id: "nail-art", name: "Nail Art", price: 2000, emoji: "💅", category: "Kids" },
  { id: "extra-cake", name: "Extra 1kg Cake", price: 1200, emoji: "🎂", category: "Cakes & Gifts" },
  { id: "return-gifts", name: "Premium Return Gifts (15)", price: 3000, emoji: "🎁", category: "Cakes & Gifts" },
  { id: "hookah", name: "Hookah Setup", price: 2500, emoji: "💨", category: "Extras" },
  { id: "flower-decor", name: "Flower Decor (door + balcony)", price: 3000, emoji: "🌸", category: "Decoration" },
];

export const WHATSAPP_NUMBER = "919599054850";

// Add-on suggestions per category
export const SUGGESTED_ADDONS: Record<string, string[]> = {
  Parties: ["dj", "photographer", "game-coord", "magic-show", "extra-cake"],
  Pujas: ["flower-decor", "photographer"],
  "Ala-Carte": [],
};
