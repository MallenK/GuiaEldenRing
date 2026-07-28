import type { Build as BuildRow } from "@/generated/prisma/client";
import { buildStatsSchema, type BuildDto } from "../../types/progress.dto";
import type { Build } from "../../domain/entities/build.entity";

export function toBuildEntity(row: BuildRow): Build {
  return {
    id: row.id,
    userId: row.userId,
    name: row.name,
    stats: buildStatsSchema.parse(row.stats),
    createdAt: row.createdAt,
  };
}

export function toBuildDto(build: Build): BuildDto {
  return {
    id: build.id,
    name: build.name,
    stats: build.stats,
    createdAt: build.createdAt.toISOString(),
  };
}
