import type { Metadata } from "next";
import ShopGrid from "@/components/ShopGrid";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse the full Agent Lume collection of streetwear, basics, and accessories.",
};

export default function ShopPage() {
  return (
    <ShopGrid
      title="All Products"
      description="Streetwear, basics, and accessories for men, women, and kids — designed for self-expression, built for everyday wear."
      products={products}
    />
  );
}
