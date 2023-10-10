import { Router } from "express";
import { UserControllers } from "../controllers/UserControllers";

const userRoutes = Router();
const userController = new UserControllers();

userRoutes.get("/get-users", userController.handleGetUsers);
userRoutes.get("/get-user&id=:id", userController.handleGetUserById);
userRoutes.post("/create-user", userController.handleCreateUser);
userRoutes.put("/update-user&user_id=:id", userController.handleUpdateUser);
userRoutes.delete("/delete-user&user_id=:id", userController.handleDeleteUser);

export { userRoutes };
