import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createComplaintController, getComplaintController } from "../controller/complaint.controller";

const router = Router();

router.post("/", authMiddleware, createComplaintController);
router.get("/", authMiddleware, getComplaintController);

export default router;