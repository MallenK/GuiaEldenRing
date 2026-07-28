import type { Talisman as TalismanRow } from "@/generated/prisma/client";
import type { Talisman } from "../../domain/entities/talisman.entity";

export function toTalismanEntity(row: TalismanRow): Talisman {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    effect: row.effect,
    weight: row.weight,
    imageUrl: row.imageUrl,
  };
}
