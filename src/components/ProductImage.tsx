const GLYPHS: Record<string, string> = {
  men: "M32 10 L44 18 L38 26 L34 22 L34 58 L30 58 L30 22 L26 26 L20 18 Z",
  women: "M32 8 C40 8 44 14 44 20 C44 26 40 30 36 31 L40 58 L24 58 L28 31 C24 30 20 26 20 20 C20 14 24 8 32 8 Z",
  kids: "M32 12 L40 18 L36 24 L34 22 L34 46 L30 46 L30 22 L28 24 L24 18 Z M22 48 L42 48 L42 54 L22 54 Z",
  accessories: "M20 26 C20 18 25 12 32 12 C39 12 44 18 44 26 L48 26 L48 54 L16 54 L16 26 Z M25 26 C25 21 28 17 32 17 C36 17 39 21 39 26",
};

export default function ProductImage({
  palette,
  category,
  className,
  label,
}: {
  palette: [string, string];
  category: string;
  className?: string;
  label?: string;
}) {
  const gradientId = `grad-${palette[0].replace("#", "")}-${palette[1].replace("#", "")}`;
  const glyph = GLYPHS[category] ?? GLYPHS.accessories;

  return (
    <svg
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={label ?? `${category} product image`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette[0]} />
          <stop offset="100%" stopColor={palette[1]} />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill={`url(#${gradientId})`} />
      <path d={glyph} fill="rgba(246,243,234,0.85)" />
    </svg>
  );
}
