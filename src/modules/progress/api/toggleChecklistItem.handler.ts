import { ok } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";
import { setChecklistItem } from "../data/checklist.repository";
import { toChecklistItemDto } from "../data/mappers/checklistItem.mapper";
import type { ToggleChecklistInput, ChecklistItemDto } from "../types/progress.dto";

export async function toggleChecklistItem(
  userId: string,
  input: ToggleChecklistInput,
): Promise<Result<ChecklistItemDto, DomainError>> {
  const item = await setChecklistItem(userId, input.refType, input.refId, input.completed);
  return ok(toChecklistItemDto(item));
}
