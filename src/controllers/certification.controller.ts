import { Request, Response } from "express";
import * as VendorService from "../services/vendor.service";
import { sendResponse, sendError } from "../utils/response";

/**
 * Handles certification approval or rejection (Admin-only action).
 */
export const approveCertification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { status } = req.body; // APPROVED or REJECTED

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return sendError(res, 400, "Invalid status. Must be APPROVED or REJECTED");
    }

    const cert = await VendorService.approveCertification(id, status as "APPROVED" | "REJECTED");
    return sendResponse(res, 200, `Certification ${status.toLowerCase()} successfully`, cert);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};
