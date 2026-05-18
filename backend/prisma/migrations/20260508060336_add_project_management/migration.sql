-- DropForeignKey
ALTER TABLE "ProjectApproval" DROP CONSTRAINT "ProjectApproval_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectAsset" DROP CONSTRAINT "ProjectAsset_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectBudget" DROP CONSTRAINT "ProjectBudget_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectDescription" DROP CONSTRAINT "ProjectDescription_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectLocation" DROP CONSTRAINT "ProjectLocation_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectMilestone" DROP CONSTRAINT "ProjectMilestone_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTeam" DROP CONSTRAINT "ProjectTeam_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTimeline" DROP CONSTRAINT "ProjectTimeline_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectVendor" DROP CONSTRAINT "ProjectVendor_projectId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "projectId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProjectApproval" ALTER COLUMN "projectId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProjectAsset" ALTER COLUMN "projectId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProjectBudget" ALTER COLUMN "projectId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProjectDescription" ALTER COLUMN "projectId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProjectLocation" ALTER COLUMN "projectId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProjectMilestone" ALTER COLUMN "projectId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProjectTeam" ALTER COLUMN "projectId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProjectTimeline" ALTER COLUMN "projectId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProjectVendor" ALTER COLUMN "projectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProjectLocation" ADD CONSTRAINT "ProjectLocation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectDescription" ADD CONSTRAINT "ProjectDescription_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTimeline" ADD CONSTRAINT "ProjectTimeline_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectBudget" ADD CONSTRAINT "ProjectBudget_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectVendor" ADD CONSTRAINT "ProjectVendor_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectAsset" ADD CONSTRAINT "ProjectAsset_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMilestone" ADD CONSTRAINT "ProjectMilestone_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTeam" ADD CONSTRAINT "ProjectTeam_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectApproval" ADD CONSTRAINT "ProjectApproval_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
