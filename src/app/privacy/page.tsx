import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.legalName} collects, uses, and protects your personal data.`,
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="container-page py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">Legal</p>
        <h1 className="mt-3 font-display text-3xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted">Last updated: September 2, 2026</p>
      </div>

      <div className="mt-10 max-w-2xl">
        <Section title="1. Who we are">
          <p>
            This Privacy Policy explains how {site.legalName} (Company No.{" "}
            {site.registrationNo}), registered at {site.address.line1},{" "}
            {site.address.line2}, {site.address.line3}, collects and uses
            personal data when you visit {site.domain} or place an order.
          </p>
        </Section>

        <Section title="2. Information we collect">
          <ul className="list-disc space-y-2 pl-5">
            <li>Contact details you provide, such as name, email, phone number, and shipping address</li>
            <li>Order and payment information needed to process your purchase</li>
            <li>Usage data such as pages visited and device/browser information</li>
            <li>Marketing preferences if you sign up for our newsletter</li>
          </ul>
        </Section>

        <Section title="3. How we use your information">
          <ul className="list-disc space-y-2 pl-5">
            <li>To process and fulfill orders, including shipping and returns</li>
            <li>To respond to customer service inquiries</li>
            <li>To send order updates and, where you&apos;ve opted in, marketing communications</li>
            <li>To improve our website and product offering</li>
            <li>To detect and prevent fraud</li>
          </ul>
        </Section>

        <Section title="4. Sharing your information">
          <p>
            We share personal data only with service providers who help us
            operate our business — such as payment processors, shipping
            carriers, and email platforms — under agreements that protect your
            data. We do not sell your personal information.
          </p>
        </Section>

        <Section title="5. Cookies">
          <p>
            We use cookies and similar technologies to keep your cart in sync,
            remember your preferences, and understand how our site is used.
            You can control cookies through your browser settings.
          </p>
        </Section>

        <Section title="6. Your rights">
          <p>
            Depending on where you live, you may have the right to access,
            correct, delete, or export your personal data, and to opt out of
            marketing communications at any time. To exercise these rights,
            contact us at{" "}
            <a href={`mailto:${site.email}`} className="text-accent hover:underline">
              {site.email}
            </a>
            .
          </p>
        </Section>

        <Section title="7. Data retention & security">
          <p>
            We retain personal data only as long as necessary to fulfill the
            purposes described in this policy, or as required by law, and use
            reasonable technical and organizational measures to protect it.
          </p>
        </Section>

        <Section title="8. Contact us">
          <p>
            For any questions about this Privacy Policy, contact{" "}
            {site.legalName} at{" "}
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
