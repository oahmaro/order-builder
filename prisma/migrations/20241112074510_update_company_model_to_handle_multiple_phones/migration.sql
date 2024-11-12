/*
  Warnings:

  - You are about to drop the column `phoneId` on the `Company` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Company_phoneId_idx";

-- DropIndex
DROP INDEX "Company_phoneId_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "phoneId";

-- AlterTable
ALTER TABLE "Phone" ADD COLUMN     "companyId" INTEGER;

-- CreateIndex
CREATE INDEX "Phone_companyId_idx" ON "Phone"("companyId");
