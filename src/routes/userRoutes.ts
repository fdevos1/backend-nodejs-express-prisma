import { Router } from "express";
import { UserControllers } from "../controllers/UserControllers";
import authenticateUser from "../middlewares/authenticateUser";

const userRoutes = Router();
const userController = new UserControllers();

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
userRoutes.put(
  "/update-user",
  authenticateUser,
  userController.handleUpdateUser
);
userRoutes.delete(
  "/delete-user",
  authenticateUser,
  userController.handleDeleteUser
);

export { userRoutes };
