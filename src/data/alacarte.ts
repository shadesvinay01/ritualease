export type AlaCarteItem = {
  name: string;
  price: number;
  unit?: string; // e.g. "per piece", "for 20 kids", "per person"
  note?: string;
};

export type AlaCarteGroup = {
  id: string;
  emoji: string;
  title: string;
  tagline: string;
  items: AlaCarteItem[];
  footnote?: string;
};

export type CateringPackage = {
  id: string;
  name: string;
  pricePerPerson: number;
  highlights: string[];
  featured?: boolean;
};

export const ALA_CARTE_GROUPS: AlaCarteGroup[] = [
  {
    id: "kids",
    emoji: "🎨",
    title: "Kids Activities",
    tagline: "Hands-on fun, performers & party experiences kids will remember",
    items: [
      { name: "Games Co-ordinator", price: 1500 },
      { name: "Magic Show", price: 2500 },
      { name: "Tattoo Artist", price: 2000 },
      { name: "Puppet Show", price: 2000 },
      { name: "Glowing Jar Making", price: 150, unit: "per piece", note: "Min 20 kids" },
      { name: "Key Chain Making", price: 3000, unit: "for 20 kids" },
      { name: "Stone Name Making", price: 3000, unit: "for 20 kids" },
      { name: "Stone Art", price: 2800, unit: "for 20 kids" },
      { name: "Slime Making", price: 3000, unit: "for 20 kids" },
      { name: "Gun Shooting", price: 3500, unit: "for 2 hrs" },
      { name: "Nail Art", price: 3000, unit: "for 2 hrs" },
      { name: "Hair Beading", price: 3000 },
      { name: "Mini Beauty Parlour", price: 4000 },
      { name: "Name Plate Making", price: 2200, unit: "for 20 kids" },
      { name: "Goggles Making", price: 220, unit: "per piece" },
      { name: "Live Cartoon Character", price: 2800, unit: "for 2 hrs" },
      { name: "Kids DJ", price: 5500 },
      { name: "Bouncy Mickey Mouse", price: 8000 },
      { name: "Kids Return Gift", price: 300, unit: "per kid", note: "Toys + stationery + munchies" },
    ],
  },
  {
    id: "entertainment",
    emoji: "🎭",
    title: "Entertainment",
    tagline: "Live music, DJs & photographers to set the mood",
    items: [
      { name: "Live Singer", price: 9999, note: "Minimum 1 hour" },
      { name: "Live Bands", price: 19999, note: "Minimum 1.5 hours" },
      { name: "DJ Service with Floor", price: 8500 },
      { name: "DJ Service (without Floor)", price: 7500 },
      { name: "Juke Box", price: 4500 },
      { name: "Dhol", price: 4999, note: "Minimum 1 hour" },
      { name: "Photographer", price: 8000, note: "Minimum 1.5 hours" },
    ],
  },
  {
    id: "ritual",
    emoji: "🪔",
    title: "Ritual Essentials",
    tagline: "Pandit ji, samagri & traditions, sorted",
    items: [
      { name: "Pandit Ji", price: 3000 },
      { name: "Dhol", price: 4999, note: "Minimum 1 hour" },
      { name: "Mehndi Artist", price: 500, unit: "per person" },
      { name: "Puja Samagri Kit", price: 750 },
      { name: "Photographer", price: 8000, note: "Minimum 1.5 hours" },
    ],
  },
];

