-- CreateTable
CREATE TABLE "public"."Holding" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "avg" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "net" TEXT NOT NULL,
    "day" TEXT NOT NULL,

    CONSTRAINT "Holding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "mode" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Position" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "avg" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "net" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "isLoss" BOOLEAN NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);
