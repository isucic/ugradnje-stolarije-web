import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Hammer, Handshake, Layers } from "lucide-react";

import { CatalogSection } from "@/components/CatalogSection";
import { ContactInfoCards, LocationMap } from "@/components/ContactBlocks";
import { ProductCard } from "@/components/ProductCard";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading, buttonStyles } from "@/components/ui-kit";
import { company, images, products, whyUs } from "@/data/site";
import { cn } from "@/lib/utils";
import HandshakeIcon from "@/components/HandshakeIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brane-mont | PVC stolarija Kaštel Kambelovac" },
      {
        name: "description",
        content:
          "Brane-mont – više od 20 godina iskustva u ugradnji PVC stolarije. PVC prozori, vrata, klizne stijene, komarnici, grilje i rolete.",
      },
      { property: "og:title", content: "Brane-mont | PVC stolarija Kaštel Kambelovac" },
      {
        property: "og:description",
        content:
          "Više od 20 godina iskustva u ugradnji PVC stolarije. Kömmerling profili, profesionalna ugradnja, pouzdana usluga.",
      },
    ],
  }),
  component: Pocetna,
});

const whyIcons = [Award, Layers, Hammer, Handshake];

function Pocetna() {
  return (
    <>
      {/* HERO */}
      {/* <section className="relative isolate flex min-h-[86vh] items-center overflow-hidden">
        <img
          src={images.hero}
          alt="Moderna dalmatinska kuća s velikim bijelim PVC prozorima i kliznom staklenom stijenom"
          width={1920}
          height={1088}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-deep/85 via-primary-deep/65 to-primary-deep/25"
          aria-hidden="true"
        />
        <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6">
          <div className="max-w-2xl text-primary-foreground">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-foreground/75">
                {company.city} · Dalmacija
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
                PVC stolarija za vaš dom
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/85">
                Više od 20 godina iskustva u ugradnji kvalitetne PVC stolarije.
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-9 flex flex-wrap gap-3">
              <Link to="/kontakt" className={buttonStyles.light}>
                Zatražite ponudu
              </Link>
              <Link to="/projekti" className={buttonStyles.ghostLight}>
                Pogledajte naše projekte
              </Link>
            </Reveal>
          </div>
        </div>
      </section> */}

      {/* HERO */}
      <section className="relative isolate flex min-h-[85vh] items-center justify-center overflow-hidden py-12 lg:py-16">
        {/* MOBILNA POZADINA: Slika projekta s tamnim preklopom (Samo na mobitelu) */}
        <div className="absolute inset-0 z-0 lg:hidden">
          <img
            src={images.hero}
            alt="PVC stolarija projekt"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* TEKST I GUMBI (Na mobitelu bijeli tekst na pozadini, na desktopu tamni tekst) */}
            <div className="max-w-2xl text-center text-white lg:col-span-6 lg:text-left lg:text-primary-deep">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80 lg:text-primary-deep/75">
                  {company.city} · Dalmacija
                </p>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:mt-5 lg:text-6xl lg:text-primary-deep">
                  PVC stolarija za vaš dom
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg lg:mt-6 lg:text-primary-deep/85">
                  Više od 20 godina iskustva u ugradnji kvalitetne PVC stolarije.
                </p>
              </Reveal>

              <Reveal
                delay={240}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
              >
                <Link
                  to="/kontakt"
                  className={`${buttonStyles.primary} w-full text-center sm:w-auto`}
                >
                  Zatražite ponudu
                </Link>
                <Link
                  to="/projekti"
                  className={`${buttonStyles.outline} w-full text-center sm:w-auto bg-white/10 text-white border-white hover:bg-white/20 lg:bg-transparent lg:text-primary-deep lg:border-primary-deep`}
                >
                  Pogledajte naše projekte
                </Link>
              </Reveal>
            </div>

            {/* DESNA STRANA: Prozor sa slikom (Samo na velikim ekranima) */}
            <div className="hidden justify-center lg:col-span-6 lg:flex">
              <Reveal delay={100} className="relative inline-block w-full max-w-[520px]">
                {/* Slika unutar okvira */}
                <div className="absolute inset-[6%] overflow-hidden rounded-sm">
                  <img
                    src={images.hero}
                    alt="Pogled na naš projekt kroz prozor"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* Okvir prozora */}
                <img
                  src={images.okvirProzora}
                  alt="Okvir prozora"
                  className="pointer-events-none relative z-10 block h-auto w-full object-contain"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* O NAMA / UVOD */}
      {/* <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="O nama"
              title="Više od 20 godina iskustva"
              subtitle=""
            />
            <Reveal delay={80} className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Više od 20 godina iskustva",
                "Kvalitetni Kömmerling profili",
                "Profesionalna ugradnja",
                "Pouzdana usluga",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-primary-deep shadow-card"
                >
                  {item}
                </div>
              ))}
            </Reveal>
            <Reveal delay={140} className="mt-8">
              <Link to="/o-nama" className={buttonStyles.outline}>
                Saznajte više o nama
              </Link>
            </Reveal>
          </div>
          <Reveal delay={120} className="relative">
            <img
              src={images.oNama}
              alt="Majstor ugrađuje bijeli PVC prozor u obiteljskoj kući"
              loading="lazy"
              decoding="async"
              width={1400}
              height={1000}
              className="w-full rounded-md object-cover shadow-lift"
            />
            <div className="absolute -bottom-6 left-6 hidden rounded-md bg-primary px-6 py-5 text-primary-foreground shadow-lift sm:block">
              <p className="font-display text-3xl">20+</p>
              <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/80">
                godina iskustva
              </p>
            </div>
          </Reveal>
        </div>
      </Section> */}

      {/* PROIZVODI */}
      <Section tone="muted">
        <SectionHeading eyebrow="Ponuda" title="Naši proizvodi" subtitle="" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} delay={(index % 3) * 80} />
          ))}
        </div>
      </Section>

      {/* KÖMMERLING */}
      <Section>
        <div className="grid items-center gap-4 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1 flex justify-center">
            <img
              src={images.profil}
              alt="Detalj presjeka bijelog PVC profila s komorama i brtvama"
              loading="lazy"
              decoding="async"
              width={330}
              height={200}
              className="object-cover"
            />
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Kömmerling profili"
              title="Kvaliteta počinje od dobrog profila"
              subtitle="Za izradu PVC stolarije koristimo Kömmerling profile, renomiranog proizvođača PVC sustava."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["KÖMMERLING MD 76", "KÖMMERLING 88"].map((item, index) => (
                <Reveal
                  key={item}
                  delay={index * 70}
                  className="rounded-xl border border-border bg-card p-5 shadow-card transition-transform duration-300 hover:-translate-y-1"
                >
                  <p className="font-display text-lg text-primary-deep">{item}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* PROJEKTI */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Projekti"
          title="Reference"
          subtitle="Pregled dosadašnjih realizacija Brane-monta."
        />
        <ProjectGallery />
        <Reveal delay={80} className="mt-10">
          <Link to="/projekti" className={buttonStyles.outline}>
            Svi projekti
          </Link>
        </Reveal>
      </Section>

      {/* ZAŠTO MI */}
      <Section>
        <SectionHeading eyebrow="Zašto Brane-mont" title="Zašto odabrati nas" align="center" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item, index) => {
            const Icon = whyIcons[index] ?? Award;
            return (
              <Reveal
                key={item.title}
                delay={index * 80}
                className="group rounded-md border border-border bg-card p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg text-primary-deep">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* KATALOG */}
      {/* <CatalogSection /> */}

      {/* CTA */}
      <Section tone="deep">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">Planirate novu stolariju?</h2>
            <p className="mt-3 text-lg text-primary-foreground/75">
              Pošaljite nam upit i zatražite ponudu.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <Link to="/kontakt" className={cn(buttonStyles.light, "px-8 py-4 text-base")}>
              Zatražite ponudu
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* LOKACIJA I KONTAKT */}
      <Section>
        <SectionHeading
          eyebrow="Lokacija"
          title="Gdje se nalazimo"
          subtitle={`${company.name}, ${company.street}, ${company.city}`}
        />
        <div className="mt-5">
          <LocationMap />
        </div>

        <div className="my-10 h-px w-full bg-primary/20" />
        <div className="mt-10">
          <ContactInfoCards />
        </div>
      </Section>

      {/*Sustav fransize troha-dil */}
      <Section tone="muted" className="py-8 lg:py-8">
        <div className="grid grid-cols-2 items-center gap-8 lg:grid-cols-3 lg:gap-10">
          {/* Handshake - samo desktop */}
          <Reveal>
            <div className="hidden items-center justify-center lg:flex">
              <HandshakeIcon className="h-60 w-70 text-primary opacity-50" />
              {/* <img
                src={images.handshake}
                alt="Handshake"
                className="h-60 w-auto text-primary "
              /> */}
            </div>
          </Reveal>

          {/* Tekst */}
          <Reveal>
            <div className="text-center lg:text-left">
              <SectionHeading
                eyebrow="Dio Troha-dil sustava"
                title=""
                subtitle="Brane-mont djeluje u sustavu franšize Troha-dil."
              />
            </div>
          </Reveal>

          {/* Troha-Dil logo */}
          <Reveal delay={100}>
            <div className="flex items-center justify-center">
              <img
                src={images.trohadillogo}
                alt="Troha-Dil"
                className="h-20 w-auto object-contain"
              />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
