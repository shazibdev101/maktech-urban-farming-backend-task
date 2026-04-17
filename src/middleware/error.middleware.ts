import { Request, Response, NextFunction } from "express";

/**
 * Custom error class for API-related failures.
 */
export class ApiError extends Error {
  constructor(public statusCode: number, public message: string, public isOperational = true) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handling middleware.
 * Standardizes all 400/500 level errors into a clean JSON response.
 */
export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    // only show stack in development
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

/**
 * Utility to catch errors in asynchronous route handlers and pass them to errorMiddleware.
 * Eliminates the need for manual try/catch blocks in controllers.
 */
export const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
