"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVendorbyId = exports.getAllVendor = exports.createVendor = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const createVendor = async (data) => {
    const { vendor, bankDetails } = data;
    return await prisma_1.default.$transaction(async (tx) => {
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
exports.createVendor = createVendor;
const getAllVendor = async () => {
    const data = await prisma_1.default.vendor.findMany({
        include: {
            documents: true,
            products: true,
            bankDetails: true
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return data;
};
exports.getAllVendor = getAllVendor;
const getVendorbyId = async (id) => {
    const vendorData = await prisma_1.default.vendor.findUnique({
        where: {
            id
        }
    });
    if (!vendorData) {
        throw new Error("Vendor not found");
    }
    return vendorData;
};
exports.getVendorbyId = getVendorbyId;
