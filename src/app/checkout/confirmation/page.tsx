"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { site } from "@/lib/site";

interface OrderSnapshot {
  orderNumber: string;
  email: string;
  total: number;
  itemCount: number;
  intentId?: string;
}

type PaymentStatus = "none" | "checking" | "succeeded" | "failed";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderParam = searchParams.get("order");
  const { clearCart } = useCart();

  const [order, setOrder] = useState<OrderSnapshot | null>(null);
  const [status, setStatus] = useState<PaymentStatus>("none");
  const clearedRef = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("agentlume-last-order");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage, unavailable during SSR
      if (raw) setOrder(JSON.parse(raw) as OrderSnapshot);
    } catch {
      // ignore
    }
  }, []);

  // After a Hosted Checkout redirect we cannot assume the payment went
  // through, so confirm the intent status with Airwallex before showing
  // success and emptying the basket.
  useEffect(() => {
    const intentId = order?.intentId;
    if (!intentId) return;

    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- pending state before an async check
    setStatus("checking");

    async function check(id: string) {
      try {
        const res = await fetch(`/api/payment-intent?id=${encodeURIComponent(id)}`);
        if (!res.ok) throw new Error("status request failed");
        const data = (await res.json()) as { status?: string };
        if (cancelled) return;
        const succeeded = data.status === "SUCCEEDED";
        setStatus(succeeded ? "succeeded" : "failed");
        if (succeeded && !clearedRef.current) {
          clearedRef.current = true;
          clearCart();
        }
      } catch {
        if (!cancelled) setStatus("failed");
      }
    }

    void check(intentId);

    return () => {
      cancelled = true;
    };
  }, [order?.intentId, clearCart]);

  const orderNumber = order?.orderNumber ?? orderParam ?? "AL-000000";
  const paid = status !== "failed";

  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full text-paper ${
          paid ? "bg-accent" : "bg-rust"
        }`}
      >
        {paid ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        )}
      </div>

      {status === "checking" ? (
        <h1 className="mt-6 font-display text-3xl">Confirming your payment…</h1>
      ) : paid ? (
        <>
          <h1 className="mt-6 font-display text-3xl">Thank you for your order</h1>
          <p className="mt-3 text-sm text-muted">
            Order <span className="font-semibold text-ink">{orderNumber}</span> has been
            received and your payment was successful. We&apos;ll email your receipt and
            tracking details to{" "}
            {order?.email ? <span className="font-medium text-ink">{String(order.email)}</span> : "your inbox"}{" "}
            once your order is dispatched.
          </p>
          {order && (
            <p className="mt-1 text-sm text-muted">
              {order.itemCount} item{order.itemCount === 1 ? "" : "s"} &middot; Total ${order.total.toFixed(2)}
            </p>
          )}
        </>
      ) : (
        <>
          <h1 className="mt-6 font-display text-3xl">Payment not completed</h1>
          <p className="mt-3 max-w-md text-sm text-muted">
            We couldn&apos;t confirm payment for order{" "}
            <span className="font-semibold text-ink">{orderNumber}</span>. Your card has
            not been charged and your basket is untouched. You can try again, or contact
            us if you believe this is a mistake.
          </p>
        </>
      )}

      <p className="mt-6 max-w-md text-xs text-muted">
        Questions about your order? Reach us anytime at{" "}
        <a href={`mailto:${site.email}`} className="text-accent hover:underline">
          {site.email}
        </a>{" "}
        or {site.phone}.
      </p>

      <Link
        href={paid ? "/shop" : "/checkout"}
        className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-accent-dark"
      >
        {paid ? "Continue Shopping" : "Back to checkout"}
      </Link>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="container-page py-24" />}>
      <ConfirmationContent />
    </Suspense>
  );
}
