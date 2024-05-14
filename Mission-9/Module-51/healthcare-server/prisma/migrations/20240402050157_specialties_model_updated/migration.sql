/*
  Warnings:

  - The primary key for the `doctor_specialties` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `specialitiesId` on the `doctor_specialties` table. All the data in the column will be lost.
  - You are about to drop the `specialities` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `specialtiesId` to the `doctor_specialties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "doctor_specialties" DROP CONSTRAINT "doctor_specialties_specialitiesId_fkey";

-- AlterTable
ALTER TABLE "doctor_specialties" DROP CONSTRAINT "doctor_specialties_pkey",
DROP COLUMN "specialitiesId",
ADD COLUMN     "specialtiesId" TEXT NOT NULL,
ADD CONSTRAINT "doctor_specialties_pkey" PRIMARY KEY ("specialtiesId", "doctorId");

-- DropTable
DROP TABLE "specialities";

-- CreateTable
CREATE TABLE "specialties" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "specialties_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "doctor_specialties" ADD CONSTRAINT "doctor_specialties_specialtiesId_fkey" FOREIGN KEY ("specialtiesId") REFERENCES "specialties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
