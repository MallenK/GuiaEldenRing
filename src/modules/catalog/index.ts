export { getBosses } from "./api/getBosses.handler";
export { getBossBySlug } from "./api/getBossBySlug.handler";
export { getWeapons } from "./api/getWeapons.handler";
export { getWeaponBySlug } from "./api/getWeaponBySlug.handler";
export { getArmorList } from "./api/getArmorList.handler";
export { getArmorBySlug } from "./api/getArmorBySlug.handler";
export { getTalismans } from "./api/getTalismans.handler";
export { getTalismanBySlug } from "./api/getTalismanBySlug.handler";
export { getLocations } from "./api/getLocations.handler";
export { getLocationBySlug } from "./api/getLocationBySlug.handler";
export { searchCatalog } from "./api/searchCatalog.handler";

export type {
  BossDto,
  WeaponDto,
  ArmorDto,
  TalismanDto,
  LocationDto,
  CatalogEntryType,
  CatalogSearchHitDto,
} from "./types/catalog.dto";
export { listQuerySchema, slugParamSchema } from "./types/catalog.dto";
