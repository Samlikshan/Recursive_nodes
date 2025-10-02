import { Response } from "express";
import { HttpStatusCodes } from "../../application/constants/HttpStatusCodes";

export const successResponse = (
  res: Response,
  data: unknown,
  message = "Success",
  statusCode = HttpStatusCodes.OK,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number,
  error?: unknown,
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: error || null,
  });
};
