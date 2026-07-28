import { ok } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";
import { listWeapons } from "../data/weapon.repository";
import type { WeaponDto } from "../types/catalog.dto";

export async function getWeapons(search?: string): Promise<Result<WeaponDto[], DomainError>> {
  const weapons = await listWeapons(search);
  return ok(weapons);
}
