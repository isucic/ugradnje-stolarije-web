import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Reveal } from "@/components/Reveal";
import { gallery, galleryCategories, type GalleryItem } from "@/data/site";
import { cn } from "@/lib/utils";

export function ProjectGallery({ items = gallery }: { items?: GalleryItem[] }) {
  const [filter, setFilter] = useState<string>("Sve");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
        {filtered.map((item, index) => (
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
        ))}
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
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[78vh] w-full object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-primary-foreground/80">
              {active.alt}
            </figcaption>
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
