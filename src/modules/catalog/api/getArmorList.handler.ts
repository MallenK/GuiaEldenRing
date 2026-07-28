import { ok } from "@/shared/result";
import type { Result } from "@/shared/result";
import type { DomainError } from "@/shared/api/withApiHandler";
import { listArmor } from "../data/armor.repository";
import type { ArmorDto } from "../types/catalog.dto";

export async function getArmorList(search?: string): Promise<Result<ArmorDto[], DomainError>> {
  const armor = await listArmor(search);
  return ok(armor);
}
