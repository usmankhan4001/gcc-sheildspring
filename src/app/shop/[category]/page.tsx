import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopGrid from "@/components/ShopGrid";
import { products, categoryLabels } from "@/data/products";
import { Category } from "@/lib/types";

const VALID_CATEGORIES: Category[] = ["men", "women", "kids", "accessories"];

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const label = categoryLabels[category];
  return {
    title: label ? `${label}'s Clothing` : "Shop",
    description: label
      ? `Shop the Shieldspring ${label.toLowerCase()} collection.`
      : "Shop Shieldspring's clothing collection.",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category as Category)) {
    notFound();
  }

  const filtered = products.filter((p) => p.category === category);
  const label = categoryLabels[category];

  return (
    <ShopGrid
      title={label}
      description={`Shop durable ${label.toLowerCase()} essentials — cut to last, made to be worn.`}
      products={filtered}
      activeCategory={category}
    />
  );
}
