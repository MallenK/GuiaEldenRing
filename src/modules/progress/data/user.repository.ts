import { prisma } from "@/shared/db/prisma";
import { toUserEntity } from "./mappers/user.mapper";
import type { User } from "../domain/entities/user.entity";

export async function findUserByEmail(email: string): Promise<User | null> {
  const row = await prisma.user.findUnique({ where: { email } });
  return row ? toUserEntity(row) : null;
}

export async function findUserById(id: string): Promise<User | null> {
  const row = await prisma.user.findUnique({ where: { id } });
  return row ? toUserEntity(row) : null;
}

export async function createUser(input: {
  email: string;
  passwordHash: string;
  name?: string;
}): Promise<User> {
  const row = await prisma.user.create({
    data: {
      email: input.email,
      passwordHash: input.passwordHash,
      ...(input.name ? { name: input.name } : {}),
    },
  });
  return toUserEntity(row);
}
