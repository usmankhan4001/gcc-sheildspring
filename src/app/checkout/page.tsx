"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { getProductBySlug } from "@/data/products";
import PaymentBadges from "@/components/PaymentBadges";
import { currency, site } from "@/lib/site";
import {
  DEFAULT_SHIPPING_OPTION,
  FREE_SHIPPING_THRESHOLD,
  RETURN_WINDOW_DAYS,
  SHIPPING_OPTIONS,
  ShippingOptionId,
  getShippingOption,
  shippingCostFor,
} from "@/lib/commerce";

const AIRWALLEX_SDK_URL = "https://static.airwallex.com/components/sdk/v1/index.js";
const AIRWALLEX_ENV = process.env.NEXT_PUBLIC_AIRWALLEX_ENV ?? "";

/**
 * "embedded" (default) renders an Airwallex card field on this page.
 * "hosted" redirects the customer to Airwallex's Hosted Checkout page instead,
 * which is the flow Shopify-style stores use.
 */
const HOSTED_CHECKOUT =
  (process.env.NEXT_PUBLIC_AIRWALLEX_CHECKOUT_MODE ?? "embedded") === "hosted";

type AirwallexElement = {
  mount: (target: string | HTMLElement) => void;
  unmount: () => void;
};

declare global {
  interface Window {
    Airwallex?: {
      init: (options: Record<string, unknown>) => void;
      createElement: (type: string, options?: Record<string, unknown>) => AirwallexElement;
      confirmPaymentIntent: (
        options: Record<string, unknown>,
      ) => Promise<{ status?: string; id?: string; error?: unknown }>;
    };
  }
}

function generateOrderNumber() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `AL-${random}`;
}

function loadAirwallexSdk(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Airwallex) return Promise.resolve();

  const existing = document.getElementById("airwallex-sdk") as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Airwallex SDK failed to load")));
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = "airwallex-sdk";
    script.src = AIRWALLEX_SDK_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Airwallex SDK failed to load"));
    document.head.appendChild(script);
  });
}

