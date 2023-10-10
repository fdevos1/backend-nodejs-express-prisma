import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { tokenRoutes } from "./tokenRoutes";

const router = Router();

router.use("/user", userRoutes);
router.use("/token", tokenRoutes);

export { router };
