/*
  Warnings:

  - You are about to drop the column `countryCode` on the `Phone` table. All the data in the column will be lost.
  - You are about to drop the column `dialingCode` on the `Phone` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number]` on the table `Phone` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Phone_countryCode_dialingCode_number_key";

-- AlterTable
ALTER TABLE "Phone" DROP COLUMN "countryCode",
DROP COLUMN "dialingCode";

-- CreateIndex
CREATE UNIQUE INDEX "Phone_number_key" ON "Phone"("number");
