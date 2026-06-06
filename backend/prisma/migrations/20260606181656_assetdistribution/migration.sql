/*
  Warnings:

  - Added the required column `updatedAt` to the `AssetDistribution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AssetDistribution" ADD COLUMN     "distributedBy" TEXT,
ADD COLUMN     "remarks" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
