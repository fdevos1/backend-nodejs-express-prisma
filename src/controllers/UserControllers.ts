import { NotFoundError } from "../helpers/api-error";
import { UserService } from "../services/UserServices";

export class UserControllers {
  async handleFindAllUsers(req, res) {
    const service = new UserService();

    const getUsers = await service.findAllUsers();

    return res.status(200).json(getUsers);
  }

  async handleFindUserById(req, res) {
    const { id } = req.params;

    const service = new UserService();

    const getById = await service.findUserById(id);

    return res.status(200).json(getById);
  }

  async handleCreateNewUser(req, res) {
    const { email, name, password } = req.body;
    const service = new UserService();

    const createUserService = await service.createNewUser({
      email,
      name,
      password,
    });

    return res.status(201).json(createUserService);
  }

  async handleUpdateUser(req, res) {
    const id = req.userId;

    if (!id) {
      throw new NotFoundError("ID não enviado");
    }

    const updatedData = req.body;

    const service = new UserService();

    const updateUserService = await service.updateUser(id, updatedData);

    return res.json(updateUserService).status(204);
  }

  async handleDeleteUser(req, res) {
    const id = req.userId;

    const service = new UserService();

    const deleteUserService = await service.deleteUser(id);

    return res.status(202).json(deleteUserService);
  }
}
