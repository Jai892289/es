"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const inventory_controller_1 = require("../controller/inventory.controller");
const router = (0, express_1.Router)();
router.post("/create-category", auth_middleware_1.authMiddleware, inventory_controller_1.createProductCategoryController);
router.get("/category", auth_middleware_1.authMiddleware, inventory_controller_1.getProductCategoryController);
router.get("/asset-status", auth_middleware_1.authMiddleware, inventory_controller_1.getAssetStatusAnalyticsController);
// CREATE TRANSFER
router.post("/transfers", auth_middleware_1.authMiddleware, inventory_controller_1.createAssetTransferController);
// GET TRANSFERS
router.get("/transfers", auth_middleware_1.authMiddleware, inventory_controller_1.getAssetTransfersController);
// APPROVE TRANSFER
router.patch("/transfers/:id/approve", auth_middleware_1.authMiddleware, inventory_controller_1.approveAssetTransferController);
// CREATE MAPPING
router.post("/mappings", auth_middleware_1.authMiddleware, inventory_controller_1.createAssetMappingController);
// USER-WISE MAPPING
router.get("/mappings/users", auth_middleware_1.authMiddleware, inventory_controller_1.getUserWiseAssetMappingsController);
// DEPARTMENT-WISE MAPPING
router.get("/mappings/departments", auth_middleware_1.authMiddleware, inventory_controller_1.getDepartmentWiseAssetMappingsController);
// CREATE REPLACEMENT
router.post("/replacements", auth_middleware_1.authMiddleware, inventory_controller_1.createAssetReplacementController);
// GET REPLACEMENTS
router.get("/replacements", auth_middleware_1.authMiddleware, inventory_controller_1.getAssetReplacementsController);
router.post("/", auth_middleware_1.authMiddleware, inventory_controller_1.createInventoryController);
router.get("/", auth_middleware_1.authMiddleware, inventory_controller_1.getInventoryController);
router.get("/:id", auth_middleware_1.authMiddleware, inventory_controller_1.getInventoryControllerbyId);
exports.default = router;
