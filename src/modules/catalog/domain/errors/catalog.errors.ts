import type { DomainError } from "@/shared/api/withApiHandler";
import type { CatalogEntryType } from "../../types/catalog.dto";

export function catalogEntryNotFound(type: CatalogEntryType, slug: string): DomainError {
  return {
    code: "CATALOG_ENTRY_NOT_FOUND",
    message: `No ${type} found with slug "${slug}"`,
    status: 404,
  };
}
