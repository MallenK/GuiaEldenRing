import { z } from "zod";

export type BossDto = {
  id: string;
  slug: string;
  name: string;
  region: string;
  health: number;
  runes: number;
  imageUrl: string | null;
};

export const listBossesQuerySchema = z.object({
  q: z.string().trim().min(1).optional(),
});

export type ListBossesQuery = z.infer<typeof listBossesQuerySchema>;

export const bossSlugParamSchema = z.object({
  slug: z.string().trim().min(1),
});
