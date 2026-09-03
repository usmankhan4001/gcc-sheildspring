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
      <nav className="mb-6 text-xs text-muted">
        <Link href="/shop" className="hover:text-accent">Shop</Link>
        <span className="mx-2">/</span>
        <Link href={`/shop/${product.category}`} className="hover:text-accent">
          {categoryLabels[product.category]}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery
          images={product.images}
          primaryImage={product.image}
          palette={product.palette}
          category={product.category}
          name={product.name}
        />

        <div className="lg:sticky lg:top-24 lg:self-start">
          {(product.isNew || product.compareAtPrice) && (
            <div className="mb-3 flex gap-2">
              {product.isNew && (
                <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-paper">
                  New
                </span>
              )}
              {product.compareAtPrice && (
                <span className="rounded-full bg-rust px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-paper">
                  Sale
                </span>
              )}
            </div>
          )}

          <h1 className="font-display text-3xl">{product.name}</h1>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-xl font-semibold text-ink">${product.price}</span>
            {product.compareAtPrice && (
              <span className="text-muted line-through">${product.compareAtPrice}</span>
            )}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>

          <div className="mt-8 border-t border-line pt-8">
            <AddToCartPanel product={product} />
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <p className="text-sm font-semibold text-ink">Details</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {product.details.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="text-accent">&bull;</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 border-t border-line pt-6 text-sm text-muted">
            <p>Free shipping on orders over $120. Free returns within 30 days.</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl">You may also like</h2>
          <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
