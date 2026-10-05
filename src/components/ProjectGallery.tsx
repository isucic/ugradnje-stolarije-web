import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Reveal } from "@/components/Reveal";
import { galleryCategories, type GalleryItem } from "@/data/site";
import { cn } from "@/lib/utils";

export function ProjectGallery() {
  const [filter, setFilter] = useState<string>("Sve");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // 1. Automatsko učitavanje slika pomoću import.meta.glob
  const imagesModules = import.meta.glob("@/assets/galerija/**/*.{jpg,jpeg,png,webp}", {
    eager: true,
  });

  // 2. Pretvaranje učitanih modula u listu GalleryItem objekata
  const items: GalleryItem[] = useMemo(() => {
    return Object.entries(imagesModules).map(([path, module]) => {
      const fileNameWithExt = path.split("/").pop() || "";
      const fileName = fileNameWithExt.split(".")[0] || "slika";

      const pathSegments = path.split("/");
      const folderName = pathSegments.length >= 2 ? pathSegments[pathSegments.length - 2] : "";

      let categoryName = "Ostalo";
      if (folderName === "prozori") categoryName = "PVC Prozori";
      else if (folderName === "ulaznaVrata") categoryName = "PVC Vrata";
      else if (folderName === "klizneStijene") categoryName = "PVC Klizne stijene";
      else if (folderName === "rolete") categoryName = "PVC Rolete";
      else if (folderName === "grilje") categoryName = "PVC i Alu grilje";
      else if (folderName === "komarnici") categoryName = "Komarnici";

      return {
        src: (module as { default: string }).default,
        alt: `Projekt - ${fileName.replace(/-/g, " ")}`,
        category: categoryName,
      };
    });
  }, [imagesModules]);

  const usedCategories = useMemo(
    () => galleryCategories.filter((c) => items.some((i) => i.category === c)),
    [items],
  );

  const filtered = useMemo(
    () => (filter === "Sve" ? items : items.filter((i) => i.category === filter)),
    [items, filter],
  );

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpenIndex((i) => (i === null ? i : (i + dir + filtered.length) % filtered.length)),
    [filtered.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : filtered[openIndex];

  return (
    <div>
      <Reveal className="mt-10 flex flex-wrap gap-2">
        <div className="flex flex-wrap gap-x-7 border-b border-border">
          {["Sve", ...usedCategories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setFilter(cat);
                setOpenIndex(null);
              }}
              className={cn(
                "relative cursor-pointer px-1 pb-3 pt-1 text-base transition-colors duration-200",
                filter === cat
                  ? "font-bold text-primary after:absolute after:bottom-[-1px] after:left-0 after:h-[3px] after:w-full after:bg-primary"
                  : "font-medium text-foreground hover:text-primary",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {filtered.length > 0 ? (
          filtered.map((item, index) => (
            <Reveal
              key={`${item.src}-${index}`}
              delay={(index % 3) * 60}
              className="break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group block w-full overflow-hidden cursor-pointer border border-border bg-secondary shadow-card transition-shadow duration-300 hover:shadow-lift"
                aria-label={`Otvori fotografiju: ${item.alt}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </button>
            </Reveal>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            Trenutno nema slika u odabranoj kategoriji.
          </div>
        )}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pregled fotografije"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-primary-deep/95 p-4 animate-in fade-in duration-200"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Zatvori pregled"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-sm bg-background/10 text-primary-foreground transition-colors hover:bg-background/20"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Prethodna fotografija"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-3 inline-flex h-11 w-11 items-center justify-center cursor-pointer rounded-sm bg-background/10 text-primary-foreground transition-colors hover:bg-background/20 sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <figure className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img src={active.src} alt={active.alt} className="max-h-[78vh] w-full object-contain" />
          </figure>
          <button
            type="button"
            aria-label="Sljedeća fotografija"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-3 inline-flex h-11 w-11 items-center justify-center cursor-pointer rounded-sm bg-background/10 text-primary-foreground transition-colors hover:bg-background/20 sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
