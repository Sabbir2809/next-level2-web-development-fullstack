import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import ApiError from "../errors/ApiError";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleValidationError from "../errors/handleValidationError";
import handleZodError from "../errors/handleZodError";
import { TErrorResponse } from "../types/error";

// global Error Handler
const globalErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // default object
  const errorResponse: TErrorResponse = {
    statusCode: error.statusCode || 500,
    message: error.message || "Internal Server Error",
    error: error,
  };

  // ZodError
  if (error instanceof ZodError) {
    const zodError = handleZodError(error);
    errorResponse.statusCode = zodError.statusCode;
    errorResponse.message = zodError.message;
    errorResponse.error = zodError.error;
  }

  // ValidationError
  else if (error instanceof PrismaClientValidationError) {
    const validationError = handleValidationError(error);
    errorResponse.statusCode = validationError.statusCode;
    errorResponse.message = validationError.message;
    errorResponse.error = validationError.error;
  }

  // DuplicateError
  else if (error instanceof PrismaClientKnownRequestError) {
    const duplicateError = handleDuplicateError(error);
    errorResponse.statusCode = duplicateError.statusCode;
    errorResponse.message = duplicateError.message;
    errorResponse.error = duplicateError.error;
  }

  // ApiError
  else if (error instanceof ApiError) {
    errorResponse.statusCode = error.statusCode;
    errorResponse.message = error.message;
    errorResponse.error = error;
  }

  // response error
  return res.status(errorResponse.statusCode).json({
    success: false,
    message: errorResponse.message,
    error: errorResponse.error,
  });
};

export default globalErrorHandler;
