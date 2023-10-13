import { compare } from "bcrypt";
import { NotFoundError, UnauthorizedError } from "../helpers/api-error";
import { prismaClient } from "../prisma/prismaClient";
import { TokenService } from "../services/TokenService";

export class TokenController {
  async store(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new UnauthorizedError("Credenciais inválidas");
    }

    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundError("Usuário não existe");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedError("Credenciais inválidas");
    }

    const service = new TokenService();

    const token = await service.handleToken({ email });

    return res.json({ token }).status(200);
  }
}
