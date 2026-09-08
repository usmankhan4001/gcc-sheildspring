import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${site.domain}, operated by ${site.legalName}.`,
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="container-page py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">Legal</p>
        <h1 className="mt-3 font-display text-3xl">Terms of Service</h1>
        <p className="mt-3 text-sm text-muted">Last updated: September 2, 2026</p>
      </div>

      <div className="mt-10 max-w-2xl">
        <Section title="1. About us">
          <p>
            {site.domain} is operated by {site.legalName} (&ldquo;Agent Lume&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;), a company registered in Hong Kong under
            Company No. {site.registrationNo}, with its registered office at{" "}
            {site.address.line1}, {site.address.line2}, {site.address.line3}. By
            accessing or using our website, you agree to these Terms of Service.
          </p>
        </Section>

        <Section title="2. Orders & acceptance">
          <p>
            Placing an order constitutes an offer to purchase. We reserve the
            right to accept, refuse, or limit any order, including in cases of
            suspected fraud, pricing errors, or product unavailability. You
            will be notified if any part of your order cannot be fulfilled.
          </p>
        </Section>

        <Section title="3. Pricing & payment">
          <p>
            All prices are listed in US dollars (USD) and are charged in USD.
            Prices are subject to change without notice, but the price you see
            at checkout is the price you pay. Applicable taxes and duties are
            calculated at checkout.
          </p>
          <p>
            Card payments are processed by Airwallex. By placing an order you
            authorise us, through our payment provider, to charge your card for
            the total shown at checkout. {site.legalName} does not store your
            full card number, expiry date or security code.
          </p>
        </Section>

        <Section title="4. Shipping, returns & refunds">
          <p>
            Shipping options, delivery estimates and return eligibility are set
            out on our{" "}
            <a href="/shipping-returns" className="text-accent hover:underline">
              Shipping &amp; Returns
            </a>{" "}
            page and in our{" "}
            <a href="/refund-policy" className="text-accent hover:underline">
              Refund Policy
            </a>
            , both of which form part of these Terms.
          </p>
        </Section>

        <Section title="5. Cancelling an order">
          <p>
            You may cancel or amend an order at no cost any time before it has
            been dispatched by emailing{" "}
            <a href={`mailto:${site.email}`} className="text-accent hover:underline">
              {site.email}
            </a>
            . Once dispatched, an order cannot be cancelled but may be returned
            under our Refund Policy.
          </p>
        </Section>

        <Section title="6. Payment disputes & chargebacks">
          <p>
            If something has gone wrong with your order, please contact us
            before raising a dispute with your bank so we can resolve it
            directly. We respond to all enquiries {site.support.responseTime}.
          </p>
        </Section>

        <Section title="7. Intellectual property">
          <p>
            All content on this site — including product designs, photography,
            text, and the Agent Lume name and logo — is the property of{" "}
            {site.legalName} or its licensors and may not be reproduced without
            written permission.
          </p>
        </Section>

        <Section title="8. Limitation of liability">
          <p>
            To the fullest extent permitted by law, {site.legalName} shall not
            be liable for any indirect, incidental, or consequential damages
            arising from your use of this website or our products.
          </p>
        </Section>

        <Section title="9. Governing law">
          <p>
            These Terms are governed by the laws of Hong Kong, without regard
            to conflict of law principles. Any disputes shall be subject to
            the exclusive jurisdiction of the courts of Hong Kong.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            Questions about these Terms can be sent to{" "}
            <a href={`mailto:${site.email}`} className="text-accent hover:underline">
              {site.email}
            </a>{" "}
            or {site.phone}.
          </p>
        </Section>
      </div>
    </div>
  );
}
