import { ok, err } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";
import { findUserByEmail, createUser } from "../data/user.repository";
import { hashPassword } from "../domain/services/password.service";
import { emailAlreadyRegistered } from "../domain/errors/progress.errors";
import { toUserDto } from "../data/mappers/user.mapper";
import type { RegisterInput, UserDto } from "../types/progress.dto";

export async function registerUser(input: RegisterInput): Promise<Result<UserDto, DomainError>> {
  const existing = await findUserByEmail(input.email);
  if (existing) return err(emailAlreadyRegistered(input.email));

  const passwordHash = await hashPassword(input.password);
  const user = await createUser({
    email: input.email,
    passwordHash,
    ...(input.name ? { name: input.name } : {}),
  });

  return ok(toUserDto(user));
}
