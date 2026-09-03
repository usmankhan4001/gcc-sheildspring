import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: `Shipping timelines, costs, and the ${site.name} 30-day return policy.`,
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default function ShippingReturnsPage() {
  return (
    <div className="container-page py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">Policies</p>
        <h1 className="mt-3 font-display text-3xl">Shipping &amp; Returns</h1>
      </div>

      <div className="mt-10 max-w-2xl">
        <Section title="Processing time">
          <p>
            Orders are processed within 1–2 business days. You&apos;ll receive a
            shipping confirmation email with tracking as soon as your order
            leaves our warehouse.
          </p>
        </Section>

        <Section title="Shipping rates & delivery estimates">
          <ul className="list-disc space-y-2 pl-5">
            <li>Standard shipping (5–8 business days): $8, free on orders over $120</li>
            <li>Express shipping (2–3 business days): $18</li>
            <li>International shipping: rates and timelines calculated at checkout</li>
          </ul>
        </Section>

        <Section title="Returns & exchanges">
          <p>
            We accept returns and exchanges within 30 days of delivery, provided
            items are unworn, unwashed, and in their original packaging with
            tags attached. To start a return, contact us at{" "}
            <a href={`mailto:${site.email}`} className="text-accent hover:underline">
              {site.email}
            </a>{" "}
            with your order number.
          </p>
          <p>
            Refunds are issued to the original payment method once the returned
            item has been received and inspected, typically within 5–7 business
            days.
          </p>
        </Section>

        <Section title="Damaged or defective items">
          <p>
            If an item arrives damaged or defective, let us know within 14 days
            of delivery and we&apos;ll arrange a free repair, replacement, or
            refund — your choice.
          </p>
        </Section>
      </div>
    </div>
  );
}
