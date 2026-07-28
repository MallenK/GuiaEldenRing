import { prisma } from "@/shared/db/prisma";
import { toTalismanEntity } from "./mappers/talisman.mapper";
import type { Talisman } from "../domain/entities/talisman.entity";

export async function listTalismans(search?: string): Promise<Talisman[]> {
  const rows = await prisma.talisman.findMany({
    ...(search ? { where: { name: { contains: search, mode: "insensitive" } } } : {}),
    orderBy: { name: "asc" },
  });

  return rows.map(toTalismanEntity);
}

export async function findTalismanBySlug(slug: string): Promise<Talisman | null> {
  const row = await prisma.talisman.findUnique({ where: { slug } });
  return row ? toTalismanEntity(row) : null;
}
