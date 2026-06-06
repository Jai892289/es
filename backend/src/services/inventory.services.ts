import prisma from "../config/prisma";


export const createInventory = async (
  data: any
) => {
  const {
    departmentId,
    vendorId,
    categoryId,
    product,
  } = data;

  console.log("PRODUCT =>", product);

const quantity = Number(product.quantity || 0);
const inStock = Number(product.inStock || 0);
const inUse = Number(product.inUse || 0);
const inRepair = Number(product.inRepair || 0);
const damaged = Number(product.damaged || 0);
const retired = Number(product.retired || 0);

console.log({
  quantity,
  inStock,
  inUse,
  inRepair,
  damaged,
  retired,
});

  return prisma.$transaction(
    async (tx) => {

      const department =
        await tx.department.findUnique({
          where: {
            id: departmentId,
          },
        });

      if (!department) {
        throw new Error("Department not found");
      }

      const vendor =
        await tx.vendor.findUnique({
          where: {
            id: vendorId,
          },
        });

      if (!vendor) {
        throw new Error("Vendor not found");
      }

      const category =
        await tx.category.findUnique({
          where: {
            id: categoryId,
          },
        });

      if (!category) {
        throw new Error("Category not found");
      }

    

      const inventory =
        await tx.product.create({
          data: {
            productName:
              product.productName,

            assetName:
              product.assetName || null,

            brandName:
              product.brandName || null,

            modelNumber:
              product.modelNumber || null,

            quantity,

            inStock,

            inUse,

            inRepair,

            damaged,

            retired,

            initialStatus:
              product.initialStatus,

            serialNumber:
              product.serialNumber || null,

            invoiceNumber:
              product.invoiceNumber || null,

            amcNumber:
              product.amcNumber || null,

            productDescription:
              product.productDescription || null,

            amcAvailable:
              product.amcAvailable === "Yes",

            procurementDate:
              product.procurementDate
                ? new Date(
                    product.procurementDate
                  )
                : new Date(),

            purchaseDate:
              product.purchaseDate
                ? new Date(
                    product.purchaseDate
                  )
                : null,

            warrantyExpiryDate:
              product.warrantyExpiryDate
                ? new Date(
                    product.warrantyExpiryDate
                  )
                : null,

            amcExpiryDate:
              product.amcExpiryDate
                ? new Date(
                    product.amcExpiryDate
                  )
                : null,

            departmentId,

            vendorId,

            categoryId,
          },
        });

      return inventory;
    }
  );
};

// export const createInventory = async (data: any) => {
//   const { department, vendor, product } = data;

//   try {
//     return await prisma.$transaction(async (tx) => {

//       /* ---------------- DEPARTMENT ---------------- */

//       let departmentRecord = await tx.department.findFirst({
//         where: {
//           name: department.name,
//         },
//       });

//       if (!departmentRecord) {
//         departmentRecord = await tx.department.create({
//           data: {
//             name: department.name,
//             purpose: department.purpose,
//             location: department.location,
//             city: department.city,
//             state: department.state,
//             pincode: department.pincode,
//           },
//         });
//       }

//       /* ---------------- VENDOR ---------------- */

//       let vendorRecord = await tx.vendor.findFirst({
//         where: {
//           companyName: vendor.companyName,
//         },
//       });

//       if (!vendorRecord) {
//         vendorRecord = await tx.vendor.create({
//           data: {
//             companyName: vendor.companyName,
//             contactNumber: vendor.contactNumber,
//             whatsappNumber: vendor.whatsappNumber,
//             email: vendor.email,
//             website: vendor.website,
//           },
//         });
//       }

//       /* ---------------- CATEGORY ---------------- */

//       let categoryRecord = await tx.category.findFirst({
//         where: {
//           name: product.category,
//         },
//       });

//       if (!categoryRecord) {
//         categoryRecord = await tx.category.create({
//           data: {
//             name: product.category,
//           },
//         });
//       }

//       /* ---------------- PRODUCT ---------------- */

//       const productRecord = await tx.product.create({
//         data: {
//           productName: product.productName,

//           quantity: Number(product.quantity),

//           serialNumber: product.serialNumber,

//           procurementDate: new Date(product.procurementDate),

