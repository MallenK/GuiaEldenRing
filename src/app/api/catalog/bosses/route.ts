import type { NextRequest } from "next/server";
import { getBosses, listQuerySchema } from "@/modules/catalog";
import { withApiHandler } from "@/shared/api/withApiHandler";
import { err } from "@/shared/result";

export const GET = withApiHandler(async (request: NextRequest) => {
  const parsed = listQuerySchema.safeParse({
    q: request.nextUrl.searchParams.get("q") ?? undefined,
  });

  if (!parsed.success) {
    return err({
      code: "VALIDATION_ERROR",
      message: "Invalid query parameters",
      status: 400,
      details: parsed.error.flatten(),
    });
  }

  return getBosses(parsed.data.q);
});
