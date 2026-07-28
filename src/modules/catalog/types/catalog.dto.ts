import { z } from "zod";

export const listQuerySchema = z.object({
  q: z.string().trim().min(1).optional(),
});
export type ListQuery = z.infer<typeof listQuerySchema>;

export const slugParamSchema = z.object({
  slug: z.string().trim().min(1),
});

export type BossDto = {
  id: string;
  slug: string;
  name: string;
  region: string;
  health: number;
  runes: number;
  imageUrl: string | null;
};

export type WeaponDto = {
  id: string;
  slug: string;
  name: string;
  category: string;
  weight: number;
  requiredStr: number;
  requiredDex: number;
  imageUrl: string | null;
};

export type ArmorDto = {
  id: string;
  slug: string;
  name: string;
  slot: string;
  weight: number;
  poise: number;
  imageUrl: string | null;
};

export type TalismanDto = {
  id: string;
  slug: string;
  name: string;
  effect: string;
  weight: number;
  imageUrl: string | null;
};

export type LocationDto = {
  id: string;
  slug: string;
  name: string;
  region: string;
  description: string | null;
  imageUrl: string | null;
};

export type CatalogEntryType = "boss" | "weapon" | "armor" | "talisman" | "location";

export type CatalogSearchHitDto = {
  type: CatalogEntryType;
  slug: string;
  name: string;
};
