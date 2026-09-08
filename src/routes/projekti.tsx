import { createFileRoute, Link } from "@tanstack/react-router";

import { ProjectGallery } from "@/components/ProjectGallery";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading, buttonStyles } from "@/components/ui-kit";

export const Route = createFileRoute("/projekti")({
  head: () => ({
    meta: [
      { title: "Projekti | Ugradnja PVC stolarije – Brane-mont" },
      {
        name: "description",
        content:
          "Pogledajte projekte koje je Brane-mont realizirao: PVC prozori, vrata, klizne stijene, rolete i komarnici na objektima u Kaštelima i okolici.",
      },
      { property: "og:title", content: "Projekti | Brane-mont" },
      {
        property: "og:description",
        content: "Pogledajte neke od projekata ugradnje PVC stolarije koje smo realizirali.",
      },
    ],
  }),
  component: Projekti,
});

function Projekti() {
  return (
    <>
      <Section className="pb-0">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Projekti</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Naši projekti</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Pogledajte neke od projekata koje smo realizirali.
          </p>
        </Reveal>
      </Section>

      <Section className="pt-10 sm:pt-12">
        <ProjectGallery />
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

      <Section>
        <SectionHeading
          title="Uskoro još fotografija"
          subtitle="Galeriju redovito dopunjujemo fotografijama novih realiziranih projekata."
          align="center"
        />
      </Section>
    </>
  );
}
