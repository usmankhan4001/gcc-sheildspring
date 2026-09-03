import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import NewsletterForm from "@/components/NewsletterForm";
import { products } from "@/data/products";
import { navCategories } from "@/lib/site";

const categoryImages: Record<string, string> = {
  men: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=600&q=80",
  women: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=600&q=80",
  kids: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=600&q=80",
  accessories: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-highlight">
              New Drop
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              Drop In. <span className="text-highlight">Stand Out.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm text-paper/75">
              Trend-forward streetwear, basics, and accessories for the generation
              that sets the pace. Designed for self-expression, built for everyday wear.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-highlight px-6 py-3 text-sm font-semibold text-ink transition hover:bg-accent"
              >
                Shop All
              </Link>
              <Link
                href="/shop/women"
                className="rounded-full border border-paper/40 px-6 py-3 text-sm font-semibold text-paper transition hover:border-paper"
              >
                New Arrivals
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <ProductImage
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=960&q=80"
              alt="Agent Lume streetwear collection"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Shop by Category ─────────────────────────── */}
      <section className="container-page py-16">
        <h2 className="font-display text-2xl">Shop by category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {navCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-md"
            >
              <ProductImage
                src={categoryImages[cat.slug]}
                alt={cat.label}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-transparent to-transparent p-4">
                <span className="text-lg font-semibold text-paper">{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Trending Now ─────────────────────────────── */}
      <section className="container-page py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl">Trending now</h2>
          <Link href="/shop" className="text-sm font-medium text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* ── Why Agent Lume ────────────────────────────── */}
      <section className="border-y border-line bg-paper-2 py-16">
        <div className="container-page grid gap-10 md:grid-cols-3 md:items-center">
          <div className="md:col-span-1">
            <h2 className="font-display text-2xl">Why Agent Lume?</h2>
            <p className="mt-4 text-sm text-muted">
              We make clothes that match your energy — bold, comfortable, and
              unapologetically you. No fast-fashion waste, just pieces you&apos;ll
              actually wear.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 md:col-span-2">
            {[
              { title: "Sustainable fabrics", body: "Organic cotton, recycled nylon, and materials that respect the planet." },
              { title: "Free returns", body: "30-day free returns — because shopping should be stress-free." },
              { title: "Designed for everyone", body: "Inclusive sizing, gender-neutral options, and styles for all ages." },
            ].map((item) => (
              <div key={item.title}>
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
          <h2 className="font-display text-2xl">New drops</h2>
          <Link href="/shop" className="text-sm font-medium text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────── */}
      <section className="container-page pb-20">
        <div className="rounded-lg bg-accent px-6 py-12 text-center text-paper md:px-16">
          <h2 className="font-display text-2xl">Join the squad</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-paper/80">
            New drops, restocks, and exclusive vibes. No spam, unsubscribe anytime.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
