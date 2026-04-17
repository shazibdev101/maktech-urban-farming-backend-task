import { Request, Response } from "express";
import * as OrderService from "../services/order.service";
import * as VendorService from "../services/vendor.service";
import { sendResponse, sendError } from "../utils/response";

/**
 * Handles order placement and rental space booking requests.
 */
export const placeOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrderService.createOrder(req.user!.id, req.body);
    return sendResponse(res, 201, "Order placed successfully", order);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};

/**
 * Retrieves order history for the currently logged-in customer.
 */
export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderService.getUserOrders(req.user!.id, req.query);
    return sendResponse(res, 200, "User orders retrieved", orders);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};

/**
 * Retrieves orders received by the currently logged-in vendor.
 */
export const getVendorOrders = async (req: Request, res: Response) => {
  try {
    const profile = await VendorService.getProfile(req.user!.id);
    if (!profile) return sendError(res, 404, "Vendor profile not found");

    const orders = await OrderService.getVendorOrders(profile.id, req.query);
    return sendResponse(res, 200, "Vendor orders retrieved", orders);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};

/**
 * Updates the status of an order (Vendor-only action).
 */
export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { status } = req.body;

    const profile = await VendorService.getProfile(req.user!.id);
    if (!profile) return sendError(res, 404, "Vendor profile not found");

    const order = await OrderService.updateOrderStatus(id, profile.id, status);
    return sendResponse(res, 200, "Order status updated", order);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};
