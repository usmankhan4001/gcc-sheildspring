import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-paper-2">
        <ProductImage
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
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
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-ink">{product.name}</p>
          <p className="text-xs text-muted">{product.colors.length} colors</p>
        </div>
        <div className="text-right text-sm">
          <span className="font-semibold text-ink">${product.price}</span>
          {product.compareAtPrice && (
            <span className="ml-2 text-muted line-through">${product.compareAtPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
