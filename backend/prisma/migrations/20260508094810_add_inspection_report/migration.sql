-- AlterTable
ALTER TABLE "InspectionReport" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedBy" TEXT,
ADD COLUMN     "supervisorComment" TEXT,
ADD COLUMN     "supervisorStatus" TEXT NOT NULL DEFAULT 'PENDING';
