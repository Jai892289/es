import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createVendorController, getVendorbyIdController, getVendorController } from "../controller/vendor.controller";

const router = Router();

router.post("/", authMiddleware, createVendorController);
router.get("/", authMiddleware, getVendorController);
router.get("/:id", authMiddleware, getVendorbyIdController);

export default router;


