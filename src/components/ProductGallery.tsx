"use client";

import { useState } from "react";
import ProductImage from "@/components/ProductImage";

export default function ProductGallery({
  images,
  primaryImage,
  palette,
  category,
  name,
}: {
  images?: string[];
  primaryImage: string;
  palette: [string, string];
  category: string;
  name: string;
}) {
  const allImages = images && images.length > 0 ? images : [primaryImage];
  const [activeImage, setActiveImage] = useState(allImages[0]);

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto md:flex-col md:overflow-visible">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 transition ${
                activeImage === img ? "border-accent shadow-sm" : "border-transparent opacity-75 hover:opacity-100"
              }`}
            >
              <ProductImage
                src={img}
                palette={palette}
                category={category}
                label={`${name} view ${idx + 1}`}
                className="h-full w-full"
              />
            </button>
          ))}
        </div>
      )}

      <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-lg bg-paper-2 shadow-sm">
        <ProductImage
          src={activeImage}
          palette={palette}
          category={category}
          label={name}
          className="h-full w-full"
          priority
        />
      </div>
    </div>
  );
}
