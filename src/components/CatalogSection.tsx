import { BookOpen, Download } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading, buttonStyles } from "@/components/ui-kit";
import { catalog } from "@/data/site";
import { cn } from "@/lib/utils";

export function CatalogSection() {
  const available = Boolean(catalog.file);

  return (
    <Section tone="muted">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Katalog"
            title="Pregledajte naš katalog proizvoda"
            subtitle="U katalogu ćete pronaći pregled naše ponude PVC stolarije i pripadajućih proizvoda. Katalog možete prelistati izravno u pregledniku ili ga preuzeti na svoje računalo."
          />
          <Reveal delay={80} className="mt-8 flex flex-wrap gap-3">
            {available ? (
              <>
                <a
                  href={catalog.file as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles.primary}
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Prelistaj katalog
                </a>
                <a
                  href={catalog.file as string}
                  download={catalog.fileName}
                  className={buttonStyles.outline}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Preuzmi katalog
                </a>
              </>
            ) : (
              <>
                <span className={cn(buttonStyles.primary, "pointer-events-none opacity-60")}>
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Prelistaj katalog
                </span>
                <span className={cn(buttonStyles.outline, "pointer-events-none opacity-60")}>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Preuzmi katalog
                </span>
              </>
            )}
          </Reveal>
          {!available ? (
            <Reveal delay={120}>
              <p className="mt-4 text-sm text-muted-foreground">
                Katalog u PDF formatu bit će dostupan uskoro. Do tada nam se slobodno javite za
                informacije o ponudi.
              </p>
            </Reveal>
          ) : null}
        </div>

        <Reveal
          delay={120}
          className="flex aspect-[4/3] items-center justify-center rounded-md border border-dashed border-primary/30 bg-background p-8 text-center shadow-card"
        >
          <div>
            <BookOpen className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
            <p className="mt-4 font-display text-xl text-primary-deep">
              {available ? "Katalog proizvoda" : "Katalog je u pripremi"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {available
                ? "PDF katalog otvara se u novom prozoru."
                : "Mjesto predviđeno za PDF katalog koji će biti objavljen naknadno."}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
