import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";
import { navCategories } from "@/lib/site";

export default function ShopGrid({
  title,
  description,
  products,
  activeCategory,
}: {
  title: string;
  description: string;
  products: Product[];
  activeCategory?: string;
}) {
  return (
    <div className="container-page py-12">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl">{title}</h1>
        <p className="mt-3 text-sm text-muted">{description}</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-line pb-6">
        <Link
          href="/shop"
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            !activeCategory
              ? "bg-ink text-paper"
              : "border border-ink/15 text-ink/70 hover:border-ink/40"
          }`}
        >
          All
        </Link>
        {navCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/shop/${cat.slug}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeCategory === cat.slug
                ? "bg-ink text-paper"
                : "border border-ink/15 text-ink/70 hover:border-ink/40"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted">
          No products found in this category yet.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
