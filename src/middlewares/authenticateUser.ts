import { verify } from "jsonwebtoken";

import { UnauthorizedError } from "../helpers/api-error";
import { prismaClient } from "../prisma/prismaClient";
import { IJwtPayload } from "../interfaces/tokenInterfaces";

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Login necessário");
  }

  const [text, token] = authorization.split(" ");

  try {
    const data = verify(token, process.env.TOKEN_SECRET) as IJwtPayload;

    const { id, email } = data;

    const user = await prismaClient.user.findFirst({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedError("Usuário inválido");
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    throw new UnauthorizedError("Token expirado ou inválido");
  }
};
