import prisma from "../config/prisma";

export const createInventory = async (data: any) => {
    const { department, vendor, product } = data
    return await prisma.$transaction(async (tx) => {
        let departmentRecord = await tx.department.findFirst({
            where: {
                name: department.name
            }
        })

        if (!departmentRecord) {
            departmentRecord = await tx.department.create({
                data: {
                    name: department.name,
                    purpose: department.purpose,
                    location: department.location,
                    city: department.city,
                    state: department.state,
                    pincode: department.pincode,
                }
            })
        }

        let vendorRecord = await tx.vendor.findFirst({
            where: {
                companyName: vendor.companyName
            }
        })

        if (!vendorRecord) {
            vendorRecord = await tx.vendor.create({
                data: {
                    companyName: vendor.companyName,
                    contactNumber: vendor.contactNumber,
                    whatsappNumber: vendor.whatsappNumber,
                    email: vendor.email,
                    website: vendor.website,
                }
            })
        }

        const productRecord = await tx.product.create({
            data: {
                productName: product.productName,
                category: product.category,
                quantity: Number(product.quantity),
                serialNumber: product.serialNumber,

                procurementDate: new Date(product.procurementDate),
                warrantyExpiryDate: product.warrantyExpiryDate
                    ? new Date(product.warrantyExpiryDate)
                    : null,

                amcAvailable: product.amcAvailable === "Yes",
                invoiceNumber: product.invoiceNumber,

                departmentId: departmentRecord.id,
                vendorId: vendorRecord.id,
            },
        });

        return productRecord;
    });
}

export const getInventory = async () => {
  const data = await prisma.product.findMany({
    include: {
      department: true,
      vendor: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
};

export const getInventorybyId = async (id:string) => {
  const data = await prisma.product.findUnique({
    where:{
        id
    }
  });

  if(!data){
    throw new Error("Inventory  not Found")
  }

  return data;
};