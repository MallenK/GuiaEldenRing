import { prisma } from "@/shared/db/prisma";
import type { CatalogSearchHitDto } from "../types/catalog.dto";

const HITS_PER_TYPE = 5;

export async function searchCatalogEntries(query: string): Promise<CatalogSearchHitDto[]> {
  const where = { name: { contains: query, mode: "insensitive" as const } };
  const take = HITS_PER_TYPE;

  const [bosses, weapons, armor, talismans, locations] = await Promise.all([
    prisma.boss.findMany({ where, take, select: { slug: true, name: true } }),
    prisma.weapon.findMany({ where, take, select: { slug: true, name: true } }),
    prisma.armor.findMany({ where, take, select: { slug: true, name: true } }),
    prisma.talisman.findMany({ where, take, select: { slug: true, name: true } }),
    prisma.location.findMany({ where, take, select: { slug: true, name: true } }),
  ]);

  return [
    ...bosses.map((b) => ({ type: "boss" as const, slug: b.slug, name: b.name })),
    ...weapons.map((w) => ({ type: "weapon" as const, slug: w.slug, name: w.name })),
    ...armor.map((a) => ({ type: "armor" as const, slug: a.slug, name: a.name })),
    ...talismans.map((t) => ({ type: "talisman" as const, slug: t.slug, name: t.name })),
    ...locations.map((l) => ({ type: "location" as const, slug: l.slug, name: l.name })),
  ];
}
