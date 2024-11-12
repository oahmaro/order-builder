-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "passepartoutId" INTEGER;

-- CreateTable
CREATE TABLE "Passepartout" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Passepartout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrderItem_passepartoutId_idx" ON "OrderItem"("passepartoutId");
