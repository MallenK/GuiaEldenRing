import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { toggleChecklistItem, toggleChecklistInputSchema } from "@/modules/progress";
import { requireUserId } from "@/shared/auth/requireUserId";

const syncRequestSchema = z.object({
  mutations: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      payload: z.unknown(),
      timestamp: z.number(),
    }),
  ),
});

// Reconciles the offline mutation queue (see src/shared/offline/mutationQueue.ts).
// Each mutation carries a client-generated id, but idempotency here comes for
// free from the underlying checklist upsert: replaying the same toggle twice
// just re-sets the same `completed` value.
export async function POST(request: NextRequest) {
  const session = await requireUserId();
  if (!session.ok) {
    return NextResponse.json(
      { error: { code: session.error.code, message: session.error.message } },
      { status: session.error.status ?? 401 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = syncRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: "Invalid sync payload" } },
      { status: 400 },
    );
  }

  const appliedIds: string[] = [];

  for (const mutation of parsed.data.mutations) {
    if (mutation.type !== "checklist:toggle") continue;

    const payload = toggleChecklistInputSchema.safeParse(mutation.payload);
    if (!payload.success) continue;

    await toggleChecklistItem(session.value, payload.data);
    appliedIds.push(mutation.id);
  }

  return NextResponse.json({ appliedIds });
}
