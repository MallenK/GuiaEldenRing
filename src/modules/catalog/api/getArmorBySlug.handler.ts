import { ok, err } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";
import { findArmorBySlug } from "../data/armor.repository";
import { catalogEntryNotFound } from "../domain/errors/catalog.errors";
import type { ArmorDto } from "../types/catalog.dto";

export async function getArmorBySlug(slug: string): Promise<Result<ArmorDto, DomainError>> {
  const armor = await findArmorBySlug(slug);
  if (!armor) return err(catalogEntryNotFound("armor", slug));
  return ok(armor);
}
