import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createInventoryController, getInventoryController, getInventoryControllerbyId } from "../controller/inventory.controller";

const router = Router();

router.post("/", authMiddleware, createInventoryController);
router.get("/", authMiddleware, getInventoryController);
router.get("/:id", authMiddleware, getInventoryControllerbyId);

export default router;