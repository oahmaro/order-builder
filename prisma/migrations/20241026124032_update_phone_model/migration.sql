/*
  Warnings:

  - You are about to drop the column `type` on the `Phone` table. All the data in the column will be lost.
  - Added the required column `dialingCode` to the `Phone` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Phone_countryCode_number_key";

-- AlterTable
ALTER TABLE "Phone" DROP COLUMN "type",
ADD COLUMN     "dialingCode" TEXT NOT NULL;
