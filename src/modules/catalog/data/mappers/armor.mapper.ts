import type { Armor as ArmorRow } from "@/generated/prisma/client";
import type { Armor } from "../../domain/entities/armor.entity";

export function toArmorEntity(row: ArmorRow): Armor {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    slot: row.slot,
    weight: row.weight,
    poise: row.poise,
    imageUrl: row.imageUrl,
  };
}
