import "express-async-errors";
import express from "express";
import cors from "cors";

import { router } from "./routes";
import { errorHandler } from "./middlewares/error";

const app = express();

const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(port, () => console.log(`servidor rodando na porta ${port}`));
