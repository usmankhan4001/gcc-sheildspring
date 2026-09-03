"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { site } from "@/lib/site";

interface OrderSnapshot {
  orderNumber: string;
  email: string;
  total: number;
  itemCount: number;
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderParam = searchParams.get("order");
  const [order, setOrder] = useState<OrderSnapshot | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("agentlume-last-order");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage, unavailable during SSR
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const orderNumber = order?.orderNumber ?? orderParam ?? "AL-000000";

  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-paper">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="mt-6 font-display text-3xl">Thank you for your order</h1>
      <p className="mt-3 text-sm text-muted">
        Order <span className="font-semibold text-ink">{orderNumber}</span> has been
        received. A confirmation email has been sent to{" "}
        {order?.email ? <span className="font-medium text-ink">{String(order.email)}</span> : "your inbox"}.
      </p>
      {order && (
        <p className="mt-1 text-sm text-muted">
          {order.itemCount} item{order.itemCount === 1 ? "" : "s"} &middot; Total ${order.total.toFixed(2)}
        </p>
      )}
      <p className="mt-6 max-w-md text-xs text-muted">
        Questions about your order? Reach us anytime at{" "}
        <a href={`mailto:${site.email}`} className="text-accent hover:underline">
          {site.email}
        </a>{" "}
        or {site.phone}.
      </p>
      <Link
        href="/shop"
        className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-accent-dark"
      >
        Continue Shopping
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
