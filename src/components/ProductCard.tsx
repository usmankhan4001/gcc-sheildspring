import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const secondaryImage = product.images && product.images.length > 1 ? product.images[1] : null;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-paper-2 shadow-sm transition hover:shadow-md">
        {/* Primary Image */}
        <ProductImage
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover transition duration-700 ${
            secondaryImage ? "group-hover:opacity-0 group-hover:scale-105" : "group-hover:scale-105"
          }`}
        />

        {/* Secondary Image on Hover */}
        {secondaryImage && (
          <ProductImage
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:opacity-100 group-hover:scale-105"
          />
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="rounded-full bg-ink/90 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-paper shadow-sm">
              New
            </span>
          )}
          {product.compareAtPrice && (
            <span className="rounded-full bg-rust px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-paper shadow-sm">
              Sale {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% Off
            </span>
          )}
          {product.isBestseller && !product.isNew && (
            <span className="rounded-full bg-surface/90 text-highlight backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Popular
            </span>
          )}
        </div>

        {/* Quick View Pill on Hover */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 translate-y-2 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0 hidden sm:block">
          <div className="w-full rounded-lg bg-paper/95 py-2 text-center text-xs font-semibold text-ink shadow-md backdrop-blur">
            View Details
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink group-hover:text-accent transition">
            {product.name}
          </p>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted">
            <span>{product.colors.length} {product.colors.length === 1 ? "color" : "colors"}</span>
            {product.rating && (
              <>
                <span>&middot;</span>
                <span className="flex items-center gap-0.5 text-amber-500 font-medium">
                  ★ {product.rating}
                  <span className="text-muted text-[11px]">({product.reviewCount})</span>
                </span>
              </>
            )}
          </div>
        </div>
        <div className="text-right text-sm">
          <span className="font-bold text-ink">${product.price}</span>
          {product.compareAtPrice && (
            <span className="ml-2 text-xs text-muted line-through">${product.compareAtPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

