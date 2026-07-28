import type { User as UserRow } from "@/generated/prisma/client";
import type { User } from "../../domain/entities/user.entity";
import type { UserDto } from "../../types/progress.dto";

export function toUserEntity(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    passwordHash: row.passwordHash,
  };
}

export function toUserDto(user: User): UserDto {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}
