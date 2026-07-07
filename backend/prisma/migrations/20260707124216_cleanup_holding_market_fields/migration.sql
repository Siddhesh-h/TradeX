/*
  Warnings:

  - You are about to drop the column `day` on the `Holding` table. All the data in the column will be lost.
  - You are about to drop the column `net` on the `Holding` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Holding` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Holding" DROP COLUMN "day",
DROP COLUMN "net",
DROP COLUMN "price",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Holding_userId_idx" ON "public"."Holding"("userId");
