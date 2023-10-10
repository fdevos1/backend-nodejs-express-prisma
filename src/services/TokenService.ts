import { compare } from "bcrypt";
import { NotFoundError, UnauthorizedError } from "../helpers/api-error";
import { prismaClient } from "../prisma/prismaClient";

export class TokenService {
  async handleToken({ email, password }) {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundError("Usuário não existe");
    }

    const validPassword = compare(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedError("Credenciais inválidas");
    }
  }
}
