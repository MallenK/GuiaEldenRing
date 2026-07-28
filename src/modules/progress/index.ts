export { registerUser } from "./api/registerUser.handler";
export { authenticateUser } from "./api/authenticateUser.handler";
export { getBuilds } from "./api/getBuilds.handler";
export { createBuild } from "./api/createBuild.handler";
export { deleteBuild } from "./api/deleteBuild.handler";
export { getChecklist } from "./api/getChecklist.handler";
export { toggleChecklistItem } from "./api/toggleChecklistItem.handler";

export type { UserDto, BuildDto, BuildStats, ChecklistItemDto } from "./types/progress.dto";
export {
  registerInputSchema,
  loginInputSchema,
  createBuildInputSchema,
  toggleChecklistInputSchema,
} from "./types/progress.dto";
