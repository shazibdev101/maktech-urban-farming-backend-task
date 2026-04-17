import { Request, Response } from "express";
import * as TrackingService from "../services/tracking.service";
import { sendResponse, sendError } from "../utils/response";

/**
 * Handles adding a new plant to a leased garden plot.
 */
export const addPlant = async (req: Request, res: Response) => {
  try {
    const { orderId, name, growthStage } = req.body;
    const plant = await TrackingService.addPlant(orderId, { name, growthStage });
    return sendResponse(res, 201, "Plant added to plot", plant);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};

/**
 * Handles updates to plant health or growth stages.
 */
export const updatePlant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const plant = await TrackingService.updatePlantHealth(id, req.user!.id, req.body);
    return sendResponse(res, 200, "Plant status updated", plant);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};

/**
 * Retrieves the comprehensive farming dashboard for a user.
 * Displays all leased plots and their current plant inventory.
 */
export const getDashboard = async (req: Request, res: Response) => {
  try {
    const data = await TrackingService.getDashboardData(req.user!.id);
    return sendResponse(res, 200, "Farming dashboard retrieved", data);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};
