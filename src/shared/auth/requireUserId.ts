import { auth } from "./auth";
import { ok, err } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";

export async function requireUserId(): Promise<Result<string, DomainError>> {
  const session = await auth();

  if (!session?.user) {
    return err({
      code: "UNAUTHENTICATED",
      message: "Debes iniciar sesión para continuar",
      status: 401,
    });
  }

  return ok(session.user.id);
}
