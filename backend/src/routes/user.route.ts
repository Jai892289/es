import express from "express";
import { createUserController, deleteUserController, getSingleUserController, getUsersByDepartment, getUsersController, updateUserController } from "../controller/user.controller";



const router = express.Router();

router.post("/", createUserController);

router.get("/", getUsersController);

router.get(
  "/department/:departmentId",
  getUsersByDepartment
);

router.get("/:id", getSingleUserController);

router.put("/:id", updateUserController);

router.delete("/:id", deleteUserController);

export default router;