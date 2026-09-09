import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import type { Product } from "@/data/site";

export function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        to="/proizvodi/$slug"
        params={{ slug: product.slug }}
        className="group flex h-full flex-col overflow-hidden rounded-md border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
      >
        {/* Slika s novim omjerom: 16:10 na mobitelu umjesto uspravnog 4:5 */}
        <div className="group/image relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.alt}
            loading="lazy"
            decoding="async"
            width={1200}
            height={900}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Naslov i strelica ispod slike */}
        <div className="flex flex-1 flex-col justify-between p-4">
          <h3 className="text-base font-semibold text-primary-deep sm:text-lg group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary sm:text-sm">
            <span>Saznaj više</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}