//           warrantyExpiryDate: product.warrantyExpiryDate
//             ? new Date(product.warrantyExpiryDate)
//             : null,

//           amcAvailable: product.amcAvailable === "Yes",

//           invoiceNumber: product.invoiceNumber,

//           /* relations */
//           departmentId: departmentRecord.id,

//           vendorId: vendorRecord.id,

//           categoryId: categoryRecord.id,
//         },
//       });

//       return productRecord;
//     });
//   } catch (error: any) {
//     console.log("CREATE INVENTORY ERROR =>", error);

//     throw new Error(error.message || "Failed to create inventory");
//   }
// };

export const getInventory = async (query: any) => {

  const {
    search,
    department,
    category,
    vendor,
    amc,
  } = query

  const data = await prisma.product.findMany({

    where: {

      ...(search && {
        OR: [
          {
            productName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            serialNumber: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),

      ...(department && {
        department: {
          name: {
            contains: department,
            mode: "insensitive",
          },
        },
      }),

      ...(category && {
        category: {
          name: {
            contains: category,
            mode: "insensitive",
          },
        },
      }),

      ...(vendor && {
        vendor: {
          companyName: {
            contains: vendor,
            mode: "insensitive",
          },
        },
      }),

      ...(amc && {
        amcAvailable: amc === "true",
      }),
    },

    include: {
      department: true,
      vendor: true,
      category: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  })

  return data
}

// export const createInventory = async (data: any) => {
//     const { department, vendor, product } = data
//     return await prisma.$transaction(async (tx) => {
//         let departmentRecord = await tx.department.findFirst({
//             where: {
//                 name: department.name
//             }
//         })

//         if (!departmentRecord) {
//             departmentRecord = await tx.department.create({
//                 data: {
//                     name: department.name,
//                     purpose: department.purpose,
//                     location: department.location,
//                     city: department.city,
//                     state: department.state,
//                     pincode: department.pincode,
//                 }
//             })
//         }

//         let vendorRecord = await tx.vendor.findFirst({
//             where: {
//                 companyName: vendor.companyName
//             }
//         })

//         if (!vendorRecord) {
//             vendorRecord = await tx.vendor.create({
//                 data: {
//                     companyName: vendor.companyName,
//                     contactNumber: vendor.contactNumber,
//                     whatsappNumber: vendor.whatsappNumber,
//                     email: vendor.email,
//                     website: vendor.website,
//                 }
//             })
//         }

//         const productRecord = await tx.product.create({
//             data: {
//                 productName: product.productName,
//                 category: product.category,
//                 quantity: Number(product.quantity),
//                 serialNumber: product.serialNumber,
//                 categoryId:product.categoryId,

//                 procurementDate: new Date(product.procurementDate),
//                 warrantyExpiryDate: product.warrantyExpiryDate
//                     ? new Date(product.warrantyExpiryDate)
//                     : null,

//                 amcAvailable: product.amcAvailable === "Yes",
//                 invoiceNumber: product.invoiceNumber,

//                 departmentId: departmentRecord.id,
//                 vendorId: vendorRecord.id,
//             },
//         });

//         console.log("productRecord", productRecord)

//         return productRecord;
//     });
// }

// export const getInventory = async () => {
//   const data = await prisma.product.findMany({
//     include: {
//       department: true,
//       vendor: true,
//       category:true
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return data;
// };

export const getInventorybyId = async (id:string) => {
  const data = await prisma.product.findUnique({
    where:{
        id
    }, include:{
      department:true,
      vendor:true
    }
  });

  if(!data){
    throw new Error("Inventory  not Found")
  }

  return data;
};

// creation of category

export const createCategory = async (data:any)=>{
const {name,description}= data
const category = await prisma.category.create({
data:{
    name, 
    description
}
})
return category
}

export const getCategory = async () => {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  });

  return categories.map((category) => {
    const totalAssets = category.products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );

    const totalAmount = category.products.reduce(
      (sum, product: any) =>
        sum + product.quantity * (product.unitPrice || 0),
      0
    );

    return {
      id: category.id,
      name: category.name,
      description: category.description,
      products: category.products,
      totalAssets,
      totalAmount,
    };
  });
};

export const getAssetStatusAnalytics = async () => {
  const products = await prisma.product.findMany();

  // total assets
  const totalAssets = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const statuses = [
    {
      key: "IN_USE",
      label: "In Use",
    },
    {
      key: "IN_STORE",
      label: "In Store",
    },
    {
      key: "IN_REPAIR",
      label: "In Repair",
    },
    {
      key: "RETIRED",
      label: "Retired",
    },
    {
      key: "DAMAGED",
      label: "Damaged",
    },
    {
      key: "NON_FUNCTIONAL",
      label: "Non-Functional",
    },
  ];

  const analytics = statuses.map((statusItem) => {
    // filter products by status
    const filteredProducts = products.filter(
      (product) => product?.status === statusItem.key
    );

    // add quantities
    const count = filteredProducts.reduce(
      (sum, product) => sum + product.quantity,
      0
    );

    // calculate percentage
    const percentage =
      totalAssets > 0
        ? Number(((count / totalAssets) * 100).toFixed(1))
        : 0;

    return {
      status: statusItem.key,
      label: statusItem.label,
      count,
      percentage,
    };
  });

  return {
    totalAssets,
    statuses: analytics,
  };
};



// CREATE TRANSFER
export const createAssetTransfer = async (data: any) => {
  const {
    productId,
    toDepartmentId,
    transferredBy,
    reason,
  } = data;

  // get current product
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  // create transfer request
  const transfer = await prisma.assetTransfer.create({
    data: {
      productId,

      fromDepartmentId: product.departmentId,

      toDepartmentId,

      transferredBy,

      reason,

      status: "PENDING",
    },

    include: {
      product: true,
      fromDepartment: true,
      toDepartment: true,
    },
  });

  return transfer;
};



// GET ALL TRANSFERS
export const getAssetTransfers = async () => {
  const transfers = await prisma.assetTransfer.findMany({
    include: {
      product: true,
      fromDepartment: true,
      toDepartment: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return transfers;
};



// APPROVE TRANSFER
export const approveAssetTransfer = async (
  transferId: string,
  approvedBy: string
) => {

  const transfer = await prisma.assetTransfer.findUnique({
    where: {
      id: transferId,
    },
  });

  if (!transfer) {
    throw new Error("Transfer not found");
  }

  // update transfer status
  const updatedTransfer = await prisma.assetTransfer.update({
    where: {
      id: transferId,
    },

    data: {
      status: "APPROVED",
      approvedBy,
    },
  });

  // update product department
  await prisma.product.update({
    where: {
      id: transfer.productId,
    },

    data: {
      departmentId: transfer.toDepartmentId || undefined,
    },
  });

  return updatedTransfer;
};




// CREATE ASSET MAPPING
export const createAssetMapping = async (data: any) => {
  const {
    productId,
    userId,
    departmentId,
    remarks,
  } = data;

  // deactivate old active mappings
  await prisma.assetMapping.updateMany({
    where: {
      productId,
      isActive: true,
    },

    data: {
      isActive: false,
      returnedDate: new Date(),
    },
  });

  // create new mapping
  const mapping = await prisma.assetMapping.create({
    data: {
      productId,
      userId,
      departmentId,
      remarks,
    },

    include: {
      product: true,
      user: true,
      department: true,
    },
  });

  return mapping;
};



// USER-WISE MAPPING
export const getUserWiseAssetMappings = async () => {

  const mappings = await prisma.assetMapping.findMany({
    where: {
      isActive: true,
    },

    include: {
      user: true,
      department: true,
      product: {
        include: {
          category: true,
        },
      },
    },
  });

  const groupedUsers: any = {};

  mappings.forEach((mapping) => {

    const userId = mapping.user?.id;

    if (!userId) return;

    if (!groupedUsers[userId]) {
      groupedUsers[userId] = {
        user: mapping.user?.name,
        department: mapping.department?.name,
        designation: "Employee",
        totalAssets: 0,
        categories: {},
      };
    }

    groupedUsers[userId].totalAssets += mapping.product.quantity;

    const categoryName =
      mapping.product.category?.name || "Others";

    if (!groupedUsers[userId].categories[categoryName]) {
      groupedUsers[userId].categories[categoryName] = 0;
    }

    groupedUsers[userId].categories[categoryName] +=
      mapping.product.quantity;
  });

  return Object.values(groupedUsers);
};



// DEPARTMENT-WISE MAPPING
export const getDepartmentWiseAssetMappings = async () => {

  const departments = await prisma.department.findMany({
    include: {
      products: true,
    },
  });

  return departments.map((department) => {

    const totalAssets = department.products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );

    const inUse = department.products
      .filter((product) => product.status === "IN_USE")
      .reduce((sum, product) => sum + product.quantity, 0);

    const inStore = department.products
      .filter((product) => product.status === "IN_STORE")
      .reduce((sum, product) => sum + product.quantity, 0);

    const inRepair = department.products
      .filter((product) => product.status === "IN_REPAIR")
      .reduce((sum, product) => sum + product.quantity, 0);

    return {
      department: department.name,

      totalAssets,

      inUse,
      inStore,
      inRepair,
    };
  });
};



// CREATE REPLACEMENT
export const createAssetReplacement = async (data: any) => {

  const {
    oldProductId,
    newProductId,
    departmentId,
    reason,
    replacedBy,
  } = data;

  // check old product
  const oldProduct = await prisma.product.findUnique({
    where: {
      id: oldProductId,
    },
  });

  console.log("oldProduct", oldProduct)

  if (!oldProduct) {
    throw new Error("Old product not found");
  }

  // check new product
  const newProduct = await prisma.product.findUnique({
    where: {
      id: newProductId,
    },
  });

  if (!newProduct) {
    throw new Error("New product not found");
  }

  // create replacement history
  const replacement =
    await prisma.assetReplacement.create({
      data: {
        oldProductId,
        newProductId,
        departmentId,
        reason,
        replacedBy,

        status: "COMPLETED",
      },

      include: {
        oldProduct: true,
        newProduct: true,
        department: true,
      },
    });

  // retire old asset
  await prisma.product.update({
    where: {
      id: oldProductId,
    },

    data: {
      status: "RETIRED",
    },
  });

  // activate new asset
  await prisma.product.update({
    where: {
      id: newProductId,
    },

    data: {
      status: "IN_USE",
      departmentId,
    },
  });

  return replacement;
};



// GET REPLACEMENTS
export const getAssetReplacements = async () => {

  const replacements =
    await prisma.assetReplacement.findMany({
      include: {
        oldProduct: true,
        newProduct: true,
        department: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return replacements;
};


export const distributeAsset = async (
  data: any
) => {
  const {
    productId,
    departmentId,
    quantity,
    distributedBy,
    remarks,
  } = data;

  return await prisma.$transaction(
    async (tx) => {

      const product =
        await tx.product.findUnique({
          where: {
            id: productId,
          },

          include: {
            assetDistribution: true,
          },
        });

      if (!product) {
        throw new Error(
          "Product not found"
        );
      }

      const distributedQty =
        product.assetDistribution.reduce(
          (sum, item) =>
            sum + item.quantity,
          0
        );

      const availableStock =
        product.quantity -
        distributedQty;

      if (
        Number(quantity) >
        availableStock
      ) {
        throw new Error(
          `Only ${availableStock} stock available`
        );
      }

      const distribution =
        await tx.assetDistribution.create({
          data: {
            productId,
            departmentId,

            quantity:
              Number(quantity),

            distributedBy,
            remarks,
          },

          include: {
            product: true,
            department: true,
          },
        });

      return distribution;
    }
  );
};


export const getAssetDistributions =
  async () => {

    return await prisma.assetDistribution.findMany({
      include: {
        product: true,
        department: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  };


  export const getProductStock =
  async (productId: any) => {

    const product =
      await prisma.product.findUnique({
        where: {
          id: productId,
        },

        include: {
          assetDistribution: {
            include: {
              department: true,
            },
          },
        },
      });

    if (!product) {
      throw new Error(
        "Product not found"
      );
    }

    const distributedQty =
      product.assetDistribution.reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      );

    return {
      productId: product.id,

      productName:
        product.productName,

      totalStock:
        product.quantity,

      distributedStock:
        distributedQty,

      availableStock:
        product.quantity -
        distributedQty,

      allocations:
        product.assetDistribution,
    };
  };