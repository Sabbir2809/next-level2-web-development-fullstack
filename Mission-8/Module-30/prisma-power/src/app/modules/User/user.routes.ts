import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

router.post("/", UserControllers.createUser);
router.get("/", UserControllers.getAllUsers);
router.get("/:userId", UserControllers.getSingleUser);
router.patch("/:userId", UserControllers.updateUser);

export const UserRoutes = router;
