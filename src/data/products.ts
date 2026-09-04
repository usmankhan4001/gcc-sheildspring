import { Product } from "@/lib/types";

export const products: Product[] = [
  // ── Men ────────────────────────────────────────────────
  {
    slug: "neon-street-hoodie",
    name: "Neon Street Hoodie",
    category: "men",
    price: 89,
    compareAtPrice: 110,
    colors: ["Black", "Lavender", "Neon Green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "An oversized hoodie in heavyweight French terry with a dropped shoulder and a bold chest graphic. Built for layering, made for standing out.",
    details: [
      "400gsm French terry cotton",
      "Dropped shoulder, oversized fit",
      "Screen-printed chest graphic",
      "Kangaroo pocket, ribbed cuffs",
    ],
    palette: ["#c084fc", "#3b0764"],
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 42,
    isBestseller: true,
  },
  {
    slug: "cargo-rebuild-pants",
    name: "Cargo Rebuild Pants",
    category: "men",
    price: 74,
    colors: ["Khaki", "Black", "Sage"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Wide-leg cargo pants with utility pockets and an adjustable drawstring hem. Relaxed through the thigh, tapered at the ankle.",
    details: [
      "Ripstop cotton-nylon blend",
      "Six utility pockets",
      "Drawstring ankle cuffs",
      "Relaxed wide-leg fit",
    ],
    palette: ["#a3a3a3", "#525252"],
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 29,
    isBestseller: true,
  },
  {
    slug: "lume-essential-tee",
    name: "Lume Essential Tee",
    category: "men",
    price: 38,
    colors: ["White", "Washed Black", "Lilac"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "A boxy cotton tee with a subtle tonal logo at the chest. Pre-washed for a soft hand feel from the first wear.",
    details: [
      "100% organic cotton jersey",
      "Boxy regular fit",
      "Tonal embroidered logo",
      "Pre-washed for softness",
    ],
    palette: ["#e9d5ff", "#7c3aed"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 56,
    isNew: true,
  },
  {
    slug: "tech-shell-jacket",
    name: "Tech Shell Jacket",
    category: "men",
    price: 128,
    colors: ["Black", "Storm Grey"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "A lightweight windbreaker with a matte finish, taped seams, and an adjustable hood. Packs into its own pocket.",
    details: [
      "Water-resistant ripstop shell",
      "Taped seams, DWR coating",
      "Packable into chest pocket",
      "Adjustable hood and hem",
    ],
    palette: ["#404040", "#171717"],
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 18,
  },

  // ── Women ──────────────────────────────────────────────
  {
    slug: "cropped-muted-tank",
    name: "Cropped Muted Tank",
    category: "women",
    price: 34,
    colors: ["Powder Pink", "White", "Black"],
    sizes: ["XS", "S", "M", "L"],
    description:
      "A ribbed cropped tank with a scooped neckline and a fitted silhouette. The kind of basic that never goes out of rotation.",
    details: [
      "Ribbed cotton-modal blend",
      "Cropped length, fitted fit",
      "Scooped neckline",
      "Side-seam construction",
    ],
    palette: ["#fda4af", "#be185d"],
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 38,
    isNew: true,
  },
  {
    slug: "high-rise-track-pants",
    name: "High-Rise Track Pants",
    category: "women",
    price: 68,
    colors: ["Charcoal", "Lavender", "Cream"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "High-waisted track pants with a tapered leg and side stripe detail. Elastic waistband with a drawstring for the perfect fit.",
    details: [
      "French terry cotton blend",
      "High rise, tapered leg",
      "Side stripe panel detail",
      "Elastic waistband with drawstring",
    ],
    palette: ["#d4d4d8", "#71717a"],
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552874869-5c39ec9288dc?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 24,
  },
  {
    slug: "oversized-graphic-hoodie",
    name: "Oversized Graphic Hoodie",
    category: "women",
    price: 82,
    compareAtPrice: 100,
    colors: ["Washed Rose", "Sage", "Black"],
    sizes: ["XS", "S", "M", "L"],
    description:
      "A box-cut hoodie in garment-dyed cotton with a back graphic and front pocket. Oversized enough to layer, structured enough to stand alone.",
    details: [
      "Garment-dyed 350gsm cotton",
      "Box-cut oversized fit",
      "Back print graphic",
      "Front kangaroo pocket",
    ],
    palette: ["#fda4af", "#9f1239"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 5.0,
    reviewCount: 64,
    isBestseller: true,
  },
  {
    slug: "mesh-layer-top",
    name: "Mesh Layer Top",
    category: "women",
    price: 48,
    colors: ["Black", "White"],
    sizes: ["XS", "S", "M", "L"],
    description:
      "A sheer mesh long-sleeve with thumbholes and a mock neckline. Perfect as a layering piece under tees and hoodies.",
    details: [
      "Stretch mesh polyester",
      "Mock neckline, thumbholes",
      "Layering-ready sheer fabric",
      "Flatlock seam construction",
    ],
    palette: ["#a1a1aa", "#27272a"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.6,
    reviewCount: 15,
    isNew: true,
  },

  // ── Kids ───────────────────────────────────────────────
  {
    slug: "mini-lume-tee",
    name: "Mini Lume Tee",
    category: "kids",
    price: 28,
    colors: ["Lilac", "Mint", "Peach"],
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
    description:
      "A soft organic cotton tee with a playful glow-in-the-dark print. Tag-free neck for all-day comfort.",
    details: [
      "100% organic cotton jersey",
      "Glow-in-the-dark print",
      "Tagless neck label",
      "Reinforced shoulder seams",
    ],
    palette: ["#c4b5fd", "#7c3aed"],
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 31,
    isNew: true,
  },
  {
    slug: "rainbow-cargo-shorts",
    name: "Rainbow Cargo Shorts",
    category: "kids",
    price: 36,
    colors: ["Multi", "Khaki"],
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    description:
      "Durable cargo shorts with colorful contrast stitching and deep pockets for all the treasures they'll collect.",
    details: [
      "Ripstop cotton twill",
      "Contrast rainbow stitching",
      "Deep cargo pockets",
      "Elastic waistband",
    ],
    palette: ["#fbbf24", "#d97706"],
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 22,
  },
  {
    slug: "glow-street-sneakers",
    name: "Glow Street Sneakers",
    category: "kids",
    price: 54,
    colors: ["White/Neon", "Black/Pink"],
    sizes: ["10K", "12K", "1Y", "2Y", "3Y"],
    description:
      "Chunky sneakers with a glow-in-the-dark sole and hook-and-loop strap. Easy on, easy off, impossible to miss.",
    details: [
      "Synthetic upper, mesh tongue",
      "Glow-in-the-dark outsole",
      "Hook-and-loop strap closure",
      "Cushioned insole",
    ],
    palette: ["#e0e7ff", "#4f46e5"],
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 5.0,
    reviewCount: 73,
    isBestseller: true,
  },
  {
    slug: "neon-bucket-hat",
    name: "Neon Bucket Hat",
    category: "kids",
    price: 24,
    colors: ["Neon Yellow", "Lavender"],
    sizes: ["One Size"],
    description:
      "A reversible bucket hat with a neon side and a solid side. UPF 50+ sun protection for all-day adventures.",
    details: [
      "Reversible, two looks in one",
      "UPF 50+ sun protection",
      "Lightweight cotton twill",
      "Adjustable chin strap",
    ],
    palette: ["#fde047", "#a16207"],
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 19,
  },

  // ── Accessories ────────────────────────────────────────
  {
    slug: "crossbody-tech-bag",
    name: "Crossbody Tech Bag",
    category: "accessories",
    price: 42,
    colors: ["Black", "Lilac", "Neon Green"],
    sizes: ["One Size"],
    description:
      "A compact crossbody in coated nylon with an adjustable strap and multiple compartments for phone, keys, and cards.",
    details: [
      "Coated nylon water-resistant",
      "Adjustable webbing strap",
      "Three internal compartments",
      "YKK zippers",
    ],
    palette: ["#a3e635", "#365314"],
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 88,
    isBestseller: true,
  },
  {
    slug: "chunky-chain-necklace",
    name: "Chunky Chain Necklace",
    category: "accessories",
    price: 36,
    colors: ["Silver", "Gold"],
    sizes: ["One Size"],
    description:
      "A stainless steel chain link necklace with a lobster clasp. Waterproof, tarnish-resistant, and built for daily wear.",
    details: [
      "316L stainless steel",
      "Waterproof & tarnish-resistant",
      "Lobster clasp closure",
      "18-inch length",
    ],
    palette: ["#d4d4d8", "#71717a"],
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559128625-ca4df9a6e17b?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 45,
  },
  {
    slug: "lume-crew-socks",
    name: "Lume Crew Socks",
    category: "accessories",
    price: 18,
    colors: ["Mixed Pack"],
    sizes: ["One Size"],
    description:
      "A three-pack of ribbed crew socks in signature Agent Lume colors. Cushioned sole, arch support, and reinforced heel.",
    details: [
      "3-pack, cotton-nylon blend",
      "Cushioned sole & arch support",
      "Reinforced heel & toe",
      "Ribbed leg band",
    ],
    palette: ["#f0abfc", "#a21caf"],
    image: "https://images.unsplash.com/photo-1631180543602-727e1197619d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1631180543602-727e1197619d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 62,
  },
  {
    slug: "reflective-phone-pouch",
    name: "Reflective Phone Pouch",
    category: "accessories",
    price: 26,
    colors: ["Reflective Silver", "Black"],
    sizes: ["One Size"],
    description:
      "A slim phone pouch in reflective material with a detachable wrist strap. Fits phones up to 6.7 inches.",
    details: [
      "Reflective polyester shell",
      "Detachable wrist strap",
      "Fits phones up to 6.7 inches",
      "Magnetic snap closure",
    ],
    palette: ["#a1a1aa", "#27272a"],
    image: "https://images.unsplash.com/photo-1680576555742-9a3134da9ef7?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1680576555742-9a3134da9ef7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1657603465180-d0fe7b61909b?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 27,
  },
];

export const categoryLabels: Record<string, string> = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
};

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4) {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, count);
}

