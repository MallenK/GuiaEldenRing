import { prisma } from "@/shared/db/prisma";
import { toWeaponEntity } from "./mappers/weapon.mapper";
import type { Weapon } from "../domain/entities/weapon.entity";

export async function listWeapons(search?: string): Promise<Weapon[]> {
  const rows = await prisma.weapon.findMany({
    ...(search ? { where: { name: { contains: search, mode: "insensitive" } } } : {}),
    orderBy: { name: "asc" },
  });

  return rows.map(toWeaponEntity);
}

export async function findWeaponBySlug(slug: string): Promise<Weapon | null> {
  const row = await prisma.weapon.findUnique({ where: { slug } });
  return row ? toWeaponEntity(row) : null;
}
