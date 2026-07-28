import type { NextRequest } from "next/server";
import { registerUser, registerInputSchema } from "@/modules/progress";
import { withApiHandler } from "@/shared/api/withApiHandler";
import { err } from "@/shared/result";

export const POST = withApiHandler(async (request: NextRequest) => {
  const body = await request.json().catch(() => null);
  const parsed = registerInputSchema.safeParse(body);

  if (!parsed.success) {
    return err({
      code: "VALIDATION_ERROR",
      message: "Datos de registro inválidos",
      status: 400,
      details: parsed.error.flatten(),
    });
  }

  return registerUser(parsed.data);
});
