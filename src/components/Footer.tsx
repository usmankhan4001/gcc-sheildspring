import Link from "next/link";
import { navCategories, site } from "@/lib/site";
import PaymentBadges from "@/components/PaymentBadges";

const policyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/shipping-returns", label: "Shipping & Returns" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-2">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold">{site.name}</p>
          <p className="mt-3 text-sm text-muted">{site.tagline}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Shop</p>
          <ul className="mt-4 space-y-2 text-sm">
            {navCategories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/shop/${cat.slug}`} className="text-ink/80 hover:text-accent">
                  {cat.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/shop" className="text-ink/80 hover:text-accent">
                All Products
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Policies</p>
          <ul className="mt-4 space-y-2 text-sm">
            {policyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink/80 hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal entity disclosure — payment providers check that the trading
            name, legal entity, registration number and registered address are
            all stated together and match the application. */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Company</p>
          <p className="mt-4 text-sm leading-relaxed text-ink/80">
            {site.name} is operated by {site.legalName}
          </p>
          <dl className="mt-3 space-y-2 text-sm">
            <div>
              <dt className="text-muted">Business Registration No.:</dt>
              <dd className="text-ink/80">{site.registrationNo}</dd>
            </div>
            <div>
              <dt className="text-muted">Place of registration:</dt>
              <dd className="text-ink/80">{site.jurisdiction}</dd>
            </div>
            <div>
              <dt className="text-muted">Registered Address:</dt>
              <dd className="text-ink/80">
                {site.address.line1}, {site.address.line2}, {site.address.line3}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Email:</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="text-ink/80 hover:text-accent">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Phone:</dt>
              <dd>
                <a href={`tel:${site.phoneHref}`} className="text-ink/80 hover:text-accent">
                  {site.phone}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-4 py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. Company No. {site.registrationNo}. All rights reserved.
          </p>
          <PaymentBadges />
          <p>{site.domain}</p>
        </div>
      </div>
    </footer>
  );
}
