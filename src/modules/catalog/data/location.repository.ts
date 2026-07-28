import { prisma } from "@/shared/db/prisma";
import { toLocationEntity } from "./mappers/location.mapper";
import type { Location } from "../domain/entities/location.entity";

export async function listLocations(search?: string): Promise<Location[]> {
  const rows = await prisma.location.findMany({
    ...(search ? { where: { name: { contains: search, mode: "insensitive" } } } : {}),
    orderBy: { name: "asc" },
  });

  return rows.map(toLocationEntity);
}

export async function findLocationBySlug(slug: string): Promise<Location | null> {
  const row = await prisma.location.findUnique({ where: { slug } });
  return row ? toLocationEntity(row) : null;
}
