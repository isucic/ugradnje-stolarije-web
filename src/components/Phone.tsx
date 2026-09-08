import { cn } from "@/lib/utils";
import { company } from "@/data/site";

/**
 * Broj telefona: na mobilnim uređajima klikabilan (tel: poveznica),
 * na desktopu običan tekst.
 */
export function Phone({ className }: { className?: string }) {
  return (
    <>
      <a href={company.phoneHref} className={cn("md:hidden", className)}>
        {company.phone}
      </a>
      <span className={cn("hidden md:inline", className)}>{company.phone}</span>
    </>
  );
}
