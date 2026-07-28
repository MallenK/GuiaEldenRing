import { ok } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";
import { searchCatalogEntries } from "../data/search.repository";
import type { CatalogSearchHitDto } from "../types/catalog.dto";

export async function searchCatalog(query: string): Promise<Result<CatalogSearchHitDto[], DomainError>> {
  const hits = await searchCatalogEntries(query);
  return ok(hits);
}
