-- CreateTable
CREATE TABLE "InspectionReport" (
    "id" TEXT NOT NULL,
    "inspectionId" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "complianceStatus" TEXT NOT NULL,
    "recommendation" TEXT,
    "inspectionResult" TEXT NOT NULL,
    "latitude" TEXT,
    "longitude" TEXT,
    "address" TEXT,
    "photoUrls" TEXT[],
    "videoUrls" TEXT[],
    "signatureUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InspectionReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InspectionReport" ADD CONSTRAINT "InspectionReport_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "Inspection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
