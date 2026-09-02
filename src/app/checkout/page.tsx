"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { getProductBySlug } from "@/data/products";

const FREE_SHIPPING_THRESHOLD = 120;
const SHIPPING_COST = 8;

function generateOrderNumber() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `SS-${random}`;
}

export default function CheckoutPage() {
  const { lines, subtotal, clearCart, isHydrated } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const orderNumber = generateOrderNumber();
    const snapshot = {
      orderNumber,
      email: form.get("email"),
      total,
      itemCount: lines.reduce((sum, l) => sum + l.quantity, 0),
    };

    try {
      window.localStorage.setItem("shieldspring-last-order", JSON.stringify(snapshot));
    } catch {
      // ignore storage errors
    }

    clearCart();
    router.push(`/checkout/confirmation?order=${orderNumber}`);
  }

  if (isHydrated && lines.length === 0) {
    return (
      <div className="container-page flex flex-col items-center py-24 text-center">
        <h1 className="font-display text-2xl">Nothing to check out</h1>
        <p className="mt-3 text-sm text-muted">Your cart is empty right now.</p>
        <Link
          href="/shop"
          className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-accent-dark"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl">Checkout</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        This is a demo checkout — no payment is actually processed. Fill in any
        details below to see the order confirmation flow.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <fieldset>
            <legend className="font-display text-lg">Contact</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input
                required
                type="email"
                name="email"
                placeholder="Email address"
                className="col-span-2 rounded-md border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
              <input
                required
                type="text"
                name="firstName"
                placeholder="First name"
                className="rounded-md border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
              <input
                required
                type="text"
                name="lastName"
                placeholder="Last name"
                className="rounded-md border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-display text-lg">Shipping Address</legend>
            <div className="mt-4 grid gap-4">
              <input
                required
                type="text"
                name="address"
                placeholder="Street address"
                className="rounded-md border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
              <div className="grid gap-4 sm:grid-cols-3">
                <input
                  required
                  type="text"
                  name="city"
                  placeholder="City"
                  className="rounded-md border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                />
                <input
                  required
                  type="text"
                  name="postalCode"
                  placeholder="Postal code"
                  className="rounded-md border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                />
                <input
                  required
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="rounded-md border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-display text-lg">Payment</legend>
            <div className="mt-4 grid gap-4">
              <input
                required
                type="text"
                name="cardName"
                placeholder="Name on card"
                className="rounded-md border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
              <input
                required
                type="text"
                inputMode="numeric"
                name="cardNumber"
                placeholder="Card number"
                maxLength={19}
                className="rounded-md border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  maxLength={5}
                  className="rounded-md border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                />
                <input
                  required
                  type="text"
                  inputMode="numeric"
                  name="cvc"
                  placeholder="CVC"
                  maxLength={4}
                  className="rounded-md border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                />
              </div>
            </div>
          </fieldset>
        </div>

        <div className="h-fit rounded-md border border-line p-6">
          <h2 className="font-display text-lg">Order Summary</h2>
          <div className="mt-4 space-y-3 text-sm">
            {lines.map((line) => {
              const product = getProductBySlug(line.slug);
              if (!product) return null;
              return (
                <div key={`${line.slug}-${line.size}-${line.color}`} className="flex justify-between gap-3">
                  <span className="text-ink/80">
                    {product.name} &times;{line.quantity}
                    <span className="block text-xs text-muted">
                      {line.color} / {line.size}
                    </span>
                  </span>
                  <span className="shrink-0 font-medium">
                    ${(product.price * line.quantity).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm text-ink/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-line pt-4 text-base font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition hover:bg-accent-dark disabled:opacity-60"
          >
            {submitting ? "Placing order…" : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
