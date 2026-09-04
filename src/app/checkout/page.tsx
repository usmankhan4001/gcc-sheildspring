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
  return `AL-${random}`;
}

export default function CheckoutPage() {
  const { lines, subtotal, clearCart, isHydrated } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountMsg, setDiscountMsg] = useState("");

  const discountAmount = (subtotal * discountPercent) / 100;
  const discountedSubtotal = subtotal - discountAmount;
  const shipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD || discountedSubtotal === 0 ? 0 : SHIPPING_COST;
  const total = discountedSubtotal + shipping;

  function handleCardNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(" ") || val;
    setCardNumber(formatted);
  }

  function handleExpiryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (val.length >= 3) {
      setExpiry(`${val.slice(0, 2)}/${val.slice(2)}`);
    } else {
      setExpiry(val);
    }
  }

  function handleCvcChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCvc(val);
  }

  function applyDiscount(e: React.FormEvent) {
    e.preventDefault();
    const clean = discountCode.trim().toUpperCase();
    if (clean === "WELCOME10" || clean === "LUME10") {
      setDiscountPercent(10);
      setDiscountMsg("10% discount applied!");
    } else if (clean === "LUME20" || clean === "DROP20") {
      setDiscountPercent(20);
      setDiscountMsg("20% discount applied!");
    } else {
      setDiscountMsg("Invalid promo code");
    }
  }

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
      window.localStorage.setItem("agentlume-last-order", JSON.stringify(snapshot));
    } catch {
      // ignore storage errors
    }

    setTimeout(() => {
      clearCart();
      router.push(`/checkout/confirmation?order=${orderNumber}`);
    }, 800);
  }

  if (isHydrated && lines.length === 0) {
    return (
      <div className="container-page flex flex-col items-center py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Nothing to check out</h1>
        <p className="mt-3 text-sm text-muted">Your cart is empty right now.</p>
        <Link
          href="/shop"
          className="mt-6 rounded-full bg-ink px-8 py-3.5 text-sm font-semibold text-paper shadow-md transition hover:bg-accent-dark hover:scale-[1.02]"
        >
          Explore All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold">Express Checkout</h1>
        <p className="mt-2 text-sm text-muted">
          Complete your order below. All transactions are secure and encrypted.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* Contact Details */}
          <fieldset className="rounded-2xl border border-line bg-paper p-6 shadow-sm">
            <legend className="font-display text-lg font-bold text-ink px-2">1. Contact Information</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input
                required
                type="email"
                name="email"
                placeholder="Email address (for order updates)"
                className="col-span-2 rounded-xl border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
              <input
                required
                type="text"
                name="firstName"
                placeholder="First name"
                className="rounded-xl border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
              <input
                required
                type="text"
                name="lastName"
                placeholder="Last name"
                className="rounded-xl border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone number (for delivery SMS)"
                className="col-span-2 rounded-xl border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
            </div>
          </fieldset>

          {/* Shipping Address */}
          <fieldset className="rounded-2xl border border-line bg-paper p-6 shadow-sm">
            <legend className="font-display text-lg font-bold text-ink px-2">2. Shipping Address</legend>
            <div className="mt-4 grid gap-4">
              <input
                required
                type="text"
                name="address"
                placeholder="Street address (e.g. 123 Main St, Apt 4B)"
                className="rounded-xl border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
              <div className="grid gap-4 sm:grid-cols-3">
                <input
                  required
                  type="text"
                  name="city"
                  placeholder="City"
                  className="rounded-xl border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                />
                <input
                  required
                  type="text"
                  name="postalCode"
                  placeholder="Postal code"
                  className="rounded-xl border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                />
                <input
                  required
                  type="text"
                  name="country"
                  defaultValue="United States"
                  placeholder="Country"
                  className="rounded-xl border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                />
              </div>
            </div>
          </fieldset>

          {/* Payment Details */}
          <fieldset className="rounded-2xl border border-line bg-paper p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <legend className="font-display text-lg font-bold text-ink px-2">3. Payment Details</legend>
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <span className="rounded border border-line bg-paper-2 px-1.5 py-0.5 text-[10px] font-bold text-ink">VISA</span>
                <span className="rounded border border-line bg-paper-2 px-1.5 py-0.5 text-[10px] font-bold text-ink">MC</span>
                <span className="rounded border border-line bg-paper-2 px-1.5 py-0.5 text-[10px] font-bold text-ink">AMEX</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Encrypted 256-bit SSL secured transaction
            </p>
            <div className="mt-4 grid gap-4">
              <input
                required
                type="text"
                name="cardName"
                placeholder="Name on card"
                className="rounded-xl border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
              <input
                required
                type="text"
                inputMode="numeric"
                name="cardNumber"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="Card number (16 digits)"
                maxLength={19}
                className="rounded-xl border border-ink/20 px-4 py-3 text-sm font-mono tracking-wider focus:border-accent focus:outline-none"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  type="text"
                  name="expiry"
                  value={expiry}
                  onChange={handleExpiryChange}
                  placeholder="MM / YY"
                  maxLength={5}
                  className="rounded-xl border border-ink/20 px-4 py-3 text-sm font-mono focus:border-accent focus:outline-none"
                />
                <input
                  required
                  type="text"
                  inputMode="numeric"
                  name="cvc"
                  value={cvc}
                  onChange={handleCvcChange}
                  placeholder="CVC (3 or 4 digits)"
                  maxLength={4}
                  className="rounded-xl border border-ink/20 px-4 py-3 text-sm font-mono focus:border-accent focus:outline-none"
                />
              </div>
            </div>
          </fieldset>
        </div>

        {/* Order Summary & Placement */}
        <div className="h-fit rounded-2xl border border-line bg-paper-2/60 p-6 shadow-sm space-y-6">
          <h2 className="font-display text-xl font-bold text-ink">Your Order</h2>
          <div className="divide-y divide-line/70 space-y-3 text-sm max-h-64 overflow-y-auto pr-1">
            {lines.map((line) => {
              const product = getProductBySlug(line.slug);
              if (!product) return null;
              return (
                <div key={`${line.slug}-${line.size}-${line.color}`} className="flex justify-between gap-3 pt-3 first:pt-0">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-ink truncate">{product.name}</p>
                    <p className="text-xs text-muted">
                      {line.color} / {line.size} &times; {line.quantity}
                    </p>
                  </div>
                  <span className="shrink-0 font-bold text-ink">
                    ${(product.price * line.quantity).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Promo code form at checkout */}
          <div className="border-t border-line pt-4 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Discount code"
                className="w-full rounded-xl border border-ink/20 bg-paper px-3 py-2 text-xs uppercase focus:border-accent focus:outline-none"
              />
              <button
                type="button"
                onClick={applyDiscount}
                className="rounded-xl bg-ink px-4 py-2 text-xs font-bold text-paper transition hover:bg-accent-dark shrink-0"
              >
                Apply
              </button>
            </div>
            {discountMsg && (
              <p className={`text-xs font-medium ${discountPercent > 0 ? "text-emerald-600" : "text-rust"}`}>
                {discountMsg}
              </p>
            )}
          </div>

          <div className="space-y-2 border-t border-line pt-4 text-sm">
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
              <span>Shipping</span>
              <span className="font-medium text-ink">
                {shipping === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-lg font-bold text-ink">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-ink py-4 text-sm font-bold text-paper shadow-md transition duration-200 hover:bg-accent-dark hover:scale-[1.01] disabled:opacity-60"
          >
            {submitting ? "Processing Order..." : `Place Order &middot; $${total.toFixed(2)}`}
          </button>

          <p className="text-center text-xs text-muted">
            30-day money-back guarantee &middot; Free returns
          </p>
        </div>
      </form>
    </div>
  );
}

