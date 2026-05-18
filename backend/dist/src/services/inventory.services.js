"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetReplacements = exports.createAssetReplacement = exports.getDepartmentWiseAssetMappings = exports.getUserWiseAssetMappings = exports.createAssetMapping = exports.approveAssetTransfer = exports.getAssetTransfers = exports.createAssetTransfer = exports.getAssetStatusAnalytics = exports.getCategory = exports.createCategory = exports.getInventorybyId = exports.getInventory = exports.createInventory = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const createInventory = async (data) => {
    const { department, vendor, product } = data;
    return await prisma_1.default.$transaction(async (tx) => {
        let departmentRecord = await tx.department.findFirst({
            where: {
                name: department.name
            }
        });
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
            });
        }
        let vendorRecord = await tx.vendor.findFirst({
            where: {
                companyName: vendor.companyName
            }
        });
        if (!vendorRecord) {
            vendorRecord = await tx.vendor.create({
                data: {
                    companyName: vendor.companyName,
                    contactNumber: vendor.contactNumber,
                    whatsappNumber: vendor.whatsappNumber,
                    email: vendor.email,
                    website: vendor.website,
                }
            });
        }
        const productRecord = await tx.product.create({
            data: {
                productName: product.productName,
                category: product.category,
                quantity: Number(product.quantity),
                serialNumber: product.serialNumber,
                categoryId: product.categoryId,
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
};
exports.createInventory = createInventory;
const getInventory = async () => {
    const data = await prisma_1.default.product.findMany({
        include: {
            department: true,
            vendor: true,
            category: true
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return data;
};
exports.getInventory = getInventory;
const getInventorybyId = async (id) => {
    const data = await prisma_1.default.product.findUnique({
        where: {
            id
        }
    });
    if (!data) {
        throw new Error("Inventory  not Found");
    }
    return data;
};
exports.getInventorybyId = getInventorybyId;
// creation of category
const createCategory = async (data) => {
    const { name, description } = data;
    const category = await prisma_1.default.category.create({
        data: {
            name,
            description
        }
    });
    return category;
};
exports.createCategory = createCategory;
const getCategory = async () => {
    const categories = await prisma_1.default.category.findMany({
        include: {
            products: true,
        },
    });
    return categories.map((category) => {
        const totalAssets = category.products.reduce((sum, product) => sum + product.quantity, 0);
        const totalAmount = category.products.reduce((sum, product) => sum + (product.quantity * product?.unitPrice), 0);
        return {
            id: category.id,
            name: category.name,
            totalAssets,
            totalAmount,
        };
    });
};
exports.getCategory = getCategory;
const getAssetStatusAnalytics = async () => {
    const products = await prisma_1.default.product.findMany();
    // total assets
    const totalAssets = products.reduce((sum, product) => sum + product.quantity, 0);
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
        const filteredProducts = products.filter((product) => product?.status === statusItem.key);
        // add quantities
        const count = filteredProducts.reduce((sum, product) => sum + product.quantity, 0);
        // calculate percentage
        const percentage = totalAssets > 0
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
exports.getAssetStatusAnalytics = getAssetStatusAnalytics;
// CREATE TRANSFER
const createAssetTransfer = async (data) => {
    const { productId, toDepartmentId, transferredBy, reason, } = data;
    // get current product
    const product = await prisma_1.default.product.findUnique({
        where: {
            id: productId,
        },
    });
    if (!product) {
        throw new Error("Product not found");
    }
    // create transfer request
    const transfer = await prisma_1.default.assetTransfer.create({
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
exports.createAssetTransfer = createAssetTransfer;
// GET ALL TRANSFERS
const getAssetTransfers = async () => {
    const transfers = await prisma_1.default.assetTransfer.findMany({
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
exports.getAssetTransfers = getAssetTransfers;
// APPROVE TRANSFER
const approveAssetTransfer = async (transferId, approvedBy) => {
    const transfer = await prisma_1.default.assetTransfer.findUnique({
        where: {
            id: transferId,
        },
    });
    if (!transfer) {
        throw new Error("Transfer not found");
    }
    // update transfer status
    const updatedTransfer = await prisma_1.default.assetTransfer.update({
        where: {
            id: transferId,
        },
        data: {
            status: "APPROVED",
            approvedBy,
        },
    });
    // update product department
    await prisma_1.default.product.update({
        where: {
            id: transfer.productId,
        },
        data: {
            departmentId: transfer.toDepartmentId || undefined,
        },
    });
    return updatedTransfer;
};
exports.approveAssetTransfer = approveAssetTransfer;
// CREATE ASSET MAPPING
const createAssetMapping = async (data) => {
    const { productId, userId, departmentId, remarks, } = data;
    // deactivate old active mappings
    await prisma_1.default.assetMapping.updateMany({
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
    const mapping = await prisma_1.default.assetMapping.create({
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
exports.createAssetMapping = createAssetMapping;
// USER-WISE MAPPING
const getUserWiseAssetMappings = async () => {
    const mappings = await prisma_1.default.assetMapping.findMany({
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
    const groupedUsers = {};
    mappings.forEach((mapping) => {
        const userId = mapping.user?.id;
        if (!userId)
            return;
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
        const categoryName = mapping.product.category?.name || "Others";
        if (!groupedUsers[userId].categories[categoryName]) {
            groupedUsers[userId].categories[categoryName] = 0;
        }
        groupedUsers[userId].categories[categoryName] +=
            mapping.product.quantity;
    });
    return Object.values(groupedUsers);
};
exports.getUserWiseAssetMappings = getUserWiseAssetMappings;
// DEPARTMENT-WISE MAPPING
const getDepartmentWiseAssetMappings = async () => {
    const departments = await prisma_1.default.department.findMany({
        include: {
            products: true,
        },
    });
    return departments.map((department) => {
        const totalAssets = department.products.reduce((sum, product) => sum + product.quantity, 0);
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
exports.getDepartmentWiseAssetMappings = getDepartmentWiseAssetMappings;
// CREATE REPLACEMENT
const createAssetReplacement = async (data) => {
    const { oldProductId, newProductId, departmentId, reason, replacedBy, } = data;
    // check old product
    const oldProduct = await prisma_1.default.product.findUnique({
        where: {
            id: oldProductId,
        },
    });
    console.log("oldProduct", oldProduct);
    if (!oldProduct) {
        throw new Error("Old product not found");
    }
    // check new product
    const newProduct = await prisma_1.default.product.findUnique({
        where: {
            id: newProductId,
        },
    });
    if (!newProduct) {
        throw new Error("New product not found");
    }
    // create replacement history
    const replacement = await prisma_1.default.assetReplacement.create({
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
    await prisma_1.default.product.update({
        where: {
            id: oldProductId,
        },
        data: {
            status: "RETIRED",
        },
    });
    // activate new asset
    await prisma_1.default.product.update({
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
exports.createAssetReplacement = createAssetReplacement;
// GET REPLACEMENTS
const getAssetReplacements = async () => {
    const replacements = await prisma_1.default.assetReplacement.findMany({
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
exports.getAssetReplacements = getAssetReplacements;
