import { Response } from "express";

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = null
) => {
  const response: ApiResponse = {
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  error: any = null
) => {
  const response: ApiResponse = {
    success: false,
    message,
    error,
  };
  return res.status(statusCode).json(response);
};
