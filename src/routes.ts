import { Router } from "express";
import { userRoutes } from "./routes/userRoutes";
import { tokenRoutes } from "./routes/tokenRoutes";

const router = Router();

router.use("/user", userRoutes);
router.use("/token", tokenRoutes);

export { router };
