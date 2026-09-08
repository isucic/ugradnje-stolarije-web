import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone as PhoneIcon } from "lucide-react";

import { Phone } from "@/components/Phone";
import { company, navigation, products } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary-deep text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-semibold">{company.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
            {company.tagline}
          </p>
        </div>

        <nav aria-label="Podnožje – navigacija">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
            Navigacija
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {navigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-primary-foreground/85 transition-colors hover:text-primary-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Podnožje – proizvodi">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
            Proizvodi
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {products.map((product) => (
              <li key={product.slug}>
                <Link
                  to="/proizvodi/$slug"
                  params={{ slug: product.slug }}
                  className="text-primary-foreground/85 transition-colors hover:text-primary-foreground"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
            Kontakt
          </p>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/85">
            <li className="flex items-start gap-2">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <Phone />
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={`mailto:${company.email}`} className="break-all hover:text-primary-foreground">
                {company.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {company.street}, {company.city}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-primary-foreground/60 sm:px-6">
          © {new Date().getFullYear()} {company.name}. Sva prava pridržana.
        </div>
      </div>
    </footer>
  );
}
