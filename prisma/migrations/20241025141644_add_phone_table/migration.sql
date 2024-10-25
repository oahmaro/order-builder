/*
  Warnings:

  - You are about to drop the column `phone` on the `Customer` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PhoneType" AS ENUM ('MOBILE', 'HOME', 'WORK', 'OTHER');

-- DropIndex
DROP INDEX "Customer_phone_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "phone";

-- CreateTable
CREATE TABLE "Phone" (
    "id" SERIAL NOT NULL,
    "countryCode" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "type" "PhoneType" NOT NULL DEFAULT 'MOBILE',
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Phone_customerId_idx" ON "Phone"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_countryCode_number_key" ON "Phone"("countryCode", "number");
