import prisma from "../config/prisma";


export const createComplaint = async (data: any) => {
  const { complaint, attachments } = data;

  return await prisma.$transaction(async (tx) => {

    let productData: any = null;
    let vendorData: any = null;
    let departmentData: any = null;

    /* ---------- PRODUCT AUTO-FILL ---------- */
    if (complaint.productId) {
      productData = await tx.product.findUnique({
        where: { id: complaint.productId },
        include: {
          vendor: true,
          department: true,
        },
      });

      if (!productData) {
        throw new Error("Product not found");
      }

      vendorData = productData.vendor;
      departmentData = productData.department;
    }

    /* ---------- VENDOR AUTO-FILL ---------- */
    if (complaint.vendorId && !vendorData) {
      vendorData = await tx.vendor.findUnique({
        where: { id: complaint.vendorId },
      });

      if (!vendorData) {
        throw new Error("Vendor not found");
      }
    }

    /* ---------- CREATE COMPLAINT ---------- */
    const createdComplaint = await tx.complaint.create({
      data: {
        title: complaint.title,
        description: complaint.description,
        urgency: complaint.urgency,

        /* ---------- USER SNAPSHOT ---------- */
        fullName: complaint.fullName,
        designation: complaint.designation,
        contactNumber: complaint.contactNumber,
        email: complaint.email,
        location: complaint.location,

        /* ---------- DEPARTMENT ---------- */
        departmentId: productData?.departmentId || complaint.departmentId,
        departmentName:
          departmentData?.name || complaint.departmentName,

        /* ---------- PRODUCT ---------- */
        productId: complaint.productId,
        productName:
          productData?.productName || complaint.productName,
        category: complaint.category,
        serialNumber: complaint.serialNumber,
        amcContractNumber: complaint.amcContractNumber,
        warrantyExpiryDate:
          productData?.warrantyExpiryDate || complaint.warrantyExpiryDate,

        /* ---------- VENDOR ---------- */
        vendorId: productData?.vendorId || complaint.vendorId,
        vendorCompanyName:
          vendorData?.companyName || complaint.vendorCompanyName,
        vendorContactName:
          vendorData?.fullName || complaint.vendorContactName,
        vendorContactNumber:
          vendorData?.contactNumber || complaint.vendorContactNumber,
        vendorWhatsapp:
          vendorData?.whatsappNumber || complaint.vendorWhatsapp,
        vendorEmail:
          vendorData?.email || complaint.vendorEmail,

        /* ---------- DATES ---------- */
        issueDate: new Date(complaint.issueDate),

        /* ---------- COMMUNICATION ---------- */
        sendWhatsapp: complaint.sendWhatsapp || false,
        sendEmail: complaint.sendEmail || false,
      },
    });

    /* ---------- ATTACHMENTS ---------- */
    if (attachments && attachments.length > 0) {
      await tx.complaintAttachment.createMany({
        data: attachments.map((file: any) => ({
          complaintId: createdComplaint.id,
          fileUrl: file.fileUrl,
          fileType: file.fileType,
        })),
      });
    }

    return createdComplaint;
  });
};

export const getComplaint =async()=>{
    const data = await prisma.complaint.findMany({
    include: {
      department: true,
      vendor: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}