import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, Paperclip, TriangleAlert } from "lucide-react";
import { useRef, useState } from "react";

import { buttonStyles } from "@/components/ui-kit";
import { MAX_FILES, MAX_FILE_BYTES, productOptions, quoteSchema } from "@/lib/contact-schema";
import { sendQuote } from "@/lib/contact.functions";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-sm border border-input bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20";

const labelClass = "mb-2 block text-sm font-medium text-primary-deep";

function Field({
  id,
  label,
  children,
  error,
  className,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  error?: string | undefined;
  className?: string | undefined;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error ? <p className="mt-1.5 text-sm text-destructive">{error}</p> : null}
    </div>
  );
}

async function fileToBase64(file: File) {
  const buffer = await file.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export function QuoteForm() {
  const send = useServerFn(sendQuote);
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);

    const payload = {
      ime: String(fd.get("ime") ?? ""),
      email: String(fd.get("email") ?? ""),
      telefon: String(fd.get("telefon") ?? ""),
      lokacija: String(fd.get("lokacija") ?? ""),
      vrstaProizvoda: String(fd.get("vrstaProizvoda") ?? ""),
      brojOtvora: String(fd.get("brojOtvora") ?? ""),
      dimenzije: String(fd.get("dimenzije") ?? ""),
      poruka: String(fd.get("poruka") ?? ""),
      vrijemeSlanja: String(fd.get("vrijemeSlanja") ?? ""),
      zapocetoU: startedAt.current,
      privitci: [] as { filename: string; content: string }[],
    };

    const parsed = quoteSchema.safeParse(payload);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      setStatus("idle");
      return;
    }
    setFieldErrors({});

    if (files.some((f) => f.size > MAX_FILE_BYTES)) {
      setStatus("error");
      setErrorText("Pojedina datoteka ne smije biti veća od 3 MB.");
      return;
    }

    setStatus("sending");
    setErrorText("");

    try {
      const privitci = await Promise.all(
        files.slice(0, MAX_FILES).map(async (file) => ({
          filename: file.name,
          content: await fileToBase64(file),
        })),
      );

      const result = await send({ data: { ...parsed.data, privitci } });

      if (result?.ok) {
        setStatus("success");
        form.reset();
        setFiles([]);
        startedAt.current = Date.now();
        return;
      }

      setStatus("error");
      setErrorText(
        result?.reason === "config"
          ? "Slanje upita trenutno nije moguće. Molimo javite nam se telefonom ili e-poštom."
          : "Slanje upita nije uspjelo. Pokušajte ponovno ili nas kontaktirajte telefonom.",
      );
    } catch {
      setStatus("error");
      setErrorText("Došlo je do pogreške pri slanju. Pokušajte ponovno za koji trenutak.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md border border-primary/20 bg-secondary/60 p-8 text-center shadow-card">
        <CheckCircle2 className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
        <p className="mt-4 font-display text-2xl text-primary-deep">Upit je uspješno poslan.</p>
        <p className="mt-2 text-muted-foreground">
          Hvala vam! Kontaktirat ćemo vas u najkraćem mogućem roku.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className={cn(buttonStyles.outline, "mt-6")}>
          Pošaljite novi upit
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-md border border-border bg-card p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="ime" label="Ime i prezime" error={fieldErrors["ime"]}>
          <input id="ime" name="ime" type="text" autoComplete="name" className={inputClass} required />
        </Field>
        <Field id="email" label="Email" error={fieldErrors["email"]}>
          <input id="email" name="email" type="email" autoComplete="email" className={inputClass} required />
        </Field>
        <Field id="telefon" label="Telefon" error={fieldErrors["telefon"]}>
          <input id="telefon" name="telefon" type="tel" autoComplete="tel" className={inputClass} required />
        </Field>
        <Field id="lokacija" label="Lokacija objekta" error={fieldErrors["lokacija"]}>
          <input id="lokacija" name="lokacija" type="text" className={inputClass} required />
        </Field>
        <Field id="vrstaProizvoda" label="Vrsta proizvoda" error={fieldErrors["vrstaProizvoda"]}>
          <select id="vrstaProizvoda" name="vrstaProizvoda" className={inputClass} defaultValue="" required>
            <option value="" disabled>
              Odaberite
            </option>
            {productOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field id="brojOtvora" label="Broj otvora" error={fieldErrors["brojOtvora"]}>
          <input id="brojOtvora" name="brojOtvora" type="text" className={inputClass} placeholder="npr. 8" />
        </Field>
        <Field
          id="dimenzije"
          label="Približne dimenzije"
          error={fieldErrors["dimenzije"]}
          className="sm:col-span-2"
        >
          <input
            id="dimenzije"
            name="dimenzije"
            type="text"
            className={inputClass}
            placeholder="npr. 4 x 120/140 cm, 2 x 80/200 cm"
          />
        </Field>
        <Field id="poruka" label="Poruka" error={fieldErrors["poruka"]} className="sm:col-span-2">
          <textarea id="poruka" name="poruka" rows={5} className={cn(inputClass, "resize-y")} />
        </Field>
      </div>

      <div className="mt-6">
        <label htmlFor="privitci" className={labelClass}>
          Prilozi (fotografije, nacrti, mjere)
        </label>
        <label
          htmlFor="privitci"
          className="flex cursor-pointer items-center gap-3 rounded-sm border border-dashed border-input bg-background px-4 py-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Paperclip className="h-4 w-4" aria-hidden="true" />
          {files.length
            ? files.map((f) => f.name).join(", ")
            : `Odaberite datoteke (najviše ${MAX_FILES}, do 3 MB po datoteci)`}
        </label>
        <input
          id="privitci"
          name="privitci"
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          className="sr-only"
          onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, MAX_FILES))}
        />
      </div>

      {/* Anti-spam polje – skriveno korisnicima */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="vrijemeSlanja">Ne popunjavajte ovo polje</label>
        <input id="vrijemeSlanja" name="vrijemeSlanja" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" ? (
        <p className="mt-6 flex items-start gap-2 rounded-sm bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {errorText}
        </p>
      ) : null}

      <button type="submit" disabled={status === "sending"} className={cn(buttonStyles.primary, "mt-7 w-full sm:w-auto")}>
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Šaljem upit…
          </>
        ) : (
          "Pošaljite upit"
        )}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Podatke iz obrasca koristimo isključivo za odgovor na vaš upit.
      </p>
    </form>
  );
}
