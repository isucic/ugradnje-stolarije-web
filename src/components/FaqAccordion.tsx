import { Plus } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/Reveal";
import { faq } from "@/data/site";
import { cn } from "@/lib/utils";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-10 divide-y divide-border overflow-hidden rounded-md border border-border bg-card shadow-card">
      {faq.map((item, index) => {
        const isOpen = open === index;
        return (
          <Reveal key={item.q} delay={index * 40}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-primary-deep transition-colors hover:bg-secondary/60 sm:px-7 sm:text-lg"
              >
                {item.q}
                <Plus
                  className={cn(
                    "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 text-sm leading-relaxed text-muted-foreground sm:px-7 sm:text-base">
                  {item.a}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
