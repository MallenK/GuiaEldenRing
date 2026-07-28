import { z } from "zod";

export const searchQuerySchema = z.object({
  q: z.string().trim().min(2, "La búsqueda debe tener al menos 2 caracteres"),
});
export type SearchQuery = z.infer<typeof searchQuerySchema>;
