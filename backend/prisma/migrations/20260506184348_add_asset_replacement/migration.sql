-- CreateEnum
CREATE TYPE "ReplacementStatus" AS ENUM ('PENDING', 'COMPLETED');

-- CreateTable
CREATE TABLE "AssetReplacement" (
    "id" TEXT NOT NULL,
    "oldProductId" TEXT NOT NULL,
    "newProductId" TEXT NOT NULL,
    "departmentId" TEXT,
    "reason" TEXT,
    "replacedBy" TEXT NOT NULL,
    "status" "ReplacementStatus" NOT NULL DEFAULT 'COMPLETED',
    "replacementDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssetReplacement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AssetReplacement" ADD CONSTRAINT "AssetReplacement_oldProductId_fkey" FOREIGN KEY ("oldProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetReplacement" ADD CONSTRAINT "AssetReplacement_newProductId_fkey" FOREIGN KEY ("newProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetReplacement" ADD CONSTRAINT "AssetReplacement_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
