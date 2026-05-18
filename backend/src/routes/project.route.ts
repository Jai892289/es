// routes/project.routes.ts

import { Router } from "express";
import { createProjectController, getProjectByIdController, getProjectsController } from "../controller/project.controller";



const router = Router();

router.post("/", createProjectController);

router.get("/", getProjectsController);

router.get("/:id", getProjectByIdController);

export default router;