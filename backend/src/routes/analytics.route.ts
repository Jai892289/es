import express from "express";
import { getAnalyticsController } from "../controller/analytics.controller";


const router = express.Router();

router.get(
  "/",
  getAnalyticsController
);

export default router;