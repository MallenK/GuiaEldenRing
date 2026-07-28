import type { Weapon as WeaponRow } from "@/generated/prisma/client";
import type { Weapon } from "../../domain/entities/weapon.entity";

export function toWeaponEntity(row: WeaponRow): Weapon {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    weight: row.weight,
    requiredStr: row.requiredStr,
    requiredDex: row.requiredDex,
    imageUrl: row.imageUrl,
  };
}
