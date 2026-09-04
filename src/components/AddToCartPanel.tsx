"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { Product } from "@/lib/types";

export default function AddToCartPanel({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  function handleAddToCart() {
    addItem(product.slug, size, color, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  function handleBuyNow() {
    addItem(product.slug, size, color, quantity);
    router.push("/cart");
  }

  return (
    <div className="space-y-6">
      {/* In Stock & Fast Shipping Indicator */}
      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200/60 rounded-lg px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>In Stock &middot; Ready to ship in 24 hours</span>
      </div>

      {/* Color Selection */}
      <div>
        <div className="flex items-center justify-between text-sm">
          <p className="font-semibold text-ink">
            Color: <span className="font-normal text-muted">{color}</span>
          </p>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition ${
                color === c
                  ? "border-ink bg-ink text-paper shadow-sm"
                  : "border-ink/20 text-ink/80 hover:border-ink/50 bg-paper"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <div className="flex items-center justify-between text-sm">
          <p className="font-semibold text-ink">
            Size: <span className="font-normal text-muted">{size}</span>
          </p>
          <button
            type="button"
            onClick={() => setShowSizeGuide(true)}
            className="text-xs font-medium text-accent hover:underline flex items-center gap-1"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.3 8.7 8.7 21.3c-1 1-2.6 1-3.6 0l-1.4-1.4c-1-1-1-2.6 0-3.6L16.3 3.7c1-1 2.6-1 3.6 0l1.4 1.4c1 1 1 2.6 0 3.6z" />
              <path d="m14.5 5.5 4 4" />
              <path d="m11.5 8.5 2 2" />
              <path d="m8.5 11.5 2 2" />
              <path d="m5.5 14.5 2 2" />
            </svg>
            Size Guide
          </button>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`min-w-12 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                size === s
                  ? "border-ink bg-ink text-paper shadow-sm"
                  : "border-ink/20 text-ink/80 hover:border-ink/50 bg-paper"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div>
        <p className="text-sm font-semibold text-ink">Quantity</p>
        <div className="mt-2.5 flex w-32 items-center justify-between rounded-xl border border-ink/20 bg-paper p-1">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-8 w-8 rounded-lg text-sm font-semibold text-ink transition hover:bg-paper-2 disabled:opacity-30"
          >
            −
          </button>
          <span className="text-sm font-bold text-ink">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => q + 1)}
            className="h-8 w-8 rounded-lg text-sm font-semibold text-ink transition hover:bg-paper-2"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex-1 rounded-full px-6 py-4 text-sm font-bold shadow-md transition duration-200 ${
            added
              ? "bg-emerald-600 text-paper"
              : "bg-ink text-paper hover:bg-accent-dark hover:scale-[1.01]"
          }`}
        >
          {added ? "✓ Added to Your Cart!" : "Add to Cart"}
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="flex-1 rounded-full border-2 border-ink bg-transparent px-6 py-4 text-sm font-bold text-ink transition duration-200 hover:bg-ink hover:text-paper hover:scale-[1.01]"
        >
          Buy Now &middot; ${(product.price * quantity).toFixed(2)}
        </button>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm p-4">
          <div className="max-w-md w-full rounded-2xl bg-paper p-6 shadow-2xl border border-line">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h3 className="font-display text-lg font-bold text-ink">Size &amp; Fit Guide</h3>
              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                className="rounded-full p-1 text-muted hover:text-ink hover:bg-paper-2"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs text-muted">
              <p className="font-medium text-ink">Streetwear Relaxed Fit:</p>
              <p>All Agent Lume tops and hoodies feature an oversized drop-shoulder boxy cut. If you prefer a tailored fit, we suggest ordering one size down.</p>
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-line text-ink">
                      <th className="py-2">Size</th>
                      <th className="py-2">Chest (in)</th>
                      <th className="py-2">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/60">
                    <tr><td className="py-1.5 font-semibold text-ink">XS</td><td>34-36</td><td>27</td></tr>
                    <tr><td className="py-1.5 font-semibold text-ink">S</td><td>36-38</td><td>28</td></tr>
                    <tr><td className="py-1.5 font-semibold text-ink">M</td><td>38-40</td><td>29</td></tr>
                    <tr><td className="py-1.5 font-semibold text-ink">L</td><td>42-44</td><td>30</td></tr>
                    <tr><td className="py-1.5 font-semibold text-ink">XL</td><td>46-48</td><td>31</td></tr>
                    <tr><td className="py-1.5 font-semibold text-ink">XXL</td><td>50-52</td><td>32</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowSizeGuide(false)}
              className="mt-6 w-full rounded-full bg-ink py-2.5 text-xs font-semibold text-paper"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

