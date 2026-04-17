import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import { sendResponse, sendError } from "../utils/response";

export const register = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.registerUser(req.body);
    return sendResponse(res, 201, "User registered successfully", result);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginUser(req.body);
    return sendResponse(res, 200, "Login successful", result);
  } catch (error: any) {
    return sendError(res, 401, error.message);
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    // req.user is populated by authMiddleware
    return sendResponse(res, 200, "User profile retrieved", req.user);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};
