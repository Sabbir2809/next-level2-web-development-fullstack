import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (controllerFn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
