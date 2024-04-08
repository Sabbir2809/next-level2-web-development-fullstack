/*
  Warnings:

  - You are about to drop the column `endDate` on the `shedules` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `shedules` table. All the data in the column will be lost.
  - Added the required column `endDateTime` to the `shedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDateTime` to the `shedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shedules" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "endDateTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDateTime" TIMESTAMP(3) NOT NULL;
