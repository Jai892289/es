-- AlterTable
ALTER TABLE "Inspection" ADD COLUMN     "inspectorName" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "priority" TEXT,
ADD COLUMN     "reminderDate" TIMESTAMP(3),
ADD COLUMN     "scheduledDate" TIMESTAMP(3),
ADD COLUMN     "status" TEXT,
ADD COLUMN     "type" TEXT;
