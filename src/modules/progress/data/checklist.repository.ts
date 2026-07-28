import { prisma } from "@/shared/db/prisma";
import { toChecklistItemEntity } from "./mappers/checklistItem.mapper";
import type { ChecklistItem } from "../domain/entities/checklistItem.entity";

export async function listChecklistByUser(userId: string): Promise<ChecklistItem[]> {
  const rows = await prisma.checklistItem.findMany({ where: { userId } });
  return rows.map(toChecklistItemEntity);
}

export async function setChecklistItem(
  userId: string,
  refType: string,
  refId: string,
  completed: boolean,
): Promise<ChecklistItem> {
  const row = await prisma.checklistItem.upsert({
    where: { userId_refType_refId: { userId, refType, refId } },
    update: { completed },
    create: { userId, refType, refId, completed },
  });
  return toChecklistItemEntity(row);
}
