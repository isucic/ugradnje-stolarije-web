import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone as PhoneIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Phone } from "@/components/Phone";
import { company, navigation, images } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur transition-shadow duration-300",
        scrolled ? "border-border shadow-card" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20">
        <Link to="/" className="flex items-center" aria-label="Brane-mont početna stranica">
          <img src={images.logo} alt="Brane-mont" className="h-12 w-auto object-contain sm:h-14" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Glavna navigacija">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 text-sm font-medium text-muted-foreground xl:flex">
            <PhoneIcon className="h-4 w-4 text-primary" aria-hidden="true" />
            <Phone />
          </span>
          <Link
            to="/kontakt"
            className="hidden rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-deep sm:inline-flex"
          >
            Zatražite ponudu
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-primary-deep transition-colors hover:bg-secondary lg:hidden"
            aria-label={open ? "Zatvori izbornik" : "Otvori izbornik"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-300 ease-out lg:hidden",
          open ? "max-h-[32rem] opacity-100" : "max-h-0 border-transparent opacity-0",
        )}
      >
        <nav
          className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6"
          aria-label="Mobilna navigacija"
        >
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-sm px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
              activeProps={{ className: "text-primary bg-secondary" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/kontakt"
            className="mt-2 rounded-sm bg-primary px-5 py-3 text-center text-base font-semibold text-primary-foreground"
          >
            Zatražite ponudu
          </Link>
          <a
            href={company.phoneHref}
            className="mt-1 rounded-sm px-3 py-3 text-center text-base font-medium text-primary"
          >
            {company.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
