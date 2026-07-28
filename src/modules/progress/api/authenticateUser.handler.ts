import { ok, err } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";
import { findUserByEmail } from "../data/user.repository";
import { verifyPassword } from "../domain/services/password.service";
import { invalidCredentials } from "../domain/errors/progress.errors";
import { toUserDto } from "../data/mappers/user.mapper";
import type { LoginInput, UserDto } from "../types/progress.dto";

export async function authenticateUser(input: LoginInput): Promise<Result<UserDto, DomainError>> {
  const user = await findUserByEmail(input.email);
  if (!user) return err(invalidCredentials());

  const valid = await verifyPassword(input.password, user.passwordHash);
  if (!valid) return err(invalidCredentials());

  return ok(toUserDto(user));
}
