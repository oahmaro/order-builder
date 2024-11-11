/*
  Warnings:

  - You are about to drop the column `phone` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "phone",
ADD COLUMN     "phoneId" INTEGER;

-- AlterTable
ALTER TABLE "Phone" ALTER COLUMN "customerId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_phoneId_key" ON "Company"("phoneId");

-- CreateIndex
CREATE INDEX "Company_phoneId_idx" ON "Company"("phoneId");
