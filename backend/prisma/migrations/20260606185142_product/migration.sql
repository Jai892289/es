/*
  Warnings:

  - The values [IN_STORE,NON_FUNCTIONAL] on the enum `AssetStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AssetStatus_new" AS ENUM ('IN_STOCK', 'IN_USE', 'IN_REPAIR', 'RETIRED', 'DAMAGED');
ALTER TABLE "Product" ALTER COLUMN "initialStatus" TYPE "AssetStatus_new" USING ("initialStatus"::text::"AssetStatus_new");
ALTER TABLE "Product" ALTER COLUMN "status" TYPE "AssetStatus_new" USING ("status"::text::"AssetStatus_new");
ALTER TYPE "AssetStatus" RENAME TO "AssetStatus_old";
ALTER TYPE "AssetStatus_new" RENAME TO "AssetStatus";
DROP TYPE "AssetStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "amcExpiryDate" TIMESTAMP(3),
ADD COLUMN     "amcNumber" TEXT;
