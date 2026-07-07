-- CreateEnum
CREATE TYPE "public"."FundTransactionType" AS ENUM ('DEPOSIT', 'WITHDRAWAL');

-- CreateTable
CREATE TABLE "public"."FundTransaction" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "public"."FundTransactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "FundTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FundTransaction_userId_idx" ON "public"."FundTransaction"("userId");

-- AddForeignKey
ALTER TABLE "public"."FundTransaction" ADD CONSTRAINT "FundTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
