export type Weapon = {
  id: string;
  slug: string;
  name: string;
  category: string;
  weight: number;
  requiredStr: number;
  requiredDex: number;
  imageUrl: string | null;
};
