import { getLocationBySlug, slugParamSchema } from "@/modules/catalog";
import { withApiHandler } from "@/shared/api/withApiHandler";
import { err } from "@/shared/result";

export const GET = withApiHandler(
  async (_request: Request, context: { params: Promise<{ slug: string }> }) => {
    const params = await context.params;
    const parsed = slugParamSchema.safeParse(params);

    if (!parsed.success) {
      return err({
        code: "VALIDATION_ERROR",
        message: "Invalid slug",
        status: 400,
        details: parsed.error.flatten(),
      });
    }

    return getLocationBySlug(parsed.data.slug);
  },
);
