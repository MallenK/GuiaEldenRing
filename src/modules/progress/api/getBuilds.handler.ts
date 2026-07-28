import { ok } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";
import { listBuildsByUser } from "../data/build.repository";
import { toBuildDto } from "../data/mappers/build.mapper";
import type { BuildDto } from "../types/progress.dto";

export async function getBuilds(userId: string): Promise<Result<BuildDto[], DomainError>> {
  const builds = await listBuildsByUser(userId);
  return ok(builds.map(toBuildDto));
}
