import { createServerFn } from "@tanstack/react-start";

import { quoteSchema } from "./contact-schema";
import { sendQuoteEmail } from "./contact.server";

export const sendQuote = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => quoteSchema.parse(data))
  .handler(async ({ data }) => sendQuoteEmail(data));
