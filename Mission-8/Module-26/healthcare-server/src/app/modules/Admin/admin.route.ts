const express = require("express");
const router = express.Router();
import { AdminControllers } from "./admin.controller";

router.get("/", AdminControllers.getAllFromDB);

export const AdminRoutes = router;
