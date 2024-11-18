/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Adhesion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Description` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Frame` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Passepartout` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[countryCode,dialingCode,number]` on the table `Phone` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Print` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Adhesion_name_key" ON "Adhesion"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Description_name_key" ON "Description"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Frame_name_key" ON "Frame"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Passepartout_name_key" ON "Passepartout"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_countryCode_dialingCode_number_key" ON "Phone"("countryCode", "dialingCode", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Print_name_key" ON "Print"("name");
