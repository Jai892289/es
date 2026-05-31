import express from "express";

import {
  createInspectionController,
  getAllInspectionsController,
  getInspectionByIdController,
  getUpcomingRemindersController,
  updateInspectionController,
  updateInspectionStatusController,
  deleteInspectionController,
  create,
  getAll,
  getById,
  getDashboard,
  approveReport,
  rejectReport
} from "../controller/inspection.controller"

const router = express.Router();

// CREATE
router.post(
  "/",
  createInspectionController
);

// GET ALL
router.get(
  "/",
  getAllInspectionsController
);

// UPCOMING REMINDERS
router.get(
  "/reminders",
  getUpcomingRemindersController
);


router.post("/report", create);

router.get("/report", getAll);

import { Router } from "express";


router.get("/approval", getDashboard);

router.put(
  "/approval/:id/approve",
  approveReport
);

router.put(
  "/approval/:id/reject",
  rejectReport
);

// router.put("/approval/:id", approveReport);


router.get("/report/:id", getById);



// GET SINGLE
router.get(
  "/:id",
  getInspectionByIdController
);

// UPDATE FULL
router.put(
  "/:id",
  updateInspectionController
);

// UPDATE STATUS
router.patch(
  "/:id/status",
  updateInspectionStatusController
);

// DELETE
router.delete(
  "/:id",
  deleteInspectionController
);



export default router;