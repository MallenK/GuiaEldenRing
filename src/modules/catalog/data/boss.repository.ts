import { prisma } from "@/shared/db/prisma";
import { toBossEntity } from "./mappers/boss.mapper";
import type { Boss } from "../domain/entities/boss.entity";

export async function listBosses(search?: string): Promise<Boss[]> {
  const rows = await prisma.boss.findMany({
    ...(search ? { where: { name: { contains: search, mode: "insensitive" } } } : {}),
    orderBy: { name: "asc" },
  });

  return rows.map(toBossEntity);
}

export async function findBossBySlug(slug: string): Promise<Boss | null> {
  const row = await prisma.boss.findUnique({ where: { slug } });
  return row ? toBossEntity(row) : null;
}
