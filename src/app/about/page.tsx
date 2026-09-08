import type { Metadata } from "next";
import ProductImage from "@/components/ProductImage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${site.legalName} and the Agent Lume brand.`,
};

export default function AboutPage() {
  return (
    <div className="container-page py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">About Us</p>
        <h1 className="mt-3 font-display text-3xl md:text-4xl">
          Wear the vibe. <span className="text-accent">Be the wave.</span>
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          {site.name} was born from a simple idea: clothing should be an extension
          of who you are, not a uniform. We make trend-forward streetwear, everyday
          basics, and bold accessories for the generation that refuses to blend in.
        </p>
      </div>

      <div className="mt-12 aspect-[21/9] overflow-hidden rounded-lg">
        <ProductImage
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
          alt="Agent Lume brand lifestyle"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-3">
        <div>
          <h2 className="font-display text-lg">Self-expression first</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Every piece is designed to let your personality shine through. Bold
            colors, unexpected details, and fits that feel like you.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg">Built to last</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            We pick substantial fabrics and reinforced seams so pieces hold their
            shape and colour through repeated wear and washing.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg">Inclusive sizing</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Fashion is for everyone. Our range spans kids to adults with
            gender-neutral options across the collection.
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
