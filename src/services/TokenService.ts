import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { NotFoundError, UnauthorizedError } from "../helpers/api-error";
import { prismaClient } from "../prisma/prismaClient";

export class TokenService {
  async handleToken({ email, password }: { email: string; password: string }) {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundError("Usuário não existe");
    }

    const passwordMatch = compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedError("Credenciais inválidas");
    }

    const { id } = user;

    const token = sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return token;
  }
}
