import type { DomainError } from "@/shared/api/withApiHandler";

export function bossNotFound(slug: string): DomainError {
  return {
    code: "BOSS_NOT_FOUND",
    message: `No boss found with slug "${slug}"`,
    status: 404,
  };
}
