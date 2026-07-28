import type { NextRequest } from "next/server";
import { search, searchQuerySchema } from "@/modules/search";
import { withApiHandler } from "@/shared/api/withApiHandler";
import { err } from "@/shared/result";

export const GET = withApiHandler(async (request: NextRequest) => {
  const parsed = searchQuerySchema.safeParse({
    q: request.nextUrl.searchParams.get("q") ?? "",
  });

  if (!parsed.success) {
    return err({
      code: "VALIDATION_ERROR",
      message: "Invalid search query",
      status: 400,
      details: parsed.error.flatten(),
    });
  }

  return search(parsed.data.q);
});
