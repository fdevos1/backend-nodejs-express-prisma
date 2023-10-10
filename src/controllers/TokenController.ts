import "express-async-errors";
import { Request, Response } from "express";

import { UnauthorizedError } from "../helpers/api-error";
import { TokenService } from "../services/TokenService";

export class TokenController {
  async store(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new UnauthorizedError("Credenciais inválidas");
    }

    const service = new TokenService();

    const verifyUser = await service.handleToken({ email, password });

    return res.json("OK");
  }
}
