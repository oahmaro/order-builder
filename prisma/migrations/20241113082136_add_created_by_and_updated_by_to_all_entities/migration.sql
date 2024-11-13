-- AlterTable
ALTER TABLE "Adhesion" ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "updatedById" INTEGER;

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedById" INTEGER;

-- AlterTable
ALTER TABLE "Description" ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "updatedById" INTEGER;

-- AlterTable
ALTER TABLE "Frame" ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "updatedById" INTEGER;

-- AlterTable
ALTER TABLE "Passepartout" ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "updatedById" INTEGER;

-- AlterTable
ALTER TABLE "Print" ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "updatedById" INTEGER;

-- CreateIndex
CREATE INDEX "Adhesion_createdById_idx" ON "Adhesion"("createdById");

-- CreateIndex
CREATE INDEX "Adhesion_updatedById_idx" ON "Adhesion"("updatedById");

-- CreateIndex
CREATE INDEX "Company_createdById_idx" ON "Company"("createdById");

-- CreateIndex
CREATE INDEX "Company_updatedById_idx" ON "Company"("updatedById");

-- CreateIndex
CREATE INDEX "Description_createdById_idx" ON "Description"("createdById");

-- CreateIndex
CREATE INDEX "Description_updatedById_idx" ON "Description"("updatedById");

-- CreateIndex
CREATE INDEX "Frame_createdById_idx" ON "Frame"("createdById");

-- CreateIndex
CREATE INDEX "Frame_updatedById_idx" ON "Frame"("updatedById");

-- CreateIndex
CREATE INDEX "Passepartout_createdById_idx" ON "Passepartout"("createdById");

-- CreateIndex
CREATE INDEX "Passepartout_updatedById_idx" ON "Passepartout"("updatedById");

-- CreateIndex
CREATE INDEX "Print_createdById_idx" ON "Print"("createdById");

-- CreateIndex
CREATE INDEX "Print_updatedById_idx" ON "Print"("updatedById");
