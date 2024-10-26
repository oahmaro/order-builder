/*
  Warnings:

  - You are about to drop the column `code` on the `Frame` table. All the data in the column will be lost.
  - Added the required column `name` to the `Frame` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Frame_code_key";

-- AlterTable
ALTER TABLE "Adhesion" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Description" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Frame" DROP COLUMN "code",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Print" ADD COLUMN     "description" TEXT;
