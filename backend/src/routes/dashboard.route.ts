import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { getDashboardAnalyticsController, getReportsSummaryController } from "../controller/dashboard.controller";



const router = Router();

router.get(
  "/analytics",
  authMiddleware,
  getDashboardAnalyticsController
);

router.get(
  "/summary",
  authMiddleware,
  getReportsSummaryController
);


export default router;