import { z } from "zod";

export type UserDto = {
  id: string;
  email: string;
  name: string | null;
};

export type BuildStats = {
  vigor: number;
  mind: number;
  endurance: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  faith: number;
  arcane: number;
};

export type BuildDto = {
  id: string;
  name: string;
  stats: BuildStats;
  createdAt: string;
};

export type ChecklistItemDto = {
  id: string;
  refType: string;
  refId: string;
  completed: boolean;
};

export const registerInputSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  name: z.string().trim().min(1).optional(),
});
export type RegisterInput = z.infer<typeof registerInputSchema>;

export const loginInputSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});
export type LoginInput = z.infer<typeof loginInputSchema>;

const statValue = z.number().int().min(1).max(99);

export const buildStatsSchema = z.object({
  vigor: statValue,
  mind: statValue,
  endurance: statValue,
  strength: statValue,
  dexterity: statValue,
  intelligence: statValue,
  faith: statValue,
  arcane: statValue,
});

export const createBuildInputSchema = z.object({
  name: z.string().trim().min(1).max(60),
  stats: buildStatsSchema,
});
export type CreateBuildInput = z.infer<typeof createBuildInputSchema>;

export const toggleChecklistInputSchema = z.object({
  refType: z.string().trim().min(1),
  refId: z.string().trim().min(1),
  completed: z.boolean(),
});
export type ToggleChecklistInput = z.infer<typeof toggleChecklistInputSchema>;
