import { ok } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";
import { createBuild as createBuildRow } from "../data/build.repository";
import { toBuildDto } from "../data/mappers/build.mapper";
import type { CreateBuildInput, BuildDto } from "../types/progress.dto";

export async function createBuild(
  userId: string,
  input: CreateBuildInput,
): Promise<Result<BuildDto, DomainError>> {
  const build = await createBuildRow(userId, input);
  return ok(toBuildDto(build));
}
