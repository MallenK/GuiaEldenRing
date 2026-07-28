import { deleteBuild } from "@/modules/progress";
import { requireUserId } from "@/shared/auth/requireUserId";
import { withApiHandler } from "@/shared/api/withApiHandler";

export const DELETE = withApiHandler(
  async (_request: Request, context: { params: Promise<{ id: string }> }) => {
    const session = await requireUserId();
    if (!session.ok) return session;

    const { id } = await context.params;
    return deleteBuild(session.value, id);
  },
);
