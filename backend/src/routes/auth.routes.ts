import { Router } from "express";
import { activateUserController, deactivateUserController, login, register, updateUserController } from "../controller/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.patch(
  "/:id/deactivate",
  deactivateUserController
);

router.patch(
  "/:id/activate",
  activateUserController
);

router.put(
  "/:id",
  updateUserController
);



export default router;