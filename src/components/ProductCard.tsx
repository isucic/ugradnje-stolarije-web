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
        className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
      >
        <div className="flex flex-col p-4">
          <h3 className="text-xl text-primary-deep">{product.name}</h3>
        </div>
        <div className="group/image relative aspect-[4/5] overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.alt}
            loading="lazy"
            decoding="async"
            width={1200}
            height={900}
            className="h-full w-full object-cover transition-all duration-500 ease-out group-hover/image:scale-105 group-hover/image:brightness-75"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-primary/0 opacity-0 transition-all duration-300 group-hover/image:bg-primary/25 group-hover/image:opacity-100">
            <span className="translate-y-2 text-lg font-semibold text-white transition-transform duration-300 group-hover/image:translate-y-0">
              Saznaj više
            </span>
          </div>
        </div>
        
      </Link>
    </Reveal>
  );
}
