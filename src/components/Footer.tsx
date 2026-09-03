import Link from "next/link";
import { navCategories, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-2">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-lg font-semibold">{site.name}</p>
          <p className="mt-3 text-sm text-muted">{site.tagline}</p>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Secure Payments</p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="rounded border border-line bg-paper px-2 py-1 font-semibold text-ink">VISA</span>
              <span className="rounded border border-line bg-paper px-2 py-1 font-semibold text-ink">Mastercard</span>
              <span className="rounded border border-line bg-paper px-2 py-1 font-semibold text-ink">Amex</span>
              <span className="rounded border border-line bg-paper px-2 py-1 font-semibold text-ink">Apple Pay</span>
              <span className="rounded border border-line bg-paper px-2 py-1 font-semibold text-ink">Google Pay</span>
            </div>
            <p className="mt-2 text-[11px] text-muted flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              256-bit Encrypted Checkout
            </p>
          </div>
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
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Company &amp; Legal</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-ink/80 hover:text-accent">About Us</Link>
            </li>
            <li>
              <Link href="/contact" className="text-ink/80 hover:text-accent">Contact Support</Link>
            </li>
            <li>
              <Link href="/shipping-returns" className="text-ink/80 hover:text-accent">Shipping &amp; Returns</Link>
            </li>
            <li>
              <Link href="/terms" className="text-ink/80 hover:text-accent">Terms of Service</Link>
            </li>
            <li>
              <Link href="/privacy" className="text-ink/80 hover:text-accent">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Customer Care</p>
          <ul className="mt-4 space-y-2 text-sm text-ink/80">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-accent font-medium">{site.email}</a>
            </li>
            <li>
              <a href={`tel:${site.phoneHref}`} className="hover:text-accent font-medium">{site.phone}</a>
            </li>
            <li className="text-xs text-muted pt-1">
              Hours: Mon – Fri: 9:00 AM – 6:00 PM (HKT)
            </li>
            <li className="pt-2 text-xs leading-relaxed text-muted">
              <span className="font-semibold text-ink">{site.legalName}</span>
              <br />
              Registration No: {site.registrationNo}
              <br />
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.line3}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. Company Registration No. {site.registrationNo}. All rights reserved.
          </p>
          <p>{site.domain}</p>
        </div>
      </div>
    </footer>
  );
}
