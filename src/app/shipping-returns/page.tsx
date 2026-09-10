import type { Metadata } from "next";
import Link from "next/link";
import { currency, site } from "@/lib/site";
import {
  FREE_SHIPPING_THRESHOLD,
  ORDER_PROCESSING_TIME,
  RETURN_WINDOW_DAYS,
  SHIPPING_OPTIONS,
} from "@/lib/commerce";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: `Shipping options, delivery estimates and the ${site.name} ${RETURN_WINDOW_DAYS}-day return policy.`,
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
        <h1 className="mt-3 font-display text-3xl">Shipping Policy</h1>
        <p className="mt-3 text-sm text-muted">
          All prices and shipping rates on this page are in {currency.label} (
          {currency.code}).
        </p>
      </div>

      <div className="mt-10 max-w-2xl">
        <Section title="Processing time">
          <p>
            Orders are processed within {ORDER_PROCESSING_TIME}, Monday to Friday,
            excluding public holidays. You&apos;ll receive a shipping confirmation
            email with tracking as soon as your order leaves our warehouse.
          </p>
        </Section>

        <Section title="Shipping rates & delivery estimates">
          <ul className="list-disc space-y-2 pl-5">
            {SHIPPING_OPTIONS.map((option) => (
              <li key={option.id}>
                {option.label} shipping ({option.eta}): {currency.symbol}
                {option.price.toFixed(2)}
                {option.freeOverThreshold
                  ? `, free on orders over ${currency.symbol}${FREE_SHIPPING_THRESHOLD}`
                  : ""}
              </li>
            ))}
            <li>
              International shipping: rates and delivery estimates are shown at
              checkout based on destination
            </li>
          </ul>
          <p>
            Delivery estimates start from the dispatch date, not the date you placed
            the order.
          </p>
        </Section>

        <Section title="Customs, duties & taxes">
          <p>
            Orders shipped outside of Hong Kong SAR may be subject to import duties
            and taxes set by the destination country. These are not included in the
            item price or shipping cost and are the recipient&apos;s responsibility.
          </p>
        </Section>

        <Section title="Tracking & lost parcels">
          <p>
            Every order ships with tracking. If your tracking hasn&apos;t updated for
            more than 5 business days, or your parcel is marked delivered but
            hasn&apos;t arrived, contact{" "}
            <a href={`mailto:${site.email}`} className="text-accent hover:underline">
              {site.email}
            </a>{" "}
            and we&apos;ll open an investigation with the carrier.
          </p>
        </Section>

        <Section title="Returns">
          <p>
            We accept returns within {RETURN_WINDOW_DAYS} days of delivery on unworn
            items with tags attached. Return shipping is at the customer&apos;s
            expense unless the item is faulty, damaged or incorrect.
          </p>
          <p>
            Full eligibility criteria, exchange terms and refund timings are set out
            in our{" "}
            <Link href="/refund-policy" className="text-accent hover:underline">
              Refund Policy
            </Link>
            .
          </p>
        </Section>

        <Section title="Contact">
          <p>
            {site.legalName} (Company No. {site.registrationNo}),{" "}
            {site.address.line1}, {site.address.line2}, {site.address.line3}.
          </p>
          <p>
            <a href={`mailto:${site.email}`} className="text-accent hover:underline">
              {site.email}
            </a>{" "}
            &middot; {site.phone} &middot; {site.support.hours}
          </p>
        </Section>
      </div>
    </div>
  );
}
