import { NextResponse } from "next/server";
import type { Result } from "@/shared/result";
import type { ApiErrorBody } from "@/shared/types";

export type DomainError = {
  code: string;
  message: string;
  status?: number;
  details?: unknown;
};

function toApiError(error: DomainError): ApiErrorBody {
  return {
    error: {
      code: error.code,
      message: error.message,
      ...(error.details !== undefined ? { details: error.details } : {}),
    },
  };
}

export function withApiHandler<T, Args extends unknown[]>(
  fn: (...args: Args) => Promise<Result<T, DomainError>>,
) {
  return async (...args: Args): Promise<NextResponse> => {
    try {
      const result = await fn(...args);

      if (!result.ok) {
        return NextResponse.json(toApiError(result.error), {
          status: result.error.status ?? 400,
        });
      }

      return NextResponse.json({ data: result.value });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          error: { code: "INTERNAL_ERROR", message: "Unexpected server error" },
        } satisfies ApiErrorBody,
        { status: 500 },
      );
    }
  };
}
