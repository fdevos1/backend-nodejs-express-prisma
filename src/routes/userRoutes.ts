import { Router } from "express";

import { UserControllers } from "../controllers/UserControllers";
import { SendRecoveryPass } from "../controllers/SendRecoveryPassController";

import authenticateUser from "../middlewares/authenticateUser";

const userRoutes = Router();
const userController = new UserControllers();
const recoveryPassController = new SendRecoveryPass();

userRoutes.get(
  "/get-users",
  authenticateUser,
  userController.handleFindAllUsers
);

userRoutes.get(
  "/get-user&id=:id",
  authenticateUser,
  userController.handleFindUserById
);

userRoutes.post("/create-user", userController.handleCreateNewUser);
userRoutes.post("/reset-password", recoveryPassController.handle);

userRoutes.put(
  "/update-user",
  authenticateUser,
  userController.handleUpdateUser
);

userRoutes.put("/reset-password", userController.handleResetPassword);

userRoutes.delete(
  "/delete-user",
  authenticateUser,
  userController.handleDeleteUser
);

export { userRoutes };
