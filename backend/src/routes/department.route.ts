import express from "express";
import { createDepartmentController, deleteDepartmentController, getDepartmentsController, getDepartmentStatsController, getSingleDepartmentController, updateDepartmentController } from "../controller/department.controller";


const router = express.Router();

router.post(
  "/",
  createDepartmentController
);

router.get(
  "/",
  getDepartmentsController
);

router.get(
  "/stats",
  getDepartmentStatsController
);

router.get(
  "/:id",
  getSingleDepartmentController
);

router.put(
  "/:id",
  updateDepartmentController
);

router.delete(
  "/:id",
  deleteDepartmentController
);

export default router;