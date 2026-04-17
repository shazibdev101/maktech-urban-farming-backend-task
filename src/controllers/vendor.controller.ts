import { Request, Response } from "express";
import * as VendorService from "../services/vendor.service";
import { sendResponse, sendError } from "../utils/response";

/**
 * Retrieves the profile details for the currently logged-in vendor.
 */
export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const profile = await VendorService.getProfile(req.user!.id);
    return sendResponse(res, 200, "Vendor profile retrieved", profile);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};

/**
 * Updates the profile details for the currently logged-in vendor.
 */
export const updateMyProfile = async (req: Request, res: Response) => {
  try {
    const profile = await VendorService.updateProfile(req.user!.id, req.body);
    return sendResponse(res, 200, "Vendor profile updated", profile);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};

/**
 * Handles certification application requests from vendors.
 */
export const applyForCertification = async (req: Request, res: Response) => {
  try {
    // Need to find vendorId first
    const profile = await VendorService.getProfile(req.user!.id);
    if (!profile) return sendError(res, 404, "Vendor profile not found");

    const cert = await VendorService.createCertification(profile.id, req.body);
    return sendResponse(res, 201, "Certification application submitted", cert);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};
