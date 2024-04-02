import { Response } from "express";

type TMeta = {
  limit: number;
  page: number;
  total: number;
};

type TData<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data: T | null | undefined;
};

const sendResponse = <T>(res: Response, jsonData: TData<T>) => {
  res.status(jsonData.statusCode).json({
    success: jsonData.success,
    message: jsonData.message,
    meta: jsonData.meta || null || undefined,
    data: jsonData.data || null || undefined,
  });
};

export default sendResponse;
