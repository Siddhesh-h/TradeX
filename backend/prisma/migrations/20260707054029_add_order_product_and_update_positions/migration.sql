/*
  Warnings:

  - You are about to drop the column `day` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `net` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Position` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,name,product]` on the table `Position` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "product" TEXT NOT NULL DEFAULT 'DELIVERY';

-- AlterTable
ALTER TABLE "public"."Position" DROP COLUMN "day",
DROP COLUMN "net",
DROP COLUMN "price",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "product" SET DEFAULT 'INTRADAY';

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "public"."Order"("userId");

-- CreateIndex
CREATE INDEX "Position_userId_idx" ON "public"."Position"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Position_userId_name_product_key" ON "public"."Position"("userId", "name", "product");
