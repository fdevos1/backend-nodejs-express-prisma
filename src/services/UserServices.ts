import { hash } from "bcrypt";
import { IUserData } from "../interfaces/userInterfaces";
import { prismaClient } from "../prisma/prismaClient";
import { ApiError, NotFoundError } from "../helpers/api-error";

export class UserService {
  async findAllUsers() {
    const users = await prismaClient.user.findMany({
      select: {
        email: true,
        name: true,
        id: true,
      },
    });

    return users;
  }

  async findUserById(id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: parseInt(id),
      },
      select: {
        email: true,
        name: true,
        id: true,
      },
    });

    return user;
  }

  async createNewUser({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
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
      select: {
        name: true,
        email: true,
        id: true,
        createdAt: true,
        password: false,
      },
    });

    return newUser;
  }

  async updateUser(id: number, data: Partial<IUserData>) {
    const user = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundError("Usuário não existe");
    }

    const updatedUser = await prismaClient.user.update({
      where: {
        id,
      },
      data,
      select: {
        updatedAt: true,
        name: true,
        email: true,
      },
    });

    return updatedUser;
  }

  async resetPassword(email: string, password: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundError("Usuário não existe");
    }
    const hashPassword = await hash(password, 8);

    const updatedUserPassword = await prismaClient.user.update({
      where: {
        email,
      },
      data: {
        password: hashPassword,
      },
    });

    return updatedUserPassword;
  }

  async deleteUser(id: string) {
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
