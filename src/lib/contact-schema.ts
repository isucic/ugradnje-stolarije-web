import { z } from "zod";

export const productOptions = [
  "PVC prozori",
  "PVC vrata",
  "PVC klizne stijene",
  "Komarnici",
  "Grilje",
  "Rolete",
  "Više proizvoda",
  "Nisam siguran/na",
] as const;

export const MAX_FILES = 3;
export const MAX_FILE_BYTES = 3 * 1024 * 1024; // 3 MB po datoteci

export const attachmentSchema = z.object({
  filename: z.string().min(1).max(200),
  /** Sadržaj datoteke kodiran u base64. */
  content: z.string().min(1).max(6_000_000),
});

export const quoteSchema = z.object({
  ime: z.string().trim().min(2, "Unesite ime i prezime.").max(120),
  email: z.string().trim().email("Unesite ispravnu email adresu.").max(160),
  telefon: z.string().trim().min(6, "Unesite broj telefona.").max(40),
  lokacija: z.string().trim().min(2, "Unesite lokaciju objekta.").max(160),
  vrstaProizvoda: z.enum(productOptions, { errorMap: () => ({ message: "Odaberite vrstu proizvoda." }) }),
  brojOtvora: z.string().trim().max(60).optional().default(""),
  dimenzije: z.string().trim().max(400).optional().default(""),
  poruka: z.string().trim().max(3000).optional().default(""),
  /** Anti-spam: skriveno polje koje ljudi ne popunjavaju. */
  vrijemeSlanja: z.string().trim().max(120).optional().default(""),
  zapocetoU: z.number().int().nonnegative().optional().default(0),
  privitci: z.array(attachmentSchema).max(MAX_FILES).optional().default([]),
});

export type QuoteInput = z.input<typeof quoteSchema>;
