import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await Promise.all(
    [
      {
        slug: "margit-the-fell-omen",
        name: "Margit, the Fell Omen",
        region: "Weeping Peninsula / Stormveil",
        health: 1037,
        runes: 10500,
      },
      {
        slug: "godrick-the-grafted",
        name: "Godrick the Grafted",
        region: "Stormveil Castle",
        health: 2500,
        runes: 12000,
      },
      {
        slug: "rennala-queen-of-the-full-moon",
        name: "Rennala, Queen of the Full Moon",
        region: "Raya Lucaria Academy",
        health: 6215,
        runes: 40000,
      },
    ].map((boss) => prisma.boss.upsert({ where: { slug: boss.slug }, update: {}, create: boss })),
  );

  await Promise.all(
    [
      {
        slug: "uchigatana",
        name: "Uchigatana",
        category: "Katana",
        weight: 5.5,
        requiredStr: 12,
        requiredDex: 15,
      },
      {
        slug: "moonveil",
        name: "Moonveil",
        category: "Katana",
        weight: 4.5,
        requiredStr: 10,
        requiredDex: 18,
      },
      {
        slug: "bloodhounds-fang",
        name: "Bloodhound's Fang",
        category: "Curved Greatsword",
        weight: 8.5,
        requiredStr: 14,
        requiredDex: 20,
      },
    ].map((weapon) =>
      prisma.weapon.upsert({ where: { slug: weapon.slug }, update: {}, create: weapon }),
    ),
  );

  await Promise.all(
    [
      { slug: "knight-helm", name: "Knight Helm", slot: "Head", weight: 5.9, poise: 3.4 },
      { slug: "knight-armor", name: "Knight Armor", slot: "Chest", weight: 12.9, poise: 7.4 },
      { slug: "knight-gauntlets", name: "Knight Gauntlets", slot: "Arms", weight: 4.5, poise: 2.6 },
    ].map((armor) => prisma.armor.upsert({ where: { slug: armor.slug }, update: {}, create: armor })),
  );

  await Promise.all(
    [
      {
        slug: "dragoncrest-shield-talisman",
        name: "Dragoncrest Shield Talisman",
        effect: "Boosts physical damage negation",
        weight: 0.7,
      },
      {
        slug: "radagons-soreseal",
        name: "Radagon's Soreseal",
        effect: "Raises Vigor, Endurance, Strength and Dexterity; increases damage taken",
        weight: 1.5,
      },
    ].map((talisman) =>
      prisma.talisman.upsert({ where: { slug: talisman.slug }, update: {}, create: talisman }),
    ),
  );

  await Promise.all(
    [
      {
        slug: "limgrave",
        name: "Limgrave",
        region: "Limgrave",
        description: "La región inicial de las Tierras Intermedias, hogar de Stormveil Castle.",
      },
      {
        slug: "liurnia-of-the-lakes",
        name: "Liurnia of the Lakes",
        region: "Liurnia",
        description: "Una vasta región de lagos inundados y ruinas mágicas.",
      },
    ].map((location) =>
      prisma.location.upsert({ where: { slug: location.slug }, update: {}, create: location }),
    ),
  );
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
