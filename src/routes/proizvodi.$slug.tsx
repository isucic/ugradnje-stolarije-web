import { useState, useRef } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";

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
        meta: [
          { title: "Stranica nije pronađena | Brane-mont" },
          { name: "robots", content: "noindex" },
        ],
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Koliko se piksela pomiče na klik strelice
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Stanje za praćenje otvorene slike u galeriji (lightbox)
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null && product.gallery) {
      setActiveImageIndex((prev) => (prev! + 1) % product.gallery.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null && product.gallery) {
      setActiveImageIndex((prev) => (prev! - 1 + product.gallery.length) % product.gallery.length);
    }
  };

  const selectedImage =
    activeImageIndex !== null && product.gallery
      ? (product.gallery[activeImageIndex] ?? null)
      : null;

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
            <div className="mt-8 rounded-md border border-dashed border-primary/30 bg-secondary/50 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Dodatne informacije
              </p>
              {/* PROMIJENJENO: text-sm zamijenjen s text-lg, dodan veći razmak gore i udoban prored */}
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
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
        <div className="flex items-center justify-between">
          <SectionHeading eyebrow="Galerija" title={`Fotografije – ${product.name}`} />

          {/* Navigacijske strelice */}
          <div className="flex gap-2">
            <button
              onClick={() => scrollGallery("left")}
              aria-label="Prethodna slika"
              className="p-2 rounded-full border border-border bg-background hover:bg-secondary transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-primary-deep" />
            </button>
            <button
              onClick={() => scrollGallery("right")}
              aria-label="Sljedeća slika"
              className="p-2 rounded-full border border-border bg-background hover:bg-secondary transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-primary-deep" />
            </button>
          </div>
        </div>

        {product.gallery && product.gallery.length > 0 ? (
          <div className="relative mt-6">
            {/* Kontejner s referencom za gumbe */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 pb-4 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {product.gallery.map((photo, index) => (
                <div
                  key={`${photo.src}-${index}`}
                  onClick={() => setActiveImageIndex(index)}
                  // Prilagođena širina kartica za vertikalne slike (da nisu preširoke na desktopu)
                  className="flex-none w-[70%] sm:w-[40%] lg:w-[24%] snap-start overflow-hidden rounded-md border border-border bg-background shadow-card cursor-pointer group"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    // PROMIJENJENO: Uspravni omjer 3/4 umjesto vodoravnog 4/3
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground mt-3">
              Kliknite na strelice za pregled ostalih slika ili na sliku za uvećanje
            </p>
          </div>
        ) : (
          <p className="mt-10 text-muted-foreground">
            Galerija fotografija je trenutno prazna za ovaj proizvod.
          </p>
        )}
      </Section>
      {/* Lightbox Modal preko cijelog ekrana na klik */}
      {activeImageIndex !== null && product.gallery && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setActiveImageIndex(null)}
        >
          <button
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
            onClick={() => setActiveImageIndex(null)}
          >
            <X className="w-6 h-6" />
          </button>

          <button
            className="absolute left-4 md:left-8 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors cursor-pointer"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {product.gallery && activeImageIndex !== null && product.gallery[activeImageIndex] && (
            <div className="max-w-5xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
              <img
                src={product.gallery[activeImageIndex]?.src}
                alt={product.gallery[activeImageIndex]?.alt}
                className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl mx-auto"
              />
              <p className="text-white/80 text-center mt-3 text-sm">
                {activeImageIndex + 1} / {product.gallery.length}
              </p>
            </div>
          )}

          <button
            className="absolute right-4 md:right-8 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors cursor-pointer"
            onClick={handleNext}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
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
