import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { ReviewControllers } from "./review.controller";
const router = Router();

router.get("/", checkAuth(UserRole.SUPER_ADMIN, UserRole.ADMIN), ReviewControllers.getAllReviews);
router.post("/", checkAuth(UserRole.PATIENT), ReviewControllers.createReview);

export const ReviewRoutes = router;
