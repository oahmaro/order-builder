/*
  Warnings:

  - You are about to drop the column `passepartoutNum` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the `_PassepartoutToOrderItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "passepartoutNum",
ADD COLUMN     "passepartoutId" INTEGER;

-- DropTable
DROP TABLE "_PassepartoutToOrderItem";

-- CreateIndex
CREATE INDEX "OrderItem_passepartoutId_idx" ON "OrderItem"("passepartoutId");
