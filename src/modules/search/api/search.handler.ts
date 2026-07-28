import { searchCatalog, type CatalogSearchHitDto } from "@/modules/catalog";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";

// This module orchestrates search across bounded contexts. Today the only
// searchable content lives in `catalog`, so this simply forwards to its
// public surface — but it's the seam where results from other modules
// (e.g. community guides, if that ever becomes a module) would be unioned
// in later, without catalog needing to know about them.
export async function search(query: string): Promise<Result<CatalogSearchHitDto[], DomainError>> {
  return searchCatalog(query);
}
