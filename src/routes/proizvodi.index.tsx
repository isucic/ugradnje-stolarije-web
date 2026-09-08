import { createFileRoute, Link } from "@tanstack/react-router";

import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading, buttonStyles } from "@/components/ui-kit";
import { products } from "@/data/site";

export const Route = createFileRoute("/proizvodi/")({
  head: () => ({
    meta: [
      { title: "Proizvodi | PVC prozori, vrata, rolete – Brane-mont" },
      {
        name: "description",
        content:
          "Ponuda Brane-mont: PVC prozori, PVC vrata, PVC klizne stijene, komarnici, grilje i rolete. Izrada po mjeri i profesionalna ugradnja.",
      },
      { property: "og:title", content: "Proizvodi | Brane-mont" },
      {
        property: "og:description",
        content:
          "PVC prozori, vrata, klizne stijene, komarnici, grilje i rolete – izrada po mjeri i ugradnja.",
      },
    ],
  }),
  component: Proizvodi,
});

function Proizvodi() {
  return (
    <>
      <Section className="pb-0">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Proizvodi</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Naša ponuda</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Izrađujemo i ugrađujemo PVC stolariju te pripadajuće proizvode za zaštitu i zasjenjenje
            otvora. Odaberite kategoriju za više informacija.
          </p>
        </Reveal>
      </Section>

      <Section className="pt-10 sm:pt-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} delay={(index % 3) * 80} />
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          title="Niste sigurni što vam treba?"
          subtitle="Pošaljite nam osnovne informacije o objektu i predložit ćemo rješenje."
          align="center"
        />
        <Reveal delay={80} className="mt-8 flex justify-center">
          <Link to="/kontakt" className={buttonStyles.primary}>
            Zatražite ponudu
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
