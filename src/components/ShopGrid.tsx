"use client";

import { useState, useMemo } from "react";
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
  const [sortBy, setSortBy] = useState<string>("featured");

  const sortedProducts = useMemo(() => {
    const list = [...products];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "new":
        return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case "featured":
      default:
        return list;
    }
  }, [products, sortBy]);

  return (
    <div className="container-page py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <nav className="mb-3 flex items-center gap-2 text-xs font-medium text-muted">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <span className="text-ink font-semibold">Shop</span>
            {activeCategory && (
              <>
                <span>/</span>
                <span className="text-accent capitalize">{activeCategory}</span>
              </>
            )}
          </nav>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink">{title}</h1>
          <p className="mt-2 text-sm text-muted">{description}</p>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 self-start md:self-end">
          <label htmlFor="sort" className="text-xs font-semibold text-muted">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-ink/20 bg-paper px-3 py-2 text-xs font-semibold text-ink focus:border-accent focus:outline-none shadow-sm"
          >
            <option value="featured">Featured</option>
            <option value="new">New Releases</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Category Pills & Count */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/shop"
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
              !activeCategory
                ? "bg-ink text-paper shadow-sm"
                : "border border-ink/15 text-ink/70 hover:border-ink/40 bg-paper"
            }`}
          >
            All Products
          </Link>
          {navCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                activeCategory === cat.slug
                  ? "bg-ink text-paper shadow-sm"
                  : "border border-ink/15 text-ink/70 hover:border-ink/40 bg-paper"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
        <p className="text-xs font-semibold text-muted">
          Showing <span className="text-ink">{sortedProducts.length}</span> pieces
        </p>
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="mt-20 text-center">
          <p className="text-base font-semibold text-ink">No products found</p>
          <p className="mt-1 text-sm text-muted">Check back soon for upcoming drops.</p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {sortedProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

