import { ExternalLink, Mail, MapPin, Phone as PhoneIcon } from "lucide-react";

import { Phone } from "@/components/Phone";
import { Reveal } from "@/components/Reveal";
import { buttonStyles } from "@/components/ui-kit";
import { company } from "@/data/site";
import { cn } from "@/lib/utils";

export function LocationMap() {
  return (
    <Reveal className="overflow-hidden bg-card shadow-card">
      <iframe
        src={company.mapsEmbed}
        title="Karta lokacije Brane-mont, Nakide 8, Kaštel Kambelovac"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[320px] w-full border-0 sm:h-[420px]"
      />
    </Reveal>
  );
}

export function ContactInfoCards({ className }: { className?: string }) {
  const items = [
    {
      icon: PhoneIcon,
      label: "Telefon",
      value: <Phone className="text-base font-semibold text-primary-deep" />,
    },
    {
      icon: Mail,
      label: "Email",
      value: (
        <a
          href={`mailto:${company.email}`}
          className="break-all text-base font-semibold text-primary-deep hover:text-primary"
        >
          {company.email}
        </a>
      ),
    },
    {
      icon: MapPin,
      label: "Adresa",
      value: (
        <span className="text-base font-semibold text-primary-deep">
          {company.street}, {company.city}
        </span>
      ),
    },
  ];

  return (
    <div className={cn("grid gap-4 sm:grid-cols-3", className)}>
      {items.map((item, index) => (
        <Reveal
          key={item.label}
          delay={index * 70}
          className="rounded-md border border-border bg-card p-6 shadow-card"
        >
          <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {item.label}
          </p>
          <p className="mt-2">{item.value}</p>
        </Reveal>
      ))}
    </div>
  );
}
