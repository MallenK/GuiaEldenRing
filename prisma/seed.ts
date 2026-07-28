import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.boss.upsert({
    where: { slug: "margit-the-fell-omen" },
    update: {},
    create: {
      slug: "margit-the-fell-omen",
      name: "Margit, the Fell Omen",
      region: "Weeping Peninsula / Stormveil",
      health: 1037,
      runes: 10500,
    },
  });

  await prisma.weapon.upsert({
    where: { slug: "uchigatana" },
    update: {},
    create: {
      slug: "uchigatana",
      name: "Uchigatana",
      category: "Katana",
      weight: 5.5,
      requiredStr: 12,
      requiredDex: 15,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
