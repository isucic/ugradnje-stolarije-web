import { z } from "zod";

import { quoteSchema } from "./contact-schema";

const PRIMATELJ = "brane-mont@st.t-com.hr";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string) {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px 6px 0;color:#5b6b7a;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#14293d"><strong>${escapeHtml(
    value,
  ).replace(/\n/g, "<br>")}</strong></td></tr>`;
}

export async function sendQuoteEmail(data: z.infer<typeof quoteSchema>) {
  // Anti-spam: honeypot polje i minimalno vrijeme popunjavanja obrasca.
  if (data.vrijemeSlanja) {
    return { ok: true as const };
  }
  if (data.zapocetoU && Date.now() - data.zapocetoU < 3000) {
    return { ok: false as const, reason: "spam" as const };
  }

  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    console.error("RESEND_API_KEY nije postavljen – e-poruka nije poslana.");
    return { ok: false as const, reason: "config" as const };
  }
  const from = process.env["MAIL_FROM"] || "Brane-mont web <onboarding@resend.dev>";

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#14293d">
      <h2 style="margin:0 0 16px">Novi upit za ponudu s web stranice</h2>
      <table style="border-collapse:collapse">
        ${row("Ime i prezime", data.ime)}
        ${row("Email", data.email)}
        ${row("Telefon", data.telefon)}
        ${row("Lokacija objekta", data.lokacija)}
        ${row("Vrsta proizvoda", data.vrstaProizvoda)}
        ${row("Broj otvora", data.brojOtvora ?? "")}
        ${row("Približne dimenzije", data.dimenzije ?? "")}
        ${row("Poruka", data.poruka ?? "")}
      </table>
      <p style="margin-top:20px;color:#5b6b7a;font-size:13px">
        Upit je poslan putem obrasca na web stranici Brane-mont.
      </p>
    </div>`;

  const attachments = (data.privitci ?? []).map((file) => ({
    filename: file.filename,
    content: file.content,
  }));

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [PRIMATELJ],
      reply_to: data.email,
      subject: `Upit za ponudu – ${data.ime} (${data.vrstaProizvoda})`,
      html,
      ...(attachments.length ? { attachments } : {}),
    }),
  });

  if (!response.ok) {
    console.error("Slanje e-poruke nije uspjelo:", response.status, await response.text());
    return { ok: false as const, reason: "send" as const };
  }

  return { ok: true as const };
}
