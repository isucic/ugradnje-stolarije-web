import { createFileRoute, Link } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading, buttonStyles } from "@/components/ui-kit";
import { company, images, whyUs } from "@/data/site";

export const Route = createFileRoute("/o-nama")({
  head: () => ({
    meta: [
      { title: "O nama | Brane-mont – PVC stolarija" },
      {
        name: "description",
        content:
          "Brane-mont iz Kaštel Kambelovca više od 20 godina ugrađuje PVC stolariju od Kömmerling profila. Kvaliteta, profesionalna ugradnja i pouzdana usluga.",
      },
      { property: "og:title", content: "O nama | Brane-mont – PVC stolarija" },
      {
        property: "og:description",
        content:
          "Više od 20 godina iskustva u ugradnji PVC stolarije na području Kaštela i okolice.",
      },
    ],
  }),
  component: ONama,
});

const faze = [
  {
    title: "Početak rada",
    text: "Brane-mont počinje s radom u području ugradnje PVC stolarije i postupno gradi krug zadovoljnih klijenata.",
  },
  {
    title: "Rast i iskustvo",
    text: "Kroz godine rada stječemo iskustvo na različitim vrstama objekata – od obiteljskih kuća do stanova i poslovnih prostora.",
  },
  {
    title: "Danas",
    text: "S više od 20 godina iskustva nastavljamo raditi jednako pažljivo: dogovor, izmjera, izrada i ugradnja stolarije po mjeri.",
  },
];

function ONama() {
  return (
    <>
      <Section className="pb-0">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                O nama
              </p>
              <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">
                Obrt s iskustvom i pažnjom prema detalju
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {company.name} se više od dvadeset godina bavi ugradnjom PVC stolarije. Sjedište nam
                je u Kaštel Kambelovcu, a rad temeljimo na jednostavnom principu: kvalitetan
                materijal, pažljiva izmjera i uredna ugradnja.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Za izradu PVC stolarije koristimo Kömmerling profile, renomiranog proizvođača PVC
                sustava. Svaki posao dogovaramo izravno s naručiteljem, s izmjerom na objektu i
                jasnim dogovorom prije početka radova.
              </p>
            </Reveal>
            <Reveal delay={120} className="mt-8">
              <Link to="/kontakt" className={buttonStyles.primary}>
                Zatražite ponudu
              </Link>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <img
              src={images.oNama}
              alt="Ugradnja bijelog PVC prozora u obiteljskoj kući"
              loading="lazy"
              decoding="async"
              width={1400}
              height={1000}
              className="w-full rounded-md object-cover shadow-lift"
            />
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Naš put"
          title="Dvadeset i više godina rada"
          subtitle="Pregled razvoja obrta kroz godine. Detalji i konkretne godine bit će naknadno dopunjeni."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {faze.map((faza, index) => (
            <Reveal
              key={faza.title}
              delay={index * 90}
              as="li"
              className="relative rounded-md border border-border bg-card p-6 shadow-card"
            >
              <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl text-primary-deep">{faza.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faza.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Vrijednosti" title="Na čemu temeljimo svoj rad" align="center" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 70}
              className="rounded-md border border-border bg-card p-6 shadow-card transition-transform duration-300 hover:-translate-y-1"
            >
              <h3 className="text-lg text-primary-deep">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="deep">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">Planirate novu stolariju?</h2>
            <p className="mt-3 text-lg text-primary-foreground/75">
              Pošaljite nam upit i zatražite ponudu.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <Link to="/kontakt" className={buttonStyles.light}>
              Zatražite ponudu
            </Link>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
