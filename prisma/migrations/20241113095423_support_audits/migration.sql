/*
  Warnings:

  - You are about to drop the column `createdById` on the `Adhesion` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `Adhesion` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Description` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `Description` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Frame` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `Frame` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Passepartout` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `Passepartout` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Print` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `Print` table. All the data in the column will be lost.
  - You are about to drop the column `registrationToken` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Adhesion_createdById_idx";

-- DropIndex
DROP INDEX "Adhesion_updatedById_idx";

-- DropIndex
DROP INDEX "Company_createdById_idx";

-- DropIndex
DROP INDEX "Company_updatedById_idx";

-- DropIndex
DROP INDEX "Customer_createdById_idx";

-- DropIndex
DROP INDEX "Customer_updatedById_idx";

-- DropIndex
DROP INDEX "Description_createdById_idx";

-- DropIndex
DROP INDEX "Description_updatedById_idx";

-- DropIndex
DROP INDEX "Frame_createdById_idx";

-- DropIndex
DROP INDEX "Frame_updatedById_idx";

-- DropIndex
DROP INDEX "Order_createdById_idx";

-- DropIndex
DROP INDEX "Order_updatedById_idx";

-- DropIndex
DROP INDEX "Passepartout_createdById_idx";

-- DropIndex
DROP INDEX "Passepartout_updatedById_idx";

-- DropIndex
DROP INDEX "Print_createdById_idx";

-- DropIndex
DROP INDEX "Print_updatedById_idx";

-- AlterTable
ALTER TABLE "Adhesion" DROP COLUMN "createdById",
DROP COLUMN "updatedById";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "createdById",
DROP COLUMN "updatedById";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "createdById",
DROP COLUMN "updatedById";

-- AlterTable
ALTER TABLE "Description" DROP COLUMN "createdById",
DROP COLUMN "updatedById";

-- AlterTable
ALTER TABLE "Frame" DROP COLUMN "createdById",
DROP COLUMN "updatedById";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "createdById",
DROP COLUMN "updatedById";

-- AlterTable
ALTER TABLE "Passepartout" DROP COLUMN "createdById",
DROP COLUMN "updatedById";

-- AlterTable
ALTER TABLE "Print" DROP COLUMN "createdById",
DROP COLUMN "updatedById";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "registrationToken";

-- CreateTable
CREATE TABLE "Audit" (
    "id" SERIAL NOT NULL,
    "entityId" INTEGER NOT NULL,
    "entityType" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "changes" JSONB,
    "userId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Audit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Audit_userId_idx" ON "Audit"("userId");

-- CreateIndex
CREATE INDEX "Audit_entityId_entityType_idx" ON "Audit"("entityId", "entityType");
