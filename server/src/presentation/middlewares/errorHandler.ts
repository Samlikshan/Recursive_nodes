import { Request, Response, NextFunction } from "express";
import { errorResponse } from "./responseHandler";
import { AppError } from "../../application/errors/AppError";
import { HttpStatusCodes } from "../../application/constants/HttpStatusCodes";

export const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return errorResponse(res, err.message, err.statusCode);
  }

  console.error("Unexpected Error:", err);
  return errorResponse(
    res,
    "Internal Server Error",
    HttpStatusCodes.INTERNAL_SERVER_ERROR,
  );
};
