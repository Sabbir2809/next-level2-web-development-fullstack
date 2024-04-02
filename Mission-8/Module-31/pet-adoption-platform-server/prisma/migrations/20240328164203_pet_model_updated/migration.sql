/*
  Warnings:

  - Changed the type of `status` on the `adoptionrequest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `size` on the `pet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "adoptionrequest" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL;

-- AlterTable
ALTER TABLE "pet" DROP COLUMN "size",
ADD COLUMN     "size" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Size";
