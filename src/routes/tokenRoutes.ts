import { Router } from "express";
import { TokenController } from "../controllers/TokenController";

const tokenRoutes = Router();
const tokenController = new TokenController();

tokenRoutes.post("/authenticate-user", tokenController.store);

export { tokenRoutes };
