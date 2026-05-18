import prisma from "../config/prisma";

export const createDepartment = async (
  data: any
) => {
  return prisma.department.create({
    data: {
      name: data.name,
      purpose: data.purpose,
      location: data.location,
      city: data.city,
      state: data.state,
      pincode: data.pincode,

      code: data.code,
      description: data.description,
      adminName: data.adminName,

      totalStaff: data.totalStaff || 0,
      totalAssets: data.totalAssets || 0,
    },
  });
};

export const getDepartments = async () => {
  return prisma.department.findMany({
    include: {
      users: true,
      products: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getSingleDepartment = async (
  id: string
) => {
  return prisma.department.findUnique({
    where: { id },

    include: {
      users: true,
      products: true,
      complaints: true,
      replacements: true,
      mappings: true,
    },
  });
};

export const updateDepartment = async (
  id: string,
  data: any
) => {
  return prisma.department.update({
    where: { id },

    data: {
      name: data.name,
      purpose: data.purpose,
      location: data.location,
      city: data.city,
      state: data.state,
      pincode: data.pincode,

      code: data.code,
      description: data.description,
      adminName: data.adminName,

      totalStaff: data.totalStaff,
      totalAssets: data.totalAssets,

      isActive: data.isActive,
    },
  });
};

export const deleteDepartment = async (
  id: string
) => {
  return prisma.department.delete({
    where: { id },
  });
};

export const getDepartmentStats = async () => {
  const totalDepartments =
    await prisma.department.count();

  const activeDepartments =
    await prisma.department.count({
      where: {
        isActive: true,
      },
    });

  const totalStaff =
    await prisma.user.count();

  const totalAssets =
    await prisma.product.aggregate({
      _sum: {
        quantity: true,
      },
    });

  return {
    totalDepartments,
    activeDepartments,
    totalStaff,
    totalAssets:
      totalAssets._sum.quantity || 0,
  };
};