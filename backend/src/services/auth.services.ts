import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import { Role, UserStatus } from "@prisma/client";
import jwt from "jsonwebtoken";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  role?: Role;
}) => {
  const { name, email, password, role } = data;

  // check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role || Role.USER,
    },
  });

  return user;
};


export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  return {
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
  token,
};

//   return { id, token };
};


export const updateUser = async (
  userId: string,
  data: {
    name?: string;
    email?: string;
    mobileNumber?: string;
    designation?: string;
    role?: Role;
    departmentId?: string;
  }
) => {

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return prisma.user.update({
    where: { id: userId },
    data,
  });
};

export const deactivateUser = async (
  userId: string
) => {

  return prisma.user.update({
    where: { id: userId },
    data: {
      status: UserStatus.INACTIVE,
    },
  });
};

export const activateUser = async (
  userId: string
) => {

  return prisma.user.update({
    where: { id: userId },
    data: {
      status: UserStatus.ACTIVE,
    },
  });
};