import { Request, Response } from "express";
import * as RentalService from "../services/rental.service";
import * as VendorService from "../services/vendor.service";
import { sendResponse, sendError } from "../utils/response";

/**
 * Handles creation of new garden rental space listings.
 */
export const createRentalSpace = async (req: Request, res: Response) => {
  try {
    const profile = await VendorService.getProfile(req.user!.id);
    if (!profile) return sendError(res, 404, "Vendor profile not found");

    const space = await RentalService.createSpace(profile.id, req.body);
    return sendResponse(res, 201, "Rental space created successfully", space);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};

/**
 * Retrieves all available garden rental spaces with optional filtering.
 */
export const getAllSpaces = async (req: Request, res: Response) => {
  try {
    const spaces = await RentalService.getSpaces(req.query);
    return sendResponse(res, 200, "Rental spaces retrieved", spaces);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};

/**
 * Retrieves information for a specific rental space.
 */
export const getSpaceDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const space = await RentalService.getSpaceById(id);
    if (!space) return sendError(res, 404, "Rental space not found");
    return sendResponse(res, 200, "Rental space details retrieved", space);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};

/**
 * Handles update requests for existing rental spaces.
 */
export const updateRentalSpace = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const profile = await VendorService.getProfile(req.user!.id);
    if (!profile) return sendError(res, 404, "Vendor profile not found");

    const space = await RentalService.updateSpace(id, profile.id, req.body);
    return sendResponse(res, 200, "Rental space updated", space);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};

/**
 * Handles deletion requests for rental spaces.
 */
export const deleteRentalSpace = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const profile = await VendorService.getProfile(req.user!.id);
    if (!profile) return sendError(res, 404, "Vendor profile not found");

    await RentalService.deleteSpace(id, profile.id);
    return sendResponse(res, 200, "Rental space deleted");
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};
