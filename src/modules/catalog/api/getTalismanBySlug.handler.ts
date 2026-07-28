import { ok, err } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";
import { findTalismanBySlug } from "../data/talisman.repository";
import { catalogEntryNotFound } from "../domain/errors/catalog.errors";
import type { TalismanDto } from "../types/catalog.dto";

export async function getTalismanBySlug(slug: string): Promise<Result<TalismanDto, DomainError>> {
  const talisman = await findTalismanBySlug(slug);
  if (!talisman) return err(catalogEntryNotFound("talisman", slug));
  return ok(talisman);
}
