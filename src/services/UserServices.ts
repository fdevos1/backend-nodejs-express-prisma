import { hash } from "bcrypt";
import { IUpdatedUser } from "../interfaces/UserInterfaces";
import { prismaClient } from "../prisma/prismaClient";
import { ApiError, NotFoundError } from "../helpers/api-error";

export class UserService {
  async getUsersService() {
    const users = await prismaClient.user.findMany();

    return users;
  }

  async getUserByIdService({ id }) {
    const user = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }

  async createUserService({ name, email, password }) {
    const hashPassword = await hash(password, 8);

    const userAlreadyExist = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExist) {
      throw new ApiError("Usuário já existe", 409);
    }

    const newUser = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    return newUser;
  }

  async updateUserService(id: string, data: IUpdatedUser) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      throw new NotFoundError("Usuário não existe");
    }

    const updatedUser = await prismaClient.user.update({
      where: {
        id: parseInt(id),
      },
      data,
    });

    return updatedUser;
  }

  async deleteUserService(id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      throw new NotFoundError("Usuário não existe");
    }

    const deletedUser = await prismaClient.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    return deletedUser;
  }
}
