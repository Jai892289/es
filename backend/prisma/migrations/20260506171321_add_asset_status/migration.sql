-- CreateEnum
CREATE TYPE "AssetStatus" AS ENUM ('IN_USE', 'IN_STORE', 'IN_REPAIR', 'RETIRED', 'DAMAGED', 'NON_FUNCTIONAL');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "status" "AssetStatus";
