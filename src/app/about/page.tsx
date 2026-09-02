import type { Metadata } from "next";
import ProductImage from "@/components/ProductImage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${site.legalName} and the philosophy behind Shieldspring clothing.`,
};

export default function AboutPage() {
  return (
    <div className="container-page py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">About Us</p>
        <h1 className="mt-3 font-display text-3xl md:text-4xl">
          Clothing built for the seasons you actually live in.
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          {site.name} started with a simple frustration: most clothing is designed
          for a photograph, not for a life. We wanted field jackets that shrug off
          real weather, denim that softens instead of falling apart, and knitwear
          that keeps its shape wash after wash — all without a designer price tag.
        </p>
      </div>

      <div className="mt-12 aspect-[21/9] overflow-hidden rounded-lg">
        <ProductImage
          palette={["#3f4a34", "#141712"]}
          category="men"
          label="Shieldspring craftsmanship"
          className="h-full w-full"
        />
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-3">
        <div>
          <h2 className="font-display text-lg">Materials first</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            We source natural and recycled fibers from mills we&apos;ve worked with
            for years, favoring fabrics that get better with age over ones that
            just look good on day one.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg">Made to repair</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Every piece is constructed so it can be mended, not just replaced.
            Reinforced seams, replaceable hardware, and honest fabrics that hold
            up to real wear.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg">Small batch runs</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            We produce in limited runs to avoid overproduction and keep a close
            eye on quality — from the first sample through the final stitch.
          </p>
        </div>
      </div>

      <div className="mt-16 rounded-lg bg-paper-2 p-8 text-sm text-muted">
        <p>
          {site.legalName} (Company No. {site.registrationNo}) is registered at{" "}
          {site.address.line1}, {site.address.line2}, {site.address.line3}. For
          press, wholesale, or partnership inquiries, reach us at{" "}
          <a href={`mailto:${site.email}`} className="text-accent hover:underline">
            {site.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
