import { ok } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";
import { listTalismans } from "../data/talisman.repository";
import type { TalismanDto } from "../types/catalog.dto";

export async function getTalismans(search?: string): Promise<Result<TalismanDto[], DomainError>> {
  const talismans = await listTalismans(search);
  return ok(talismans);
}
