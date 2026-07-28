import type { Boss as BossRow } from "@/generated/prisma/client";
import type { Boss } from "../../domain/entities/boss.entity";

export function toBossEntity(row: BossRow): Boss {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    region: row.region,
    health: row.health,
    runes: row.runes,
    imageUrl: row.imageUrl,
  };
}
