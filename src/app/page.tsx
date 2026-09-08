import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import NewsletterForm from "@/components/NewsletterForm";
import { products } from "@/data/products";
import { navCategories } from "@/lib/site";

const categoryImages: Record<string, string> = {
  men: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80",
  women: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
  kids: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
  accessories: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
};

export default function Home() {
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="border-b border-line bg-surface text-paper">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-paper/20 bg-paper/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-highlight backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-highlight animate-pulse" />
              New Drop &middot; Fall 2026
            </div>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              Drop In. <span className="text-highlight">Stand Out.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm text-paper/80 leading-relaxed">
              Trend-forward streetwear, basics, and accessories crafted for self-expression and built for everyday wear. No fast-fashion waste, just pieces you&apos;ll live in.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-highlight px-7 py-3.5 text-sm font-semibold text-ink shadow-md transition hover:bg-highlight/90 hover:scale-[1.02]"
              >
                Shop Collection
              </Link>
              <Link
                href="/shop/women"
                className="rounded-full border border-paper/40 px-6 py-3.5 text-sm font-semibold text-paper transition hover:border-paper hover:bg-paper/10"
              >
                Women&apos;s Line
              </Link>
              <Link
                href="/shop/men"
                className="rounded-full border border-paper/40 px-6 py-3.5 text-sm font-semibold text-paper transition hover:border-paper hover:bg-paper/10"
              >
                Men&apos;s Line
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl border border-paper/10">
            <ProductImage
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80"
              alt="Agent Lume streetwear campaign"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── Value Props Strip ────────────────────────── */}
      <section className="border-b border-line bg-paper-2 py-6">
        <div className="container-page grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
          <div className="flex flex-col items-center justify-center p-2">
            <p className="text-xs font-semibold text-ink">Free Standard Shipping</p>
            <p className="text-[11px] text-muted">On orders over $120</p>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <p className="text-xs font-semibold text-ink">30-Day Returns</p>
            <p className="text-[11px] text-muted">On unworn items</p>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <p className="text-xs font-semibold text-ink">Heavyweight Fabrics</p>
            <p className="text-[11px] text-muted">Cotton &amp; cotton blends</p>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <p className="text-xs font-semibold text-ink">Secure Checkout</p>
            <p className="text-[11px] text-muted">Processed by Airwallex</p>
          </div>
        </div>
      </section>

      {/* ── Shop by Category ─────────────────────────── */}
      <section className="container-page py-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Collections</p>
            <h2 className="mt-1 font-display text-2xl md:text-3xl">Shop by category</h2>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-accent hover:underline">
            View All Categories &rarr;
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {navCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-paper-2 shadow-sm transition hover:shadow-md"
            >
              <ProductImage
                src={categoryImages[cat.slug]}
                alt={cat.label}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-5 flex flex-col justify-end">
                <span className="text-xl font-display font-semibold text-paper drop-shadow-sm">{cat.label}</span>
                <span className="mt-1 text-xs text-paper/80 group-hover:text-highlight transition">Explore collection &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Trending Now ─────────────────────────────── */}
      <section className="container-page py-16 border-t border-line">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Community Favorites</p>
            <h2 className="mt-1 font-display text-2xl md:text-3xl">Trending now</h2>
          </div>
          <Link href="/shop" className="text-sm font-medium text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* ── Why Agent Lume ────────────────────────────── */}
      <section className="border-y border-line bg-paper-2 py-16">
        <div className="container-page grid gap-10 md:grid-cols-3 md:items-center">
          <div className="md:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Our Philosophy</p>
            <h2 className="mt-2 font-display text-2xl md:text-3xl">Why Agent Lume?</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              We make clothes that match your energy — bold, comfortable, and
              unapologetically you. No fast-fashion waste, just timeless pieces you&apos;ll
              actually wear every day.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 md:col-span-2">
            {[
              {
                title: "Heavyweight fabrics",
                body: "Substantial cotton and cotton-blend jersey, fleece and ripstop chosen for durability and everyday wear.",
              },
              {
                title: "30-day returns",
                body: "Unworn items with tags attached can be returned within 30 days of delivery. See our Refund Policy for details.",
              },
              {
                title: "Inclusive sizing",
                body: "Tailored fits ranging from XS to XXL across men, women, and kids with gender-neutral essentials.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-line bg-paper p-5 shadow-sm">
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── New Drops ─────────────────────────────────── */}
      <section className="container-page py-16">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Just Landed</p>
            <h2 className="mt-1 font-display text-2xl md:text-3xl">New drops</h2>
          </div>
          <Link href="/shop" className="text-sm font-medium text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* ── Shop With Confidence ─────────────────────── */}
      <section className="border-t border-line bg-paper-2 py-16">
        <div className="container-page">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Shop With Confidence</p>
            <h2 className="mt-2 font-display text-2xl md:text-3xl">Everything in writing</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
              Our delivery times, return window and refund process are published in
              full before you pay — no small print.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Shipping & delivery",
                body: "Standard and express options with published delivery estimates and dispatch times.",
                href: "/shipping-returns",
                cta: "Shipping details",
              },
              {
                title: "Returns & refunds",
                body: "30 days to return unworn items, with a clear explanation of how refunds are issued.",
                href: "/refund-policy",
                cta: "Refund Policy",
              },
              {
                title: "Your data",
                body: "How we collect, store and use your personal information, and how to ask us to delete it.",
                href: "/privacy",
                cta: "Privacy Policy",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col justify-between rounded-xl border border-line bg-paper p-6 shadow-sm">
                <div>
                  <p className="font-display text-base font-semibold text-ink">{item.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
                <Link
                  href={item.href}
                  className="mt-6 border-t border-line pt-4 text-xs font-semibold text-accent hover:underline"
                >
                  {item.cta} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────── */}
      <section className="container-page py-20">
        <div className="rounded-2xl bg-surface px-6 py-14 text-center text-paper md:px-16 shadow-xl">
          <h2 className="font-display text-3xl md:text-4xl">Join the squad</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-paper/80">
            Get 15% off your first drop, early access to restocks, and exclusive secret sales. No spam, ever.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}

