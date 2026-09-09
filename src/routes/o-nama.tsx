import { createFileRoute, Link } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import { Section, buttonStyles } from "@/components/ui-kit";
import { company, images } from "@/data/site";

export const Route = createFileRoute("/o-nama")({
  head: () => ({
    meta: [
      { title: "O nama | BRANE-MONT" },
      {
        name: "description",
        content:
          "BRANE-MONT iz Kaštel Kambelovca od 2008. godine ugrađuje TROHA-DIL PVC stolariju od Kömmerling profila.",
      },
    ],
  }),
  component: ONama,
});

function ONama() {
  return (
    <>
      {/* 1. UVODNI TEKST (Središnje poravnat, bez slika sa strane) */}
      <Section className="lg:pb-0 py-10">
        <Reveal className="w-full">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">O nama</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">
            Obrt s iskustvom i pažnjom prema detalju
          </h1>

          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            Obrt <strong className="font-semibold text-primary-deep">{company.name}</strong> sa
            sjedištem u Kaštel Kambelovcu (Nakide 8) osnovan je u svibnju 2008. godine. Primarna
            djelatnost nam je ugradnja PVC stolarije te prateći završni građevinski radovi.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Kao službeni franšizni partner tvrtke{" "}
            <strong className="font-semibold text-primary-deep">TROHA-DIL</strong>, u ponudi imamo
            vrhunske <strong className="font-semibold text-primary-deep">Kömmerling</strong> PVC
            profile uz izravnu garanciju kvalitete, preciznu izmjeru i ugradnju.
          </p>

          <div className="my-8 grid grid-cols-1 gap-2 sm:my-14 sm:grid-cols-1 sm:gap-2">
            <Reveal delay={120}>
              <div className="aspect-[16/9] overflow-hidden rounded-sm sm:aspect-[16/4]">
                <img
                  src={images.oNama}
                  alt="BRANE-MONT detalj ugradnje 1"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </Reveal>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Radi se o trostrukoj ulozi – TROHA DIL, tvrtka iz Bjelovara, nudi BRANE-MONT-u
            visokokvalitetan proizvod, a sve osluškujući želje i potrebe kupaca. TROHA DIL nam jamči
            kvalitetom, brzinom izrade proizvoda, rokovima isporuke, te cijenom koja je povoljnija
            od cijene istog proizvoda drugih konkurentskih tvrtki.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            BRANE-MONT kao obrt za ugradnju stolarije, preuzima gotov proizvod, te ga nastoji
            montirati prema dogovoru na opće zadovoljstvo svih strana, a nadasve kupca koji nam je
            ukazao željeno povjerenje.
          </p>
        </Reveal>

        <Reveal delay={100} className="my-10 flex flex-col justify-center gap-4 sm:my-20 sm:flex-row">
          <Link to="/kontakt" className={`${buttonStyles.primary} w-full text-center sm:w-auto`}>
            Zatražite ponudu
          </Link>
          <a href="tel:021220330" className={`${buttonStyles.outline} w-full text-center sm:w-auto`}>
            Nazovite 021/220-330
          </a>
        </Reveal>
      </Section>

      {/* 3 BRZE BROJKE - BEZ KUTIJA I BEZ RUBIĆA */}
      <Section tone="muted" className="py-12">
        <div className="grid gap-8 sm:grid-cols-3 text-center">
          <Reveal delay={0}>
            <span className="font-display text-3xl font-bold text-primary-deep sm:text-4xl">
              15+ godina
            </span>
            <p className="mt-2 text-sm text-muted-foreground">Tradicije i iskustva u ugradnji</p>
          </Reveal>

          <Reveal delay={80}>
            <span className="font-display text-3xl font-bold text-primary-deep sm:text-4xl">
              TROHA-DIL
            </span>
            <p className="mt-2 text-sm text-muted-foreground">Ovlašteni franšizni partner</p>
          </Reveal>

          <Reveal delay={160}>
            <span className="font-display text-3xl font-bold text-primary-deep sm:text-4xl">
              Kömmerling
            </span>
            <p className="mt-2 text-sm text-muted-foreground">Vrhunski njemački PVC profili</p>
          </Reveal>
        </div>
      </Section>

      {/* POZIV NA AKCIJU (CTA) */}
      <Section tone="deep" className="py-12">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl text-white">
              Posjetite naš salon na adresi
            </h2>
            <p className="mt-2 text-sm sm:text-base text-primary-foreground/75">
              Nakide 8, Kaštel Kambelovac
            </p>
          </Reveal>
          <Reveal delay={100} className="w-full shrink-0 sm:w-auto">
            <Link to="/kontakt" className={`${buttonStyles.light} block text-center`}>
              Zatražite ponudu
            </Link>
          </Reveal>
        </div>
      </Section>
    </>
  );
}