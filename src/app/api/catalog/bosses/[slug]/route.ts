import { getBossBySlug, bossSlugParamSchema } from "@/modules/catalog";
import { withApiHandler } from "@/shared/api/withApiHandler";
import { err } from "@/shared/result";

export const GET = withApiHandler(
  async (_request: Request, context: { params: Promise<{ slug: string }> }) => {
    const params = await context.params;
    const parsed = bossSlugParamSchema.safeParse(params);

    if (!parsed.success) {
      return err({
        code: "VALIDATION_ERROR",
        message: "Invalid boss slug",
        status: 400,
        details: parsed.error.flatten(),
      });
    }

    return getBossBySlug(parsed.data.slug);
  },
);
