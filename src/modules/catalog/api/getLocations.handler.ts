import { ok } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";
import { listLocations } from "../data/location.repository";
import type { LocationDto } from "../types/catalog.dto";

export async function getLocations(search?: string): Promise<Result<LocationDto[], DomainError>> {
  const locations = await listLocations(search);
  return ok(locations);
}
