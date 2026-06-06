-- CreateTable
CREATE TABLE "AssetDistribution" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssetDistribution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AssetDistribution" ADD CONSTRAINT "AssetDistribution_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetDistribution" ADD CONSTRAINT "AssetDistribution_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
