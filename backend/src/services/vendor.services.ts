import prisma from "../config/prisma";

export const createVendor = async (data: any) => {
  const { vendor, bankDetails } = data;

  return await prisma.$transaction(async (tx) => {

    // 1. create vendor
    const vendorRecord = await tx.vendor.create({
      data: {
        companyName: vendor.companyName,
        contactNumber: vendor.contactNumber,
        whatsappNumber: vendor.whatsappNumber,
        email: vendor.email,
        website: vendor.website,
        fullName: vendor.fullName,
        addressLine1: vendor.addressLine1,
        addressLine2: vendor.addressLine2,
        city: vendor.city,
        state: vendor.state,
        pincode: vendor.pincode,
        gstNumber: vendor.gstNumber,
      },
    });

    // 2. bank details (optional)
    if (bankDetails) {
      await tx.vendorBankDetails.create({
        data: {
          vendorId: vendorRecord.id,
          accountName: bankDetails.accountName,
          accountNumber: bankDetails.accountNumber,
          bankName: bankDetails.bankName,
          branchCode: bankDetails.branchCode,
          ifscCode: bankDetails.ifscCode,
        },
      });
    }

    return vendorRecord;
  });
};


export const getAllVendor = async () => {
  const data = await prisma.vendor.findMany({
    include:{
      documents:true,
      products:true,
      bankDetails:true
    },
      orderBy: {
      createdAt: "desc",
    },
  })

  return data
}

export const getVendorbyId =async (id:any)=>{

const vendorData = await prisma.vendor.findUnique({
  where:{
    id
  }
})
if(!vendorData){
  throw new Error("Vendor not found")
}
return vendorData
}



