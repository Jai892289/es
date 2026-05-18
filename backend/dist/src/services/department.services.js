"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartmentStats = exports.deleteDepartment = exports.updateDepartment = exports.getSingleDepartment = exports.getDepartments = exports.createDepartment = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const createDepartment = async (data) => {
    return prisma_1.default.department.create({
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
exports.createDepartment = createDepartment;
const getDepartments = async () => {
    return prisma_1.default.department.findMany({
        include: {
            users: true,
            products: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getDepartments = getDepartments;
const getSingleDepartment = async (id) => {
    return prisma_1.default.department.findUnique({
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
exports.getSingleDepartment = getSingleDepartment;
const updateDepartment = async (id, data) => {
    return prisma_1.default.department.update({
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
exports.updateDepartment = updateDepartment;
const deleteDepartment = async (id) => {
    return prisma_1.default.department.delete({
        where: { id },
    });
};
exports.deleteDepartment = deleteDepartment;
const getDepartmentStats = async () => {
    const totalDepartments = await prisma_1.default.department.count();
    const activeDepartments = await prisma_1.default.department.count({
        where: {
            isActive: true,
        },
    });
    const totalStaff = await prisma_1.default.user.count();
    const totalAssets = await prisma_1.default.product.aggregate({
        _sum: {
            quantity: true,
        },
    });
    return {
        totalDepartments,
        activeDepartments,
        totalStaff,
        totalAssets: totalAssets._sum.quantity || 0,
    };
};
exports.getDepartmentStats = getDepartmentStats;
