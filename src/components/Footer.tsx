import Link from "next/link";
import { navCategories, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-2">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
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
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Company</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-ink/80 hover:text-accent">About</Link>
            </li>
            <li>
              <Link href="/contact" className="text-ink/80 hover:text-accent">Contact</Link>
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
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Get in touch</p>
          <ul className="mt-4 space-y-2 text-sm text-ink/80">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-accent">{site.email}</a>
            </li>
            <li>
              <a href={`tel:${site.phoneHref}`} className="hover:text-accent">{site.phone}</a>
            </li>
            <li className="pt-2 text-xs leading-relaxed text-muted">
              {site.legalName}
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
            &copy; {new Date().getFullYear()} {site.legalName}. Company No. {site.registrationNo}. All rights reserved.
          </p>
          <p>{site.domain}</p>
        </div>
      </div>
    </footer>
  );
}
