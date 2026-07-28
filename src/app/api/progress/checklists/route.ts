import type { NextRequest } from "next/server";
import { getChecklist, toggleChecklistItem, toggleChecklistInputSchema } from "@/modules/progress";
import { requireUserId } from "@/shared/auth/requireUserId";
import { withApiHandler } from "@/shared/api/withApiHandler";
import { err } from "@/shared/result";

export const GET = withApiHandler(async () => {
  const session = await requireUserId();
  if (!session.ok) return session;

  return getChecklist(session.value);
});

export const POST = withApiHandler(async (request: NextRequest) => {
  const session = await requireUserId();
  if (!session.ok) return session;

  const body = await request.json().catch(() => null);
  const parsed = toggleChecklistInputSchema.safeParse(body);

  if (!parsed.success) {
    return err({
      code: "VALIDATION_ERROR",
      message: "Datos de checklist inválidos",
      status: 400,
      details: parsed.error.flatten(),
    });
  }

  return toggleChecklistItem(session.value, parsed.data);
});
