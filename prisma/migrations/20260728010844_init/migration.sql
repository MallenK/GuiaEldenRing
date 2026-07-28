-- CreateTable
CREATE TABLE "catalog_bosses" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "health" INTEGER NOT NULL,
    "runes" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "catalog_bosses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalog_weapons" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "requiredStr" INTEGER NOT NULL,
    "requiredDex" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "catalog_weapons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progress_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "progress_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progress_builds" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stats" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "progress_builds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progress_checklist_items" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "refType" TEXT NOT NULL,
    "refId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "progress_checklist_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "catalog_bosses_slug_key" ON "catalog_bosses"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "catalog_weapons_slug_key" ON "catalog_weapons"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "progress_users_email_key" ON "progress_users"("email");

-- CreateIndex
CREATE INDEX "progress_builds_userId_idx" ON "progress_builds"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "progress_checklist_items_userId_refType_refId_key" ON "progress_checklist_items"("userId", "refType", "refId");

-- AddForeignKey
ALTER TABLE "progress_builds" ADD CONSTRAINT "progress_builds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "progress_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress_checklist_items" ADD CONSTRAINT "progress_checklist_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "progress_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
