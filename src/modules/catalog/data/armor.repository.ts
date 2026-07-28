import { prisma } from "@/shared/db/prisma";
import { toArmorEntity } from "./mappers/armor.mapper";
import type { Armor } from "../domain/entities/armor.entity";

export async function listArmor(search?: string): Promise<Armor[]> {
  const rows = await prisma.armor.findMany({
    ...(search ? { where: { name: { contains: search, mode: "insensitive" } } } : {}),
    orderBy: { name: "asc" },
  });

  return rows.map(toArmorEntity);
}

export async function findArmorBySlug(slug: string): Promise<Armor | null> {
  const row = await prisma.armor.findUnique({ where: { slug } });
  return row ? toArmorEntity(row) : null;
}
