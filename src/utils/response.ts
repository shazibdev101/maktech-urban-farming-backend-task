import { Response } from "express";

/**
 * Interface representing the standard API response structure.
 */
interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

/**
 * Sends a standardized success or generic response.
 * @param res - Express Response object.
 * @param statusCode - HTTP status code.
 * @param message - Human-readable message.
 * @param data - Payload to return.
 */
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

/**
 * Sends a standardized error response.
 * @param res - Express Response object.
 * @param statusCode - HTTP status code.
 * @param message - Human-readable error message.
 * @param error - Detailed error payload (e.g., validation issues).
 */
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
