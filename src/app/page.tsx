import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import NewsletterForm from "@/components/NewsletterForm";
import { products } from "@/data/products";
import { navCategories } from "@/lib/site";

const categoryPalettes: Record<string, [string, string]> = {
  men: ["#3f4a34", "#22281c"],
  women: ["#b5522f", "#7a331a"],
  kids: ["#c9a63f", "#8a6f22"],
  accessories: ["#6b4a30", "#3c2a1b"],
};

export default function Home() {
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div>
      <section className="border-b border-line bg-ink text-paper">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/60">
              Fall / Winter Collection
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              Clothing built for the seasons you actually live in.
            </h1>
            <p className="mt-5 max-w-md text-sm text-paper/75">
              Shieldspring makes durable, weather-ready essentials for the whole
              family — field jackets, knitwear, denim, and accessories designed
              to be worn hard and repaired, not replaced.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink transition hover:bg-paper-2"
              >
                Shop All
              </Link>
              <Link
                href="/shop/men"
                className="rounded-full border border-paper/40 px-6 py-3 text-sm font-semibold text-paper transition hover:border-paper"
              >
                New Arrivals
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <ProductImage
              palette={["#2f4d3a", "#141712"]}
              category="men"
              label="Shieldspring outerwear"
              className="h-full w-full"
            />
          </div>
        </div>
      </section>

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
                palette={categoryPalettes[cat.slug]}
                category={cat.slug}
                label={cat.label}
                className="h-full w-full transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-transparent to-transparent p-4">
                <span className="text-lg font-semibold text-paper">{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl">Bestsellers</h2>
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

      <section className="border-y border-line bg-paper-2 py-16">
        <div className="container-page grid gap-10 md:grid-cols-3 md:items-center">
          <div className="md:col-span-1">
            <h2 className="font-display text-2xl">Made to last, backed to match</h2>
            <p className="mt-4 text-sm text-muted">
              Every Shieldspring piece is built from durable natural fibers and
              tested against real weather. If it fails you, we repair or
              replace it — no fine print.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 md:col-span-2">
            {[
              { title: "Weather-tested", body: "Field-tested fabrics that hold up in wind, rain, and everyday wear." },
              { title: "30-day returns", body: "Try it on at home. Free, easy returns within 30 days." },
              { title: "Repair, not replace", body: "Lifetime repair program keeps your gear out of the landfill." },
            ].map((item) => (
              <div key={item.title}>
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl">New arrivals</h2>
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

      <section className="container-page pb-20">
        <div className="rounded-lg bg-accent px-6 py-12 text-center text-paper md:px-16">
          <h2 className="font-display text-2xl">Join the Shieldspring list</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-paper/80">
            New arrivals, restocks, and seasonal care guides. No spam, unsubscribe
            anytime.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
