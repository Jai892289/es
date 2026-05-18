"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inspection_controller_1 = require("../controller/inspection.controller");
const router = express_1.default.Router();
// CREATE
router.post("/", inspection_controller_1.createInspectionController);
// GET ALL
router.get("/", inspection_controller_1.getAllInspectionsController);
// UPCOMING REMINDERS
router.get("/reminders", inspection_controller_1.getUpcomingRemindersController);
router.post("/report", inspection_controller_1.create);
router.get("/report", inspection_controller_1.getAll);
router.get("/approval", inspection_controller_1.getDashboard);
router.put("/approval/:id", inspection_controller_1.approveReport);
router.get("/report/:id", inspection_controller_1.getById);
// GET SINGLE
router.get("/:id", inspection_controller_1.getInspectionByIdController);
// UPDATE FULL
router.put("/:id", inspection_controller_1.updateInspectionController);
// UPDATE STATUS
router.patch("/:id/status", inspection_controller_1.updateInspectionStatusController);
// DELETE
router.delete("/:id", inspection_controller_1.deleteInspectionController);
exports.default = router;
