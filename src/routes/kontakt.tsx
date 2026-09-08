import { createFileRoute } from "@tanstack/react-router";

import { ContactInfoCards, LocationMap } from "@/components/ContactBlocks";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt i zahtjev za ponudu | Brane-mont" },
      {
        name: "description",
        content:
          "Zatražite ponudu za PVC stolariju. Brane-mont, Nakide 8, Kaštel Kambelovac – telefon 021 220 330, email brane-mont@st.t-com.hr.",
      },
      { property: "og:title", content: "Kontakt | Brane-mont" },
      {
        property: "og:description",
        content: "Pošaljite upit i zatražite ponudu za PVC stolariju.",
      },
    ],
  }),
  component: Kontakt,
});

function Kontakt() {
  return (
    <>
      <Section className="pb-0">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Kontakt</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Zatražite ponudu</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Pošaljite nam osnovne informacije o objektu kako bismo vam mogli pripremiti što
            precizniju ponudu.
          </p>
        </Reveal>
      </Section>

      <Section className="pt-10 sm:pt-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal className="mb-6 rounded-xl border border-border bg-secondary/60 p-5 text-sm leading-relaxed text-muted-foreground">
              Za što precizniju ponudu navedite gdje se objekt nalazi, približan broj otvora i
              njihove dimenzije. Ako imate fotografije ili nacrt, možete ih priložiti.
            </Reveal>
            <Reveal delay={60}>
              <QuoteForm />
            </Reveal>
          </div>
          <div className="space-y-6">
            <ContactInfoCards className="lg:grid-cols-1" />
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Lokacija" title="Gdje se nalazimo" />
        <div className="mt-10">
          <LocationMap />
        </div>
      </Section>
    </>
  );
}
