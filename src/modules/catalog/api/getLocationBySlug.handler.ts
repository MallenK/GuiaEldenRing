import { ok, err } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";
import { findLocationBySlug } from "../data/location.repository";
import { catalogEntryNotFound } from "../domain/errors/catalog.errors";
import type { LocationDto } from "../types/catalog.dto";

export async function getLocationBySlug(slug: string): Promise<Result<LocationDto, DomainError>> {
  const location = await findLocationBySlug(slug);
  if (!location) return err(catalogEntryNotFound("location", slug));
  return ok(location);
}
