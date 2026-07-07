-- CreateTable
CREATE TABLE "public"."Stock" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "exchange" TEXT NOT NULL DEFAULT 'NSE',
    "price" DOUBLE PRECISION NOT NULL,
    "previousClose" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stock_symbol_key" ON "public"."Stock"("symbol");
