/*
  Warnings:

  - A unique constraint covering the columns `[alias]` on the table `ShortUrl` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ShortUrl" ALTER COLUMN "alias" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ShortUrl_alias_key" ON "ShortUrl"("alias");
