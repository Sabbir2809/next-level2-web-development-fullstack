-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "address" TEXT,
ALTER COLUMN "contactNumber" DROP NOT NULL;

-- AlterTable
ALTER TABLE "specialties" ALTER COLUMN "icon" DROP NOT NULL;
