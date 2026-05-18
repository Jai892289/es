"use strict";
// routes/project.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = require("../controller/project.controller");
const router = (0, express_1.Router)();
router.post("/", project_controller_1.createProjectController);
router.get("/", project_controller_1.getProjectsController);
router.get("/:id", project_controller_1.getProjectByIdController);
exports.default = router;
