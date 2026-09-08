import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import {
  DAMAGE_REPORT_WINDOW_DAYS,
  REFUND_PROCESSING_DAYS,
  RETURN_WINDOW_DAYS,
} from "@/lib/commerce";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `Returns, refunds and cancellation terms for ${site.domain}, operated by ${site.legalName}.`,
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default function RefundPolicyPage() {
  return (
    <div className="container-page py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">Legal</p>
        <h1 className="mt-3 font-display text-3xl">Refund Policy</h1>
        <p className="mt-3 text-sm text-muted">Last updated: September 8, 2026</p>
      </div>

      <div className="mt-10 max-w-2xl">
        <Section title="1. Summary">
          <p>
            You may return most unworn items within {RETURN_WINDOW_DAYS} days of
            delivery for a refund to your original payment method. This policy is
            provided by {site.legalName} (Company No. {site.registrationNo}) and
            forms part of our{" "}
            <Link href="/terms" className="text-accent hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </Section>

        <Section title="2. Return eligibility">
          <p>To be eligible for a refund, items must be:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Returned within {RETURN_WINDOW_DAYS} days of the delivery date</li>
            <li>Unworn, unwashed and free of marks, odours or pet hair</li>
            <li>In their original packaging with all tags attached</li>
            <li>Accompanied by your order number</li>
          </ul>
          <p>
            For hygiene reasons we cannot accept returns on underwear, swimwear or
            earrings unless the item is faulty or incorrect.
          </p>
        </Section>

        <Section title="3. How to start a return">
          <p>
            Email{" "}
            <a href={`mailto:${site.email}`} className="text-accent hover:underline">
              {site.email}
            </a>{" "}
            with your order number and the items you&apos;d like to return. We&apos;ll
            reply with return instructions within one business day.
          </p>
          <p>
            Return shipping costs are the customer&apos;s responsibility unless the
            item arrived damaged, defective or incorrect, in which case we cover the
            return postage.
          </p>
        </Section>

        <Section title="4. Refund timing and method">
          <p>
            Once your return is received and inspected we&apos;ll email you to confirm
            whether the refund was approved. Approved refunds are issued to the
            original payment method and typically appear within{" "}
            {REFUND_PROCESSING_DAYS}, depending on your bank or card issuer.
          </p>
          <p>
            Original shipping charges are non-refundable, except where the return is
            due to our error or a faulty item.
          </p>
        </Section>

        <Section title="5. Exchanges">
          <p>
            We exchange items for a different size or colour where stock allows. The
            fastest way to swap is to place a new order and return the original item
            for a refund.
          </p>
        </Section>

        <Section title="6. Damaged, defective or incorrect items">
          <p>
            Please inspect your order on arrival and contact us within{" "}
            {DAMAGE_REPORT_WINDOW_DAYS} days if an item is damaged, defective or not
            what you ordered. We&apos;ll arrange a replacement or a full refund and
            cover any return shipping.
          </p>
        </Section>

        <Section title="7. Cancelling or changing an order">
          <p>
            You can cancel or amend an order free of charge any time before it has
            been dispatched — email us as soon as possible with your order number.
            Once an order has shipped it can no longer be cancelled, but it can be
            returned under this policy.
          </p>
        </Section>

        <Section title="8. Late or missing refunds">
          <p>
            If you haven&apos;t received a refund we confirmed, first check with your
            bank or card issuer, as processing times vary. If it still hasn&apos;t
            arrived, contact us at{" "}
            <a href={`mailto:${site.email}`} className="text-accent hover:underline">
              {site.email}
            </a>{" "}
            and we&apos;ll investigate.
          </p>
        </Section>

        <Section title="9. Questions and disputes">
          <p>
            We&apos;d rather resolve an issue directly than have you raise a dispute
            with your bank. Contact {site.legalName} at{" "}
            <a href={`mailto:${site.email}`} className="text-accent hover:underline">
              {site.email}
            </a>{" "}
            or {site.phone} and we&apos;ll respond {site.support.responseTime}.
          </p>
          <p>
            Nothing in this policy affects your statutory rights as a consumer.
          </p>
        </Section>
      </div>
    </div>
  );
}
