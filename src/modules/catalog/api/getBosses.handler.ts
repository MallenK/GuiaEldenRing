import { ok } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";
import { listBosses } from "../data/boss.repository";
import type { BossDto } from "../types/catalog.dto";

export async function getBosses(search?: string): Promise<Result<BossDto[], DomainError>> {
  const bosses = await listBosses(search);
  return ok(bosses);
}
