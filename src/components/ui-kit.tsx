import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted" | "deep";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        tone === "muted" && "bg-secondary/60",
        tone === "deep" && "bg-primary-deep text-primary-foreground",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.24em]",
            invert ? "text-primary-foreground/70" : "text-primary",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">{title}</h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            invert ? "text-primary-foreground/75" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

const baseButton =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

export const buttonStyles = {
  primary: cn(baseButton, "bg-primary text-primary-foreground shadow-card hover:-translate-y-0.5 hover:bg-primary-deep"),
  outline: cn(baseButton, "border border-primary/30 bg-background text-primary hover:-translate-y-0.5 hover:border-primary hover:bg-secondary"),
  ghostLight: cn(baseButton, "border border-primary-foreground/40 text-primary-foreground hover:-translate-y-0.5 hover:bg-primary-foreground/10"),
  light: cn(baseButton, "bg-primary-foreground text-primary-deep hover:-translate-y-0.5"),
};

export function CtaLink({
  to,
  children,
  variant = "primary",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: keyof typeof buttonStyles;
  className?: string;
}) {
  return (
    <Link to={to} className={cn(buttonStyles[variant], className)}>
      {children}
    </Link>
  );
}
