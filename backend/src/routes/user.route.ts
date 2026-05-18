import express from "express";
import { createUserController, deleteUserController, getSingleUserController, getUsersController, updateUserController } from "../controller/user.controller";



const router = express.Router();

router.post("/", createUserController);

router.get("/", getUsersController);

router.get("/:id", getSingleUserController);

router.put("/:id", updateUserController);

router.delete("/:id", deleteUserController);

export default router;