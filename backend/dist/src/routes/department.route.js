"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const department_controller_1 = require("../controller/department.controller");
const router = express_1.default.Router();
router.post("/", department_controller_1.createDepartmentController);
router.get("/", department_controller_1.getDepartmentsController);
router.get("/stats", department_controller_1.getDepartmentStatsController);
router.get("/:id", department_controller_1.getSingleDepartmentController);
router.put("/:id", department_controller_1.updateDepartmentController);
router.delete("/:id", department_controller_1.deleteDepartmentController);
exports.default = router;
