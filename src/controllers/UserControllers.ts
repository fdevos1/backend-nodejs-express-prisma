import { Request, Response } from "express";
import { UserService } from "../services/UserServices";

export class UserControllers {
  async handleGetUsers(req: Request, res: Response) {
    const service = new UserService();

    const getUsers = await service.getUsersService();

    return res.json(getUsers).status(200);
  }

  async handleGetUserById(req: Request, res: Response) {
    const { id } = req.params;

    const service = new UserService();

    const getById = service.getUserByIdService({ id });

    return res.json(getById).status(200);
  }

  async handleCreateUser(req: Request, res: Response) {
    const { email, name, password } = req.body;
    const service = new UserService();

    const createUserService = await service.createUserService({
      email,
      name,
      password,
    });

    return res.status(201).json(createUserService);
  }

  async handleUpdateUser(req: Request, res: Response) {
    const { id } = req.params;
    const updatedData = req.body;

    const service = new UserService();

    const updateUserService = await service.updateUserService(id, updatedData);

    return res.json(updateUserService).status(204);
  }

  async handleDeleteUser(req: Request, res: Response) {
    const { id } = req.params;

    const service = new UserService();

    const deleteUserService = await service.deleteUserService(id);

    return res.json(deleteUserService).status(202);
  }
}