export default function CheckoutPage() {
  const { lines, subtotal, clearCart, isHydrated } = useCart();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountMsg, setDiscountMsg] = useState("");
  const [shippingOption, setShippingOption] =
    useState<ShippingOptionId>(DEFAULT_SHIPPING_OPTION);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  const [sdkReady, setSdkReady] = useState(false);
  const cardElementRef = useRef<AirwallexElement | null>(null);
  const cardMountedRef = useRef(false);

  const discountAmount = (subtotal * discountPercent) / 100;
  const discountedSubtotal = subtotal - discountAmount;
  const shipping = shippingCostFor(shippingOption, discountedSubtotal);
  const total = discountedSubtotal + shipping;

  const paymentsConfigured = AIRWALLEX_ENV === "demo" || AIRWALLEX_ENV === "prod";

  // Card details are entered inside an Airwallex-hosted iframe. The card
  // number, expiry and CVC never reach this page's DOM, state or our servers.
  // In hosted mode there is nothing to mount — the customer pays on
  // Airwallex's own page.
  useEffect(() => {
    if (!paymentsConfigured || HOSTED_CHECKOUT) return;
    let cancelled = false;

    loadAirwallexSdk()
      .then(() => {
        if (cancelled || !window.Airwallex) return;
        window.Airwallex.init({
          env: AIRWALLEX_ENV,
          origin: window.location.origin,
        });
        if (!cardMountedRef.current) {
          cardElementRef.current = window.Airwallex.createElement("card");
          cardElementRef.current.mount("airwallex-card");
          cardMountedRef.current = true;
        }
        setSdkReady(true);
      })
      .catch(() => {
        if (!cancelled) setError("Secure payment fields could not be loaded.");
      });

    return () => {
      cancelled = true;
    };
  }, [paymentsConfigured]);

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
      setDiscountPercent(0);
      setDiscountMsg("Invalid promo code");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    setError("");

    if (!acceptedTerms) {
      setError("Please accept the Terms of Service and Privacy Policy to continue.");
      return;
    }
    if (!paymentsConfigured) {
      setError("Payments are temporarily unavailable. Please try again later.");
      return;
    }
    if (!HOSTED_CHECKOUT && (!window.Airwallex || !cardElementRef.current)) {
      setError("Secure payment fields are still loading. Please try again in a moment.");
      return;
    }

    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const orderNumber = generateOrderNumber();

    const billing = {
      first_name: String(form.get("firstName") ?? ""),
      last_name: String(form.get("lastName") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      address: {
        street: String(form.get("address") ?? ""),
        city: String(form.get("city") ?? ""),
        postcode: String(form.get("postalCode") ?? ""),
        country_code: String(form.get("countryCode") ?? "US"),
      },
    };

    try {
      const res = await fetch("/api/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          orderNumber,
          email: billing.email,
          lines: lines.map((line) => {
            const product = getProductBySlug(line.slug);
            return {
              name: product?.name ?? line.slug,
              quantity: line.quantity,
              unitPrice: product?.price ?? 0,
            };
          }),
        }),
      });

      if (!res.ok) {
        throw new Error("Could not initialise payment");
      }

      const { id, clientSecret, checkoutUrl } = (await res.json()) as {
        id: string;
        clientSecret: string;
        checkoutUrl: string;
      };

      const snapshot = {
        orderNumber,
        email: billing.email,
        total,
        itemCount: lines.reduce((sum, l) => sum + l.quantity, 0),
        intentId: id,
      };
      try {
        window.localStorage.setItem("agentlume-last-order", JSON.stringify(snapshot));
      } catch {
        // ignore storage errors
      }

      // Hosted Checkout: hand the customer over to Airwallex's own page.
      // The cart is cleared on the confirmation page once the payment is
      // verified, so an abandoned payment does not empty the basket.
      if (HOSTED_CHECKOUT) {
        if (!checkoutUrl) throw new Error("No checkout URL returned");
        window.location.href = checkoutUrl;
        return;
      }

      const airwallex = window.Airwallex;
      if (!airwallex || !cardElementRef.current) {
        throw new Error("Payment fields unavailable");
      }

      const result = await airwallex.confirmPaymentIntent({
        element: cardElementRef.current,
        id,
        client_secret: clientSecret,
        payment_method: { billing },
      });

      if (result?.status && result.status !== "SUCCEEDED") {
        throw new Error("Payment was not completed");
      }

      clearCart();
      router.push(`/checkout/confirmation?order=${orderNumber}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? "Your payment could not be completed. Please check your card details and try again."
          : "Something went wrong. Please try again.",
      );
      setSubmitting(false);
    }
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
        <h1 className="font-display text-3xl md:text-4xl font-bold">Checkout</h1>
        <p className="mt-2 text-sm text-muted">
          All prices are shown in {currency.label} ({currency.code}) and are charged in{" "}
          {currency.code}. Your card is processed by Airwallex — we never see or store
          your full card details.
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
                placeholder="Phone number (for delivery updates)"
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
                <select
                  required
                  name="countryCode"
                  defaultValue="US"
                  className="rounded-xl border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="HK">Hong Kong SAR</option>
                  <option value="SG">Singapore</option>
                  <option value="AE">United Arab Emirates</option>
                </select>
              </div>
            </div>
          </fieldset>

          {/* Shipping Method */}
          <fieldset className="rounded-2xl border border-line bg-paper p-6 shadow-sm">
            <legend className="font-display text-lg font-bold text-ink px-2">3. Shipping Method</legend>
            <div className="mt-4 space-y-3">
              {SHIPPING_OPTIONS.map((option) => {
                const cost = shippingCostFor(option.id, discountedSubtotal);
                return (
                  <label
                    key={option.id}
                    className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-line px-4 py-3 text-sm transition hover:border-accent"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingOption"
                        value={option.id}
                        checked={shippingOption === option.id}
                        onChange={() => setShippingOption(option.id)}
                        className="accent-accent"
                      />
                      <span>
                        <span className="font-semibold text-ink">{option.label}</span>
                        <span className="ml-2 text-muted">{option.eta}</span>
                      </span>
                    </span>
                    <span className="font-semibold text-ink">
                      {cost === 0 ? "Free" : `${currency.symbol}${cost.toFixed(2)}`}
                    </span>
                  </label>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-muted">
              Orders are processed within 1–2 business days. Delivery estimates start
              from dispatch, not from the moment you order.
            </p>
          </fieldset>

          {/* Payment Details — Airwallex hosted fields */}
          <fieldset className="rounded-2xl border border-line bg-paper p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <legend className="font-display text-lg font-bold text-ink px-2">4. Payment</legend>
              <PaymentBadges showSsl={false} />
            </div>
            <p className="mt-2 text-xs text-muted flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Card details are entered in a secure Airwallex field — Agent Lume never
              stores your card number.
            </p>

            {!paymentsConfigured ? (
              <div className="mt-4 rounded-xl border border-line bg-paper-2 px-4 py-6 text-center text-sm text-muted">
                Card payments are not available right now. Please contact{" "}
                <a href={`mailto:${site.email}`} className="text-accent hover:underline">
                  {site.email}
                </a>{" "}
                and we&apos;ll help you complete your order.
              </div>
            ) : HOSTED_CHECKOUT ? (
              <div className="mt-4 rounded-xl border border-line bg-paper-2 px-4 py-6 text-center text-sm text-muted">
                You&apos;ll be redirected to Airwallex&apos;s secure checkout to enter
                your card details and complete payment.
              </div>
            ) : (
              <div className="mt-4">
                <div
                  id="airwallex-card"
                  className="min-h-[104px] rounded-xl border border-ink/20 px-4 py-3"
                />
                {!sdkReady && (
                  <p className="mt-2 text-xs text-muted">Loading secure payment fields…</p>
                )}
              </div>
            )}
          </fieldset>

          {/* Consent */}
          <div className="space-y-3 rounded-2xl border border-line bg-paper p-6 text-sm shadow-sm">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                required
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 accent-accent"
              />
              <span className="text-muted">
                I have read and agree to the{" "}
                <Link href="/terms" className="text-accent hover:underline" target="_blank">
                  Terms of Service
                </Link>
                , the{" "}
                <Link href="/refund-policy" className="text-accent hover:underline" target="_blank">
                  Refund Policy
                </Link>{" "}
                and the{" "}
                <Link href="/privacy" className="text-accent hover:underline" target="_blank">
                  Privacy Policy
                </Link>
                , and I authorise Agent Lume to charge my card for the total shown.
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                className="mt-0.5 accent-accent"
              />
              <span className="text-muted">
                Optional: email me product news and offers. You can unsubscribe at any
                time.
              </span>
            </label>
          </div>
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
                    {currency.symbol}
                    {(product.price * line.quantity).toFixed(2)}
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
              <span className="font-medium text-ink">
                {currency.symbol}
                {subtotal.toFixed(2)}
              </span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount ({discountPercent}%)</span>
                <span>
                  -{currency.symbol}
                  {discountAmount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-ink/80">
              <span>Shipping ({getShippingOption(shippingOption).label})</span>
              <span className="font-medium text-ink">
                {shipping === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  `${currency.symbol}${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-lg font-bold text-ink">
              <span>Total</span>
              <span>
                {currency.symbol}
                {total.toFixed(2)} {currency.code}
              </span>
            </div>
            {discountedSubtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="text-xs text-muted">
                Spend {currency.symbol}
                {(FREE_SHIPPING_THRESHOLD - discountedSubtotal).toFixed(2)} more for free
                standard shipping.
              </p>
            )}
          </div>

          {error && (
            <p className="rounded-xl border border-rust/40 bg-rust/10 px-4 py-3 text-xs font-medium text-rust">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || !paymentsConfigured || !acceptedTerms}
            className="w-full rounded-full bg-ink py-4 text-sm font-bold text-paper shadow-md transition duration-200 hover:bg-accent-dark hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
          >
            {submitting
              ? "Redirecting to secure payment..."
              : HOSTED_CHECKOUT
                ? `Continue to secure payment · ${currency.symbol}${total.toFixed(2)}`
                : `Pay ${currency.symbol}${total.toFixed(2)}`}
          </button>

          <p className="text-center text-xs text-muted">
            {RETURN_WINDOW_DAYS}-day returns on unworn items. See our{" "}
            <Link href="/refund-policy" className="text-accent hover:underline">
              Refund Policy
            </Link>
            .
          </p>

          <div className="border-t border-line pt-4 text-center text-xs text-muted">
            <p className="font-semibold text-ink">Need help with this order?</p>
            <p className="mt-1">
              <a href={`mailto:${site.email}`} className="text-accent hover:underline">
                {site.email}
              </a>{" "}
              &middot; {site.phone}
            </p>
            <p className="mt-1">{site.legalName}</p>
          </div>
        </div>
      </form>
    </div>
  );
}
