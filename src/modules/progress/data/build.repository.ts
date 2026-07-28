import { prisma } from "@/shared/db/prisma";
import { toBuildEntity } from "./mappers/build.mapper";
import type { Build } from "../domain/entities/build.entity";
import type { BuildStats } from "../types/progress.dto";

export async function listBuildsByUser(userId: string): Promise<Build[]> {
  const rows = await prisma.build.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toBuildEntity);
}

export async function createBuild(
  userId: string,
  input: { name: string; stats: BuildStats },
): Promise<Build> {
  const row = await prisma.build.create({
    data: { userId, name: input.name, stats: input.stats },
  });
  return toBuildEntity(row);
}

export async function deleteBuild(userId: string, buildId: string): Promise<boolean> {
  const { count } = await prisma.build.deleteMany({
    where: { id: buildId, userId },
  });
  return count > 0;
}
