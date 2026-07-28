import type { Location as LocationRow } from "@/generated/prisma/client";
import type { Location } from "../../domain/entities/location.entity";

export function toLocationEntity(row: LocationRow): Location {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    region: row.region,
    description: row.description,
    imageUrl: row.imageUrl,
  };
}
