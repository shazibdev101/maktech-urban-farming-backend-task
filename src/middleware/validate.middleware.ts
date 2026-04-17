import { Request, Response, NextFunction } from "express";
import { ZodTypeAny, ZodError } from "zod";
import { sendError } from "../utils/response";

/**
 * Request validation middleware using Zod.
 * Validates req.body, req.query, and req.params against the provided schema.
 * @param schema - Zod schema object.
 */
export const validate = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendError(res, 400, "Validation Error", error.issues);
      }
      next(error);
    }
  };
};
