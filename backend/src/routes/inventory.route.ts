import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { approveAssetTransferController, createAssetMappingController, createAssetReplacementController, createAssetTransferController, createInventoryController, createProductCategoryController, distributeAssetController, getAssetDistributionsController, getAssetReplacementsController, getAssetStatusAnalyticsController, getAssetTransfersController, getDepartmentWiseAssetMappingsController, getInventoryController, getInventoryControllerbyId, getProductCategoryController, getProductStockController, getUserWiseAssetMappingsController } from "../controller/inventory.controller";

const router = Router();

router.post("/create-category", authMiddleware, createProductCategoryController);
router.get("/category",authMiddleware, getProductCategoryController);

router.get(
  "/asset-status",
  authMiddleware,
  getAssetStatusAnalyticsController
);

// CREATE TRANSFER
router.post(
  "/transfers",
  authMiddleware,
  createAssetTransferController
);


// GET TRANSFERS
router.get(
  "/transfers",
  authMiddleware,
  getAssetTransfersController
);


// APPROVE TRANSFER
router.patch(
  "/transfers/:id/approve",
  authMiddleware,
  approveAssetTransferController
);


// CREATE MAPPING
router.post(
  "/mappings",
  authMiddleware,
  createAssetMappingController
);


// USER-WISE MAPPING
router.get(
  "/mappings/users",
  authMiddleware,
  getUserWiseAssetMappingsController
);


// DEPARTMENT-WISE MAPPING
router.get(
  "/mappings/departments",
  authMiddleware,
  getDepartmentWiseAssetMappingsController
);

// CREATE REPLACEMENT
router.post(
  "/replacements",
  authMiddleware,
  createAssetReplacementController
);


// GET REPLACEMENTS
router.get(
  "/replacements",
  authMiddleware,
  getAssetReplacementsController
);

router.post("/", authMiddleware, createInventoryController);
router.get("/", authMiddleware, getInventoryController);


router.post(
  "/distribution",
  authMiddleware,
  distributeAssetController
);

router.get(
  "/distribution",
  authMiddleware,
  getAssetDistributionsController
);

router.get(
  "/stock/:productId",
  authMiddleware,
  getProductStockController
);


router.get("/:id", authMiddleware, getInventoryControllerbyId);




export default router;