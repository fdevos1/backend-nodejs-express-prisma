import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-error";

export const errorHandler = (
  error: Partial<ApiError> & Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Internal Server Error";
  return res.status(statusCode).json({
    message,
  });
};
