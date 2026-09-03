"use client";

import { useState } from "react";

export default function ProductImage({
  src,
  palette = ["#3f4a34", "#22281c"],
  category = "accessories",
  className = "",
  label,
  priority = false,
}: {
  src?: string;
  palette?: [string, string];
  category?: string;
  className?: string;
  label?: string;
  priority?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const gradientId = `grad-${palette[0].replace("#", "")}-${palette[1].replace("#", "")}`;

  if (!src || hasError) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-paper-2 ${className}`}
        style={{
          background: `linear-gradient(135deg, ${palette[0]}, ${palette[1]})`,
        }}
      >
        <span className="text-xs font-medium uppercase tracking-wider text-paper/80">
          {label ?? category}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-paper-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label ?? `${category} product`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover object-center transition-all duration-500 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
      />
      {!isLoaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: `linear-gradient(135deg, ${palette[0]}33, ${palette[1]}33)`,
          }}
        />
      )}
    </div>
  );
}
