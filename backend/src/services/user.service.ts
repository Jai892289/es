import prisma from "../config/prisma";

export const createUser = async (data: any) => {
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      mobileNumber: data.mobileNumber,
      designation: data.designation,
      role: data.role,
      departmentId: data.departmentId,
    },

    include: {
      department: true,
    },
  });

  return user;
};

export const getUsers = async () => {
  return prisma.user.findMany({
    include: {
      department: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getSingleUser = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },

    include: {
      department: true,
    },
  });
};

export const updateUser = async (
  id: string,
  data: any
) => {
  return prisma.user.update({
    where: { id },

    data: {
      name: data.name,
      email: data.email,
      mobileNumber: data.mobileNumber,
      designation: data.designation,
      role: data.role,
      status: data.status,
      departmentId: data.departmentId,
    },

    include: {
      department: true,
    },
  });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};