/*
  Warnings:

  - The values [IN_STOCK] on the enum `AssetStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AssetStatus_new" AS ENUM ('IN_USE', 'IN_STORE', 'IN_REPAIR', 'RETIRED', 'DAMAGED', 'NON_FUNCTIONAL');
ALTER TABLE "Product" ALTER COLUMN "initialStatus" TYPE "AssetStatus_new" USING ("initialStatus"::text::"AssetStatus_new");
ALTER TABLE "Product" ALTER COLUMN "status" TYPE "AssetStatus_new" USING ("status"::text::"AssetStatus_new");
ALTER TYPE "AssetStatus" RENAME TO "AssetStatus_old";
ALTER TYPE "AssetStatus_new" RENAME TO "AssetStatus";
DROP TYPE "AssetStatus_old";
COMMIT;
