import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import AddToCartPanel from "@/components/AddToCartPanel";
import { products, getProductBySlug, getRelatedProducts, categoryLabels } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="container-page py-10">
      <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-muted">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-accent">Shop</Link>
        <span>/</span>
        <Link href={`/shop/${product.category}`} className="hover:text-accent capitalize">
          {categoryLabels[product.category]}
        </Link>
        <span>/</span>
        <span className="text-ink font-semibold truncate">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* Product Gallery */}
        <div>
          <ProductGallery
            primaryImage={product.image}
            images={product.images}
            name={product.name}
          />
        </div>

        {/* Product Info Panel */}
        <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {product.isNew && (
              <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-paper">
                New Release
              </span>
            )}
            {product.compareAtPrice && (
              <span className="rounded-full bg-rust px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-paper">
                Save ${product.compareAtPrice - product.price} ({Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% Off)
              </span>
            )}
            {product.isBestseller && (
              <span className="rounded-full bg-surface text-highlight px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                Bestseller
              </span>
            )}
          </div>

          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-ink">{product.name}</h1>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-ink">${product.price}</span>
                {product.compareAtPrice && (
                  <span className="text-base text-muted line-through">${product.compareAtPrice}</span>
                )}
              </div>
              {product.rating && (
                <div className="flex items-center gap-1.5 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
                  <span>★ {product.rating}</span>
                  <span className="text-amber-600/80">({product.reviewCount} reviews)</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-sm leading-relaxed text-ink/80">{product.description}</p>

          <div className="border-t border-line pt-6">
            <AddToCartPanel product={product} />
          </div>

          {/* Product Specifications */}
          <div className="space-y-4 border-t border-line pt-6">
            <div>
              <p className="text-sm font-bold text-ink">Product Highlights</p>
              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted">
                {product.details.map((d) => (
                  <li key={d} className="flex items-center gap-2">
                    <span className="text-accent text-base">&bull;</span>
                    <span className="text-ink/80">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-paper-2 p-4 text-xs space-y-2 text-muted border border-line">
              <div className="flex items-center gap-2 text-ink font-semibold">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <span>Free shipping &amp; 30-day returns</span>
              </div>
              <p className="leading-relaxed">Free standard delivery on orders over $120. Hassle-free 30-day return policy with instant store credit or original payment refunds.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-24 border-t border-line pt-16">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">Complete the look</p>
              <h2 className="mt-1 font-display text-2xl md:text-3xl">You may also like</h2>
            </div>
            <Link href={`/shop/${product.category}`} className="text-sm font-semibold text-accent hover:underline">
              View more {categoryLabels[product.category]} &rarr;
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

