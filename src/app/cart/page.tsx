"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import ProductImage from "@/components/ProductImage";
import { getProductBySlug } from "@/data/products";
import { navCategories } from "@/lib/site";
import PaymentBadges from "@/components/PaymentBadges";

const FREE_SHIPPING_THRESHOLD = 120;

export default function CartPage() {
  const { lines, updateQuantity, removeItem, subtotal, isHydrated } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  if (!isHydrated) {
    return <div className="container-page py-16" />;
  }

  if (lines.length === 0) {
    return (
      <div className="container-page flex flex-col items-center py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-paper-2 border border-line text-muted mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 6h15l-1.5 9h-12z" />
            <path d="M6 6 5 3H2" />
            <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" />
            <circle cx="17" cy="20" r="1.4" fill="currentColor" stroke="none" />
          </svg>
        </div>
        <h1 className="font-display text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-3 max-w-sm text-sm text-muted">Looks like you haven&apos;t added any pieces yet. Explore our latest drops below.</p>
        <Link
          href="/shop"
          className="mt-6 rounded-full bg-ink px-8 py-3.5 text-sm font-semibold text-paper shadow-md transition hover:bg-accent-dark hover:scale-[1.02]"
        >
          Explore All Products
        </Link>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl">
          {navCategories.map(cat => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="rounded-xl border border-line bg-paper-2 p-4 text-xs font-semibold text-ink transition hover:border-accent hover:text-accent text-center"
            >
              Shop {cat.label} &rarr;
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  function handleApplyPromo(e: React.FormEvent) {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");
    const clean = promoCode.trim().toUpperCase();
    if (clean === "WELCOME10" || clean === "LUME10") {
      setDiscountPercent(10);
      setPromoSuccess("10% discount applied!");
    } else if (clean === "LUME20" || clean === "DROP20") {
      setDiscountPercent(20);
      setPromoSuccess("20% VIP discount applied!");
    } else {
      setPromoError("Invalid code. Try 'WELCOME10' for 10% off.");
    }
  }

  const discountAmount = (subtotal * discountPercent) / 100;
  const discountedSubtotal = subtotal - discountAmount;
  const shipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 8;
  const total = discountedSubtotal + shipping;

  return (
    <div className="container-page py-12">
      <div className="flex items-baseline justify-between border-b border-line pb-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold">Shopping Cart</h1>
        <p className="text-xs font-semibold text-muted">
          {lines.reduce((sum, l) => sum + l.quantity, 0)} items in bag
        </p>
      </div>

      {/* Free Shipping Progress Bar */}
      <div className="mt-6 rounded-2xl bg-paper-2 p-5 border border-line">
        <div className="flex items-center justify-between text-xs font-semibold text-ink">
          <span>
            {remainingForFreeShipping > 0
              ? `Add $${remainingForFreeShipping.toFixed(2)} more for Free Shipping`
              : "🎉 You've unlocked Free Express Shipping!"}
          </span>
          <span className="text-muted">{freeShippingProgress}%</span>
        </div>
        <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        {/* Cart Items List */}
        <div className="divide-y divide-line lg:col-span-2">
          {lines.map((line) => {
            const product = getProductBySlug(line.slug);
            if (!product) return null;
            return (
              <div key={`${line.slug}-${line.size}-${line.color}`} className="flex gap-5 py-6">
                <Link
                  href={`/product/${product.slug}`}
                  className="h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-paper-2 border border-line"
                >
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-3">
                    <div>
                      <Link
                        href={`/product/${product.slug}`}
                        className="text-sm md:text-base font-semibold text-ink hover:text-accent transition"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-1 text-xs text-muted">
                        Color: <span className="text-ink font-medium">{line.color}</span> &middot; Size:{" "}
                        <span className="text-ink font-medium">{line.size}</span>
                      </p>
                      <p className="mt-1 text-xs text-emerald-600 font-medium">In Stock &middot; Ships today</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold text-ink">
                        ${(product.price * line.quantity).toFixed(2)}
                      </p>
                      {line.quantity > 1 && (
                        <p className="text-[11px] text-muted">${product.price} each</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-xl border border-ink/20 bg-paper">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        className="px-3 py-1.5 text-sm font-bold text-ink hover:bg-paper-2 rounded-l-xl"
                        onClick={() =>
                          updateQuantity(line.slug, line.size, line.color, line.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-ink">{line.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        className="px-3 py-1.5 text-sm font-bold text-ink hover:bg-paper-2 rounded-r-xl"
                        onClick={() =>
                          updateQuantity(line.slug, line.size, line.color, line.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="text-xs font-semibold text-muted hover:text-rust transition underline underline-offset-2"
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

        {/* Order Summary Box */}
        <div className="h-fit rounded-2xl border border-line bg-paper-2/50 p-6 shadow-sm space-y-6">
          <h2 className="font-display text-xl font-bold text-ink">Order Summary</h2>

          {/* Promo Code Form */}
          <form onSubmit={handleApplyPromo} className="space-y-2">
            <label className="text-xs font-semibold text-ink">Promo / Gift Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Try 'WELCOME10'"
                className="w-full rounded-xl border border-ink/20 bg-paper px-3 py-2.5 text-xs uppercase placeholder:normal-case focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-paper transition hover:bg-accent-dark shrink-0"
              >
                Apply
              </button>
            </div>
            {promoSuccess && <p className="text-xs text-emerald-600 font-semibold">{promoSuccess}</p>}
            {promoError && <p className="text-xs text-rust font-semibold">{promoError}</p>}
          </form>

          <div className="space-y-3 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-ink/80">
              <span>Subtotal</span>
              <span className="font-medium text-ink">${subtotal.toFixed(2)}</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount ({discountPercent}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-ink/80">
              <span>Estimated Shipping</span>
              <span className="font-medium text-ink">
                {shipping === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-lg font-bold text-ink">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Link
            href="/shop"
            className="block w-full rounded-full bg-ink py-4 text-center text-sm font-bold text-paper shadow-md transition hover:bg-accent-dark hover:scale-[1.01]"
          >
            Continue Shopping
          </Link>

          <div className="border-t border-line pt-4 text-center">
            <PaymentBadges className="justify-center" />
          </div>
        </div>
      </div>
    </div>
  );
}

