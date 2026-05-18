"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const router = express_1.default.Router();
router.post("/", user_controller_1.createUserController);
router.get("/", user_controller_1.getUsersController);
router.get("/:id", user_controller_1.getSingleUserController);
router.put("/:id", user_controller_1.updateUserController);
router.delete("/:id", user_controller_1.deleteUserController);
exports.default = router;
