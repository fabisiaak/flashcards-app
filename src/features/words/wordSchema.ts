import { z } from "zod";

export const wordCreateSchema = z.object({
  en: z.string().trim().min(1, "Podaj slowko EN"),
  pl: z.string().trim().min(1, "Podaj tlumaczenie PL"),
  status: z.enum(["new", "learning", "known"]),
});

export const wordUpdateSchema = wordCreateSchema.extend({
  id: z.string().uuid(),
});

export type WordCreateInput = z.infer<typeof wordCreateSchema>;
export type WordUpdateInput = z.infer<typeof wordUpdateSchema>;
