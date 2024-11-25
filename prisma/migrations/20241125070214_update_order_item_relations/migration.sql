/*
  Warnings:

  - You are about to drop the column `adhesionId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `passepartoutId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `printId` on the `OrderItem` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "OrderItem_adhesionId_idx";

-- DropIndex
DROP INDEX "OrderItem_descriptionId_idx";

-- DropIndex
DROP INDEX "OrderItem_passepartoutId_idx";

-- DropIndex
DROP INDEX "OrderItem_printId_idx";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "adhesionId",
DROP COLUMN "descriptionId",
DROP COLUMN "passepartoutId",
DROP COLUMN "printId";

-- CreateTable
CREATE TABLE "_AdhesionToOrderItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DescriptionToOrderItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PrintToOrderItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PassepartoutToOrderItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AdhesionToOrderItem_AB_unique" ON "_AdhesionToOrderItem"("A", "B");

-- CreateIndex
CREATE INDEX "_AdhesionToOrderItem_B_index" ON "_AdhesionToOrderItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DescriptionToOrderItem_AB_unique" ON "_DescriptionToOrderItem"("A", "B");

-- CreateIndex
CREATE INDEX "_DescriptionToOrderItem_B_index" ON "_DescriptionToOrderItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PrintToOrderItem_AB_unique" ON "_PrintToOrderItem"("A", "B");

-- CreateIndex
CREATE INDEX "_PrintToOrderItem_B_index" ON "_PrintToOrderItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PassepartoutToOrderItem_AB_unique" ON "_PassepartoutToOrderItem"("A", "B");

-- CreateIndex
CREATE INDEX "_PassepartoutToOrderItem_B_index" ON "_PassepartoutToOrderItem"("B");
