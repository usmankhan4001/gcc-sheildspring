"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { navCategories, site } from "@/lib/site";

export default function Header() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="border-b border-line bg-ink py-2 text-center text-xs tracking-wide text-paper">
        Free shipping on orders over $120 &middot; Easy 30-day returns
      </div>
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <button
          type="button"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="block h-0.5 w-5 bg-ink" />
          <span className="block h-0.5 w-5 bg-ink" />
          <span className="block h-0.5 w-5 bg-ink" />
        </button>

        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="text-sm font-medium tracking-wide text-ink/80 transition hover:text-accent"
            >
              {cat.label}
            </Link>
          ))}
          <Link
            href="/shop"
            className="text-sm font-medium tracking-wide text-ink/80 transition hover:text-accent"
          >
            All
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-full border border-ink/15 px-3 py-2 text-sm transition hover:border-accent hover:text-accent"
            aria-label="View cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6 5 3H2" />
              <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" />
              <circle cx="17" cy="20" r="1.4" fill="currentColor" stroke="none" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-rust px-1 text-[11px] font-semibold text-paper">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col border-t border-line bg-paper px-5 py-3 md:hidden">
          {navCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="border-b border-line/60 py-3 text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {cat.label}
            </Link>
          ))}
          <Link
            href="/shop"
            className="py-3 text-sm font-medium"
            onClick={() => setMenuOpen(false)}
          >
            All Products
          </Link>
        </nav>
      )}
    </header>
  );
}
