import { ok } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";
import { listChecklistByUser } from "../data/checklist.repository";
import { toChecklistItemDto } from "../data/mappers/checklistItem.mapper";
import type { ChecklistItemDto } from "../types/progress.dto";

export async function getChecklist(userId: string): Promise<Result<ChecklistItemDto[], DomainError>> {
  const items = await listChecklistByUser(userId);
  return ok(items.map(toChecklistItemDto));
}
