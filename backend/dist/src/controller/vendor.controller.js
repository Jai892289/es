"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVendorbyIdController = exports.getVendorController = exports.createVendorController = void 0;
const vendor_services_1 = require("../services/vendor.services");
const createVendorController = async (req, res) => {
    try {
        const data = await (0, vendor_services_1.createVendor)(req.body);
        res.status(201).json({
            message: "Vendor Created",
            data,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createVendorController = createVendorController;
const getVendorController = async (req, res) => {
    try {
        const data = await (0, vendor_services_1.getAllVendor)();
        res.status(201).json({
            message: "Fetch All Vendor",
            data
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getVendorController = getVendorController;
const getVendorbyIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await (0, vendor_services_1.getVendorbyId)(id);
        res.status(201).json({
            message: "Venodr found",
            data
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getVendorbyIdController = getVendorbyIdController;
