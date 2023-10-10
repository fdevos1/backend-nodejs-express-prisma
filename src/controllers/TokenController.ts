import { UnauthorizedError } from "../helpers/api-error";
import { TokenService } from "../services/TokenService";

export class TokenController {
  async store(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new UnauthorizedError("Credenciais inválidas");
    }

    const service = new TokenService();

    const token = await service.handleToken({ email, password });

    return res.json({ token }).status(200);
  }
}
