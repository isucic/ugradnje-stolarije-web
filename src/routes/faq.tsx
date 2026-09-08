import { createFileRoute, Link } from "@tanstack/react-router";

import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/Reveal";
import { Section, buttonStyles } from "@/components/ui-kit";
import { faq } from "@/data/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Česta pitanja | Brane-mont – PVC stolarija" },
      {
        name: "description",
        content:
          "Odgovori na česta pitanja o ugradnji PVC stolarije: slanje upita, rokovi ugradnje, završna obrada, područje rada i tijek posla.",
      },
      { property: "og:title", content: "Česta pitanja | Brane-mont" },
      {
        property: "og:description",
        content: "Odgovori na najčešća pitanja o ugradnji PVC stolarije.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <>
      <Section className="pb-0">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">FAQ</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Česta pitanja</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Odgovori na pitanja koja najčešće dobivamo. Ako ne pronađete odgovor, slobodno nam se
            javite.
          </p>
        </Reveal>
      </Section>

      <Section className="pt-10 sm:pt-12">
        <FaqAccordion />
        <Reveal delay={80} className="mt-10">
          <Link to="/kontakt" className={buttonStyles.primary}>
            Zatražite ponudu
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
