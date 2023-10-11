import { sign } from "jsonwebtoken";

import { prismaClient } from "../prisma/prismaClient";

export class TokenService {
  async handleToken({ email }: { email: string }) {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
      select: {
        email: true,
        name: true,
        id: true,
      },
    });

    const { id } = user;

    const token = sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return { token, user };
  }
}
