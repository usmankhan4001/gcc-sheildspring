"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";
import ProductImage from "@/components/ProductImage";
import { getProductBySlug } from "@/data/products";

const FREE_SHIPPING_THRESHOLD = 120;

export default function CartPage() {
  const { lines, updateQuantity, removeItem, subtotal, isHydrated } = useCart();

  if (!isHydrated) {
    return <div className="container-page py-16" />;
  }

  if (lines.length === 0) {
    return (
      <div className="container-page flex flex-col items-center py-24 text-center">
        <h1 className="font-display text-2xl">Your cart is empty</h1>
        <p className="mt-3 text-sm text-muted">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/shop"
          className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-accent-dark"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl">Your Cart</h1>

      <p className="mt-4 rounded-md bg-paper-2 px-4 py-3 text-sm text-ink/80">
        {remainingForFreeShipping > 0
          ? `Add $${remainingForFreeShipping.toFixed(2)} more for free shipping.`
          : "You've unlocked free shipping!"}
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="divide-y divide-line lg:col-span-2">
          {lines.map((line) => {
            const product = getProductBySlug(line.slug);
            if (!product) return null;
            return (
              <div key={`${line.slug}-${line.size}-${line.color}`} className="flex gap-4 py-6">
                <Link
                  href={`/product/${product.slug}`}
                  className="h-28 w-24 shrink-0 overflow-hidden rounded-md bg-paper-2"
                >
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-3">
                    <div>
                      <Link
                        href={`/product/${product.slug}`}
                        className="text-sm font-medium text-ink hover:text-accent"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-1 text-xs text-muted">
                        {line.color} &middot; Size {line.size}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-ink">
                      ${(product.price * line.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-ink/15">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        className="px-3 py-1.5 text-sm"
                        onClick={() =>
                          updateQuantity(line.slug, line.size, line.color, line.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        className="px-3 py-1.5 text-sm"
                        onClick={() =>
                          updateQuantity(line.slug, line.size, line.color, line.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="text-xs font-medium text-muted underline hover:text-rust"
                      onClick={() => removeItem(line.slug, line.size, line.color)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-fit rounded-md border border-line p-6">
          <h2 className="font-display text-lg">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-ink/80">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-ink/80">
              <span>Shipping</span>
              <span>{subtotal >= FREE_SHIPPING_THRESHOLD ? "Free" : "Calculated at checkout"}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-line pt-4 text-base font-semibold">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block rounded-full bg-ink px-6 py-3.5 text-center text-sm font-semibold text-paper transition hover:bg-accent-dark"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/shop"
            className="mt-3 block text-center text-sm text-muted hover:text-accent"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
