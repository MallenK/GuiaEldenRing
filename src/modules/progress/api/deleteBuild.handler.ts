import { ok, err } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";
import { deleteBuild as deleteBuildRow } from "../data/build.repository";
import { buildNotFound } from "../domain/errors/progress.errors";

export async function deleteBuild(
  userId: string,
  buildId: string,
): Promise<Result<{ id: string }, DomainError>> {
  const deleted = await deleteBuildRow(userId, buildId);
  if (!deleted) return err(buildNotFound(buildId));
  return ok({ id: buildId });
}
