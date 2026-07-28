import type { BuildStats } from "../../types/progress.dto";

export type Build = {
  id: string;
  userId: string;
  name: string;
  stats: BuildStats;
  createdAt: Date;
};
