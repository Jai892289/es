"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const complaint_controller_1 = require("../controller/complaint.controller");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authMiddleware, complaint_controller_1.createComplaintController);
router.post("/", auth_middleware_1.authMiddleware, complaint_controller_1.getComplaintController);
exports.default = router;
