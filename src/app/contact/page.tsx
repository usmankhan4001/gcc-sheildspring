import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${site.name} customer care team.`,
};

export default function ContactPage() {
  return (
    <div className="container-page py-16">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">Contact</p>
        <h1 className="mt-3 font-display text-3xl">We&apos;re here to help</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Questions about an order, sizing, or a repair? Send us a message and
          our customer care team will get back to you within one business day.
        </p>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <ContactForm />

        <div className="space-y-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Email</h2>
            <a href={`mailto:${site.email}`} className="mt-2 block text-lg text-ink hover:text-accent">
              {site.email}
            </a>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Phone</h2>
            <a href={`tel:${site.phoneHref}`} className="mt-2 block text-lg text-ink hover:text-accent">
              {site.phone}
            </a>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              Registered Office
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              {site.legalName}
              <br />
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.line3}
            </p>
            <p className="mt-2 text-xs text-muted">Company No. {site.registrationNo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
