import type { ChecklistItem as ChecklistItemRow } from "@/generated/prisma/client";
import type { ChecklistItem } from "../../domain/entities/checklistItem.entity";
import type { ChecklistItemDto } from "../../types/progress.dto";

export function toChecklistItemEntity(row: ChecklistItemRow): ChecklistItem {
  return {
    id: row.id,
    userId: row.userId,
    refType: row.refType,
    refId: row.refId,
    completed: row.completed,
  };
}

export function toChecklistItemDto(item: ChecklistItem): ChecklistItemDto {
  return {
    id: item.id,
    refType: item.refType,
    refId: item.refId,
    completed: item.completed,
  };
}
