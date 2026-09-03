import { Product } from "@/lib/types";

export const products: Product[] = [
  {
    slug: "ridgeline-field-jacket",
    name: "Ridgeline Field Jacket",
    category: "men",
    price: 168,
    compareAtPrice: 210,
    colors: ["Moss", "Slate", "Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A weatherproof field jacket built for shifting seasons, cut from a dense cotton-nylon twill with a brushed interior.",
    details: [
      "Water-resistant 60/40 twill shell",
      "Corozo nut buttons, storm flap placket",
      "Four bellows pockets with flap closure",
      "Brushed cotton lining through the body",
    ],
    palette: ["#3f4a34", "#22281c"],
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
    ],
    isBestseller: true,
  },
  {
    slug: "harbor-wool-overcoat",
    name: "Harbor Wool Overcoat",
    category: "men",
    price: 285,
    colors: ["Charcoal", "Camel"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "An unlined overcoat in a heavyweight Italian wool melton, tailored with a full canvas front and horn buttons.",
    details: [
      "80% wool / 20% nylon melton",
      "Full canvas construction",
      "Interior phone and passport pockets",
      "Dry clean only",
    ],
    palette: ["#4a4238", "#2a251f"],
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    slug: "founders-oxford-shirt",
    name: "Founder's Oxford Shirt",
    category: "men",
    price: 78,
    colors: ["White", "Sky", "Ink"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "A button-down oxford woven from long-staple cotton, garment washed for a soft, lived-in hand from day one.",
    details: [
      "100% long-staple cotton oxford",
      "Mother-of-pearl buttons",
      "Box pleat with locker loop",
      "Garment washed for softness",
    ],
    palette: ["#dcd6c4", "#a9a28c"],
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441ec157?auto=format&fit=crop&w=1000&q=80",
    ],
    isNew: true,
  },
  {
    slug: "keeper-selvedge-denim",
    name: "Keeper Selvedge Denim",
    category: "men",
    price: 148,
    colors: ["Indigo", "Black"],
    sizes: ["28", "30", "32", "34", "36"],
    description:
      "Straight-leg jeans in a 13oz Japanese selvedge denim that will crease and fade with wear.",
    details: [
      "13oz Japanese selvedge denim",
      "Button fly, chain-stitched hem",
      "Straight leg, mid rise",
      "Rivet reinforced pockets",
    ],
    palette: ["#2c3a52", "#161d29"],
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    slug: "aster-silk-blouse",
    name: "Aster Silk Blouse",
    category: "women",
    price: 132,
    colors: ["Ivory", "Terracotta", "Black"],
    sizes: ["XS", "S", "M", "L"],
    description:
      "A fluid silk blouse with a soft draped collar and mother-of-pearl buttons, cut for effortless layering.",
    details: [
      "100% mulberry silk crepe de chine",
      "Draped tie collar",
      "Dropped shoulder seam",
      "Hand wash cold",
    ],
    palette: ["#b5522f", "#7a331a"],
    image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=1000&q=80",
    ],
    isNew: true,
  },
  {
    slug: "meridian-wide-trouser",
    name: "Meridian Wide Trouser",
    category: "women",
    price: 118,
    colors: ["Stone", "Black", "Olive"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "High-waisted wide-leg trousers in a fluid tencel blend that moves with you and holds a clean line.",
    details: [
      "Tencel-viscose blend",
      "High rise, wide leg",
      "Interior waist tie",
      "Side seam pockets",
    ],
    palette: ["#c8bfa4", "#8f8467"],
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    slug: "spring-canvas-dress",
    name: "Spring Canvas Dress",
    category: "women",
    price: 156,
    colors: ["Sage", "Ivory"],
    sizes: ["XS", "S", "M", "L"],
    description:
      "A midi shirt dress in brushed cotton canvas with a self-belt and generous chest pockets.",
    details: [
      "100% brushed cotton canvas",
      "Self-fabric belt included",
      "Midi length, front button placket",
      "Twin chest pockets",
    ],
    palette: ["#6b7a5e", "#3d4936"],
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
    ],
    isBestseller: true,
  },
  {
    slug: "glacier-knit-sweater",
    name: "Glacier Knit Sweater",
    category: "women",
    price: 142,
    colors: ["Cream", "Dusty Blue", "Charcoal"],
    sizes: ["XS", "S", "M", "L"],
    description:
      "A relaxed crewneck sweater knit from a merino-cashmere blend for warmth without the bulk.",
    details: [
      "85% merino wool / 15% cashmere",
      "Ribbed cuffs, hem, and collar",
      "Relaxed, dropped shoulder fit",
      "Hand wash or dry clean",
    ],
    palette: ["#9fb2c4", "#54697c"],
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    slug: "junior-trail-anorak",
    name: "Junior Trail Anorak",
    category: "kids",
    price: 84,
    colors: ["Moss", "Sunflower"],
    sizes: ["4Y", "6Y", "8Y", "10Y", "12Y"],
    description:
      "A packable, water-resistant anorak sized for kids who don't slow down for weather.",
    details: [
      "Water-resistant ripstop shell",
      "Packs into its own chest pocket",
      "Elastic cuffs and hem",
      "Reflective trim for visibility",
    ],
    palette: ["#c9a63f", "#8a6f22"],
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=80",
    ],
    isNew: true,
  },
  {
    slug: "little-camper-dungarees",
    name: "Little Camper Dungarees",
    category: "kids",
    price: 62,
    colors: ["Denim", "Corduroy Tan"],
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    description:
      "Durable dungarees with reinforced knees and adjustable straps built to outlast a season of play.",
    details: [
      "Reinforced double-knee construction",
      "Adjustable elastic straps",
      "Brass hardware buckles",
      "Machine washable",
    ],
    palette: ["#4c6483", "#293b52"],
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    slug: "sprout-organic-tee-set",
    name: "Sprout Organic Tee Set",
    category: "kids",
    price: 38,
    colors: ["Mixed Pack"],
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
    description:
      "A three-pack of tees in certified organic cotton jersey, cut generous for growing kids.",
    details: [
      "3-pack, GOTS certified organic cotton",
      "Tagless neck label",
      "Reinforced shoulder seams",
      "Machine washable",
    ],
    palette: ["#7a8f6b", "#465538"],
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    slug: "acorn-rain-boots",
    name: "Acorn Rain Boots",
    category: "kids",
    price: 46,
    colors: ["Forest", "Marigold"],
    sizes: ["9K", "11K", "13K", "1Y", "3Y"],
    description:
      "Natural rubber rain boots with a grippy tread and an easy pull-tab for small hands.",
    details: [
      "Natural rubber construction",
      "Cushioned removable insole",
      "Slip-resistant tread",
      "Wipe clean",
    ],
    palette: ["#3d5a3a", "#22321f"],
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541597455068-49e3562bdfa4?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    slug: "waxed-canvas-tote",
    name: "Waxed Canvas Tote",
    category: "accessories",
    price: 96,
    colors: ["Field Tan", "Black"],
    sizes: ["One Size"],
    description:
      "A hard-wearing tote in waxed canvas with bridle leather handles that only get better with age.",
    details: [
      "18oz waxed cotton canvas",
      "Full-grain bridle leather handles",
      "Interior zip and slip pockets",
      "Solid brass hardware",
    ],
    palette: ["#a9905f", "#6b5936"],
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80",
    ],
    isBestseller: true,
  },
  {
    slug: "compass-leather-belt",
    name: "Compass Leather Belt",
    category: "accessories",
    price: 58,
    colors: ["Chestnut", "Black"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "A full-grain leather belt with a solid brass buckle, built to be resoled — or in this case, re-buckled — for life.",
    details: [
      "Full-grain vegetable-tanned leather",
      "Solid brass roller buckle",
      "1.25 inch width",
      "Made to age and patina",
    ],
    palette: ["#6b4a30", "#3c2a1b"],
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    slug: "summit-merino-beanie",
    name: "Summit Merino Beanie",
    category: "accessories",
    price: 34,
    colors: ["Charcoal", "Rust", "Natural"],
    sizes: ["One Size"],
    description:
      "A ribbed beanie knit from fine merino wool, warm enough for the trail and soft enough for every day.",
    details: [
      "100% fine merino wool",
      "Double-layer ribbed cuff",
      "Regular fit, unisex",
      "Hand wash cold",
    ],
    palette: ["#5c5648", "#302c24"],
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80",
    ],
    isNew: true,
  },
  {
    slug: "voyager-crossbody-bag",
    name: "Voyager Crossbody Bag",
    category: "accessories",
    price: 74,
    colors: ["Olive", "Black"],
    sizes: ["One Size"],
    description:
      "A compact crossbody in coated canvas and leather trim, sized for the essentials and nothing more.",
    details: [
      "Coated canvas body, leather trim",
      "Adjustable webbing strap",
      "Interior card slots",
      "Magnetic flap closure",
    ],
    palette: ["#5a5f3f", "#333624"],
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80",
    ],
  },
];

export const categoryLabels: Record<string, string> = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
};

export const categoryImages: Record<string, string> = {
  men: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1200&q=80",
  women: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
  kids: "https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=1200&q=80",
  accessories: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80",
};

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4) {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, count);
}
