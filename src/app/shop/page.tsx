import type { Metadata } from "next";
import ShopGrid from "@/components/ShopGrid";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse the full Shieldspring collection of clothing and accessories.",
};

export default function ShopPage() {
  return (
    <ShopGrid
      title="All Products"
      description="Field jackets, knitwear, denim, and accessories for men, women, and kids — built to last a lot longer than a season."
      products={products}
    />
  );
}
