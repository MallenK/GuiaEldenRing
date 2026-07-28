import type { DomainError } from "@/shared/api/withApiHandler";

export function emailAlreadyRegistered(email: string): DomainError {
  return {
    code: "EMAIL_ALREADY_REGISTERED",
    message: `El email "${email}" ya está registrado`,
    status: 409,
  };
}

export function invalidCredentials(): DomainError {
  return {
    code: "INVALID_CREDENTIALS",
    message: "Email o contraseña incorrectos",
    status: 401,
  };
}

export function buildNotFound(buildId: string): DomainError {
  return {
    code: "BUILD_NOT_FOUND",
    message: `No se encontró la build "${buildId}"`,
    status: 404,
  };
}
