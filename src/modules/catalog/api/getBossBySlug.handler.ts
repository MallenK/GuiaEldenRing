import { ok, err } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";
import { findBossBySlug } from "../data/boss.repository";
import { bossNotFound } from "../domain/errors/catalog.errors";
import type { BossDto } from "../types/catalog.dto";

export async function getBossBySlug(slug: string): Promise<Result<BossDto, DomainError>> {
  const boss = await findBossBySlug(slug);
  if (!boss) return err(bossNotFound(slug));
  return ok(boss);
}
