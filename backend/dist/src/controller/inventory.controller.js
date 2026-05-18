"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetReplacementsController = exports.createAssetReplacementController = exports.getDepartmentWiseAssetMappingsController = exports.getUserWiseAssetMappingsController = exports.createAssetMappingController = exports.approveAssetTransferController = exports.getAssetTransfersController = exports.createAssetTransferController = exports.getAssetStatusAnalyticsController = exports.getProductCategoryController = exports.createProductCategoryController = exports.getInventoryControllerbyId = exports.getInventoryController = exports.createInventoryController = void 0;
const inventory_services_1 = require("../services/inventory.services");
const createInventoryController = async (req, res) => {
    try {
        const data = await (0, inventory_services_1.createInventory)(req.body);
        res.status(201).json({
            message: "Inventory created",
            data,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createInventoryController = createInventoryController;
const getInventoryController = async (req, res) => {
    try {
        const data = await (0, inventory_services_1.getInventory)();
        res.json({
            message: "Inventory fetched",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getInventoryController = getInventoryController;
const getInventoryControllerbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await (0, inventory_services_1.getInventorybyId)(id);
        res.json({
            message: "Inventory fetched",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getInventoryControllerbyId = getInventoryControllerbyId;
const createProductCategoryController = async (req, res) => {
    try {
        const data = await (0, inventory_services_1.createCategory)(req.body);
        res.status(201).json({
            message: "Inventory created",
            data,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createProductCategoryController = createProductCategoryController;
const getProductCategoryController = async (req, res) => {
    try {
        const data = await (0, inventory_services_1.getCategory)();
        console.log(data);
        res.json({
            message: "Category fetched",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getProductCategoryController = getProductCategoryController;
const getAssetStatusAnalyticsController = async (req, res) => {
    try {
        const data = await (0, inventory_services_1.getAssetStatusAnalytics)();
        res.status(200).json({
            message: "Asset status analytics fetched successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Internal server error",
        });
    }
};
exports.getAssetStatusAnalyticsController = getAssetStatusAnalyticsController;
// CREATE TRANSFER
const createAssetTransferController = async (req, res) => {
    try {
        const data = await (0, inventory_services_1.createAssetTransfer)(req.body);
        res.status(201).json({
            message: "Asset transfer created successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.createAssetTransferController = createAssetTransferController;
// GET TRANSFERS
const getAssetTransfersController = async (req, res) => {
    try {
        const data = await (0, inventory_services_1.getAssetTransfers)();
        res.status(200).json({
            message: "Asset transfers fetched successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getAssetTransfersController = getAssetTransfersController;
// APPROVE TRANSFER
const approveAssetTransferController = async (req, res) => {
    try {
        const { id } = req.params;
        const { approvedBy } = req.body;
        const data = await (0, inventory_services_1.approveAssetTransfer)(id, approvedBy);
        res.status(200).json({
            message: "Asset transfer approved successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.approveAssetTransferController = approveAssetTransferController;
// CREATE MAPPING
const createAssetMappingController = async (req, res) => {
    try {
        const data = await (0, inventory_services_1.createAssetMapping)(req.body);
        res.status(201).json({
            message: "Asset mapping created successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.createAssetMappingController = createAssetMappingController;
// USER-WISE
const getUserWiseAssetMappingsController = async (req, res) => {
    try {
        const data = await (0, inventory_services_1.getUserWiseAssetMappings)();
        res.status(200).json({
            message: "User-wise asset mappings fetched",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getUserWiseAssetMappingsController = getUserWiseAssetMappingsController;
// DEPARTMENT-WISE
const getDepartmentWiseAssetMappingsController = async (req, res) => {
    try {
        const data = await (0, inventory_services_1.getDepartmentWiseAssetMappings)();
        res.status(200).json({
            message: "Department-wise asset mappings fetched",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getDepartmentWiseAssetMappingsController = getDepartmentWiseAssetMappingsController;
// CREATE REPLACEMENT
const createAssetReplacementController = async (req, res) => {
    try {
        const data = await (0, inventory_services_1.createAssetReplacement)(req.body);
        res.status(201).json({
            message: "Asset replacement created successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.createAssetReplacementController = createAssetReplacementController;
// GET REPLACEMENTS
const getAssetReplacementsController = async (req, res) => {
    try {
        const data = await (0, inventory_services_1.getAssetReplacements)();
        res.status(200).json({
            message: "Asset replacements fetched successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getAssetReplacementsController = getAssetReplacementsController;