export const CATERING_PACKAGES: CateringPackage[] = [
  {
    id: "classic",
    name: "Classic",
    pricePerPerson: 600,
    highlights: [
      "2 Snacks",
      "2 Mains",
      "1 Seasonal Veg",
      "1 Curd-based Dish",
      "1 Dessert",
      "Assorted Breads",
      "1 Rice Dish",
      "Salad",
      "Mineral Water",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    pricePerPerson: 900,
    featured: true,
    highlights: [
      "4 Snacks",
      "3 Mains",
      "2 Seasonal Veg",
      "1 Curd-based Dish",
      "2 Desserts",
      "Assorted Breads",
      "1 Rice Dish",
      "Salad",
      "Mineral Water",
      "Soft Drinks",
      "1 Live Counter",
    ],
  },
  {
    id: "luxury",
    name: "Luxury",
    pricePerPerson: 1200,
    highlights: [
      "6 Snacks",
      "6 Main Course",
      "2 Curd-based Dishes",
      "3 Desserts",
      "Assorted Breads",
      "1 Rice Dish",
      "1 Salad",
      "Mineral Water",
      "Soft Drinks",
      "2 Live Counters",
    ],
  },
];

export const CATERING_NOTES = [
  "All rates are for minimum 50 pax",
  "Prices may vary with headcount",
  "Bone China premium setup at additional ₹100 per plate",
  "Charges include 2 service + 2 local waiters, round table setup (4–5), buffet tables, dustbins",
  "Additional charges as per requirements",
];

export const CATERING_MENU: { section: string; groups: { title: string; items: string[] }[] }[] = [
  {
    section: "Beverages & Soups",
    groups: [
      {
        title: "Beverages",
        items: [
          "Water (Bisleri 250ml)",
          "Coffee (Hot/Cold)",
          "Shakes (Seasonal Fruit / Chocolate)",
          "Tea (Regular / Ginger / Masala)",
          "Soft Drinks (Coke / Limca / Fanta / Sprite)",
          "Mocktails (Appletini / Mojito / Cumin Magic)",
        ],
      },
      {
        title: "Soups",
        items: [
          "Organic Tamatar Dhaniye ka Shorba",
          "Cream of Tomato",
          "Hot & Sour",
          "Manchow",
          "Sweet Corn",
          "Lemon Coriander",
          "Clear Soup",
        ],
      },
    ],
  },
  {
    section: "Starters",
    groups: [
      {
        title: "Chinese",
        items: ["Chowmein", "Chilli Paneer", "Chilli Potato", "Dry Manchurian", "Spring Rolls", "Stuffed Chilli Fritters"],
      },
      {
        title: "Chaat",
        items: [
          "Gol Gappa (6 paani flavours)",
          "Bhalla Papri",
          "Stuffed Aloo Tikki",
          "Matar Patila with Mini Kachori",
          "Mumbaiya Pav Bhaji",
          "Fresh Fruits Counter",
          "Dahi Bhalla with Saunth",
        ],
      },
      {
        title: "Tandoor",
        items: [
          "Paneer Tikka (Tandoori / Achari)",
          "Broccoli Kebab",
          "Dahi Ke Kebab",
          "Hara Bhara Kebab",
          "Paneer Anjeer Tikka",
          "Soya Malai Tikka",
          "Tandoori Khatte Aaloo",
          "Mozzarella Stuffed Mushrooms",
        ],
      },
      {
        title: "Snacks",
        items: [
          "Crunchy Spinach & Cheese Ball",
          "Chaap (Malai / Tandoori)",
          "French Fries",
          "Grilled Pineapple with Bell Pepper",
          "Potli Samosa",
          "Aloo Samosa",
          "Veg Cutlets",
          "Mushroom Kurkure",
          "Spinach & Corn Quiche",
        ],
      },
    ],
  },
  {
    section: "Main Course",
    groups: [
      {
        title: "Vegetarian",
        items: [
          "Paneer Lababdar",
          "Kadhai Paneer",
          "Shahi Paneer",
          "Paneer Butter Masala",
          "Hing Jeera Aaloo",
          "Malai Kofta",
          "Bhindi Do Pyaza",
          "Palak Corn",
          "Gobhi Adraki",
          "Mutter Methi Malai",
          "Arbi Masala",
          "Dal Bukhara",
          "Yellow Dal Tadka",
          "Chana Pindi",
          "Mushroom Stew",
          "Soy Chap Masala",
          "Mixed Vegetable",
          "Kashmiri Dum Aaloo",
          "Dal Makhani",
          "Baigan ka Bharta",
          "Aloo Gajar Matar",
          "Rajma Masala",
          "Aloo Dahi Masala",
          "Veg Makhani",
          "Chana Dal Fry",
          "Sarson ka Saag with Makai Roti",
          "Punjabi Kadhi with Pakoda",
        ],
      },
      {
        title: "Chinese",
        items: ["Veg Manchurian in Hot Garlic Sauce", "Veg Hakka Noodles", "Veg Fried Rice"],
      },
    ],
  },
  {
    section: "Essentials",
    groups: [
      {
        title: "Breads",
        items: [
          "Plain Naan",
          "Tandoori Roti",
          "Missi Roti",
          "Butter Naan",
          "Stuffed Naan",
          "Lachha Paratha",
          "Pudina Paratha",
          "Kandhari Naan",
          "Tawa Roti",
          "Bread Basket (Assorted)",
          "Puri",
        ],
      },
      {
        title: "Rice",
        items: [
          "Subz Biryani",
          "Steamed Rice",
          "Peas Pulav",
          "Hyderabadi Dum Biryani",
          "Kathal Biryani",
          "Long Jeera Rice",
          "Vegetable Fried Rice",
          "Macaroni Rice",
          "Plain Rice",
        ],
      },
    ],
  },
  {
    section: "Meetha (Sweets & Desserts)",
    groups: [
      {
        title: "Sweets",
        items: [
          "Chikoo Halwa",
          "Kiwi Halwa",
          "Gajar ka Halwa",
          "Moong Dal Halwa",
          "Beetroot Halwa",
          "Kesariya Rasmalai",
          "Gulab Kheer",
          "Pista Phirni",
          "Jalebi",
          "Zafrani Jalebi with Rabri",
          "Mishri Malai",
          "Raj Bhog",
          "Pineapple Halwa",
          "Rasgulla",
          "Gulab Jamun",
        ],
      },
      {
        title: "Desserts",
        items: ["Ice Cream", "Fruit Cream", "Cake"],
      },
    ],
  },
];

export const CATERING_MIN_PAX = 40;