"use client";

import { useState } from "react";
import ProductImage from "@/components/ProductImage";

export default function ProductGallery({
  images,
  primaryImage,
  name,
}: {
  images?: string[];
  primaryImage: string;
  name: string;
}) {
  const allImages = images && images.length > 0 ? images : [primaryImage];
  const [activeImage, setActiveImage] = useState(allImages[0]);

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto sm:flex-col sm:overflow-visible shrink-0 pb-2 sm:pb-0">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition duration-200 ${
                activeImage === img
                  ? "border-accent ring-2 ring-accent/30 shadow-md scale-[1.02]"
                  : "border-transparent opacity-70 hover:opacity-100 hover:border-line"
              }`}
            >
              <ProductImage
                src={img}
                alt={`${name} view ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-2xl bg-paper-2 shadow-sm border border-line">
        <ProductImage
          src={activeImage}
          alt={name}
          className="h-full w-full object-cover transition duration-300"
        />
      </div>
    </div>
  );
}

