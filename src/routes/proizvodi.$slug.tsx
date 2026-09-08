import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading, buttonStyles } from "@/components/ui-kit";
import { products } from "@/data/site";

function findProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const Route = createFileRoute("/proizvodi/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { slug: product.slug };
  },
  head: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) {
      return {
        meta: [{ title: "Stranica nije pronađena | Brane-mont" }, { name: "robots", content: "noindex" }],
      };
    }
    const description = `${product.name} – ${product.short} Brane-mont, više od 20 godina iskustva u ugradnji PVC stolarije.`;
    return {
      meta: [
        { title: `${product.name} | Brane-mont` },
        { name: "description", content: description },
        { property: "og:title", content: `${product.name} | Brane-mont` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProizvodDetalj,
});

function ProizvodDetalj() {
  const { slug } = Route.useLoaderData();
  const product = findProduct(slug)!;

  return (
    <>
      <section className="relative isolate flex min-h-[52vh] items-end overflow-hidden">
        <img
          src={product.image}
          alt={product.alt}
          width={1200}
          height={900}
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-primary-deep/90 via-primary-deep/60 to-primary-deep/20"
          aria-hidden="true"
        />
        <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-24 sm:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/75">
              Proizvodi
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl leading-tight text-primary-foreground sm:text-5xl">
              {product.name}
            </h1>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl">O proizvodu</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{product.intro}</p>
            <div className="mt-8 rounded-md border border-dashed border-primary/30 bg-secondary/50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Dodatne informacije
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {product.placeholderNote}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="rounded-md border border-border bg-card p-6 shadow-card">
            <h2 className="text-xl text-primary-deep">Prednosti</h2>
            <ul className="mt-5 space-y-3">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
            <Link to="/kontakt" className={`${buttonStyles.primary} mt-7 w-full`}>
              Zatražite ponudu
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Galerija" title={`Fotografije – ${product.name}`} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {product.gallery.map((photo, index) => (
            <Reveal
              key={`${photo.src}-${index}`}
              delay={(index % 3) * 70}
              className="overflow-hidden rounded-md border border-border bg-background shadow-card"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title="Ostali proizvodi" align="center" />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {products
            .filter((p) => p.slug !== product.slug)
            .map((p) => (
              <Link
                key={p.slug}
                to="/proizvodi/$slug"
                params={{ slug: p.slug }}
                className="rounded-sm border border-border bg-card px-5 py-2.5 text-sm font-medium text-primary-deep transition-colors hover:border-primary hover:text-primary"
              >
                {p.name}
              </Link>
            ))}
        </div>
      </Section>
    </>
  );
}
