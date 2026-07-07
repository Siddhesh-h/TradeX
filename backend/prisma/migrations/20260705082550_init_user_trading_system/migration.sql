/*
  Warnings:

  - You are about to drop the column `isLoss` on the `Position` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `Holding` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Holding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `mode` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `userId` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."OrderMode" AS ENUM ('BUY', 'SELL');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'EXECUTED', 'REJECTED', 'CANCELLED');

-- AlterTable
ALTER TABLE "public"."Holding" ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "net" SET DEFAULT '0.00%',
ALTER COLUMN "day" SET DEFAULT '0.00%';

-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "public"."OrderStatus" NOT NULL DEFAULT 'EXECUTED',
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "mode",
ADD COLUMN     "mode" "public"."OrderMode" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Position" DROP COLUMN "isLoss",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "net" SET DEFAULT '0.00%',
ALTER COLUMN "day" SET DEFAULT '0.00%';

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Account" (
    "id" SERIAL NOT NULL,
    "availableCash" DOUBLE PRECISION NOT NULL DEFAULT 100000,
    "usedMargin" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "public"."Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Holding_userId_name_key" ON "public"."Holding"("userId", "name");

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Holding" ADD CONSTRAINT "Holding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Position" ADD CONSTRAINT "Position_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
