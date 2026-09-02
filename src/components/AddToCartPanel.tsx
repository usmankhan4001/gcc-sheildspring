"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { Product } from "@/lib/types";

export default function AddToCartPanel({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  function handleAddToCart() {
    addItem(product.slug, size, color, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    addItem(product.slug, size, color, 1);
    router.push("/cart");
  }

  return (
    <div>
      <div>
        <p className="text-sm font-semibold text-ink">Color: {color}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                color === c
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/20 text-ink/80 hover:border-ink/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-ink">Size: {size}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`min-w-11 rounded-md border px-3 py-2 text-sm transition ${
                size === s
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/20 text-ink/80 hover:border-ink/50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition hover:bg-accent-dark"
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="flex-1 rounded-full border border-ink px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-ink hover:text-paper"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
