"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getSingleUser = exports.getUsers = exports.createUser = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const createUser = async (data) => {
    const user = await prisma_1.default.user.create({
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
exports.createUser = createUser;
const getUsers = async () => {
    return prisma_1.default.user.findMany({
        include: {
            department: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getUsers = getUsers;
const getSingleUser = async (id) => {
    return prisma_1.default.user.findUnique({
        where: { id },
        include: {
            department: true,
        },
    });
};
exports.getSingleUser = getSingleUser;
const updateUser = async (id, data) => {
    return prisma_1.default.user.update({
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
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    return prisma_1.default.user.delete({
        where: { id },
    });
};
exports.deleteUser = deleteUser;
