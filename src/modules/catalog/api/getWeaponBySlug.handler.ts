import { ok, err } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";
import { findWeaponBySlug } from "../data/weapon.repository";
import { catalogEntryNotFound } from "../domain/errors/catalog.errors";
import type { WeaponDto } from "../types/catalog.dto";

export async function getWeaponBySlug(slug: string): Promise<Result<WeaponDto, DomainError>> {
  const weapon = await findWeaponBySlug(slug);
  if (!weapon) return err(catalogEntryNotFound("weapon", slug));
  return ok(weapon);
}
