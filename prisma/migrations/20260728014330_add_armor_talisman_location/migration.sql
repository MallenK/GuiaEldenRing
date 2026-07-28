-- CreateTable
CREATE TABLE "catalog_armor" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slot" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "poise" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "catalog_armor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalog_talismans" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "effect" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "catalog_talismans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalog_locations" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "catalog_locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "catalog_armor_slug_key" ON "catalog_armor"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "catalog_talismans_slug_key" ON "catalog_talismans"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "catalog_locations_slug_key" ON "catalog_locations"("slug");
