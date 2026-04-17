import { Request, Response } from "express";
import * as ProduceService from "../services/produce.service";
import * as VendorService from "../services/vendor.service";
import { sendResponse, sendError } from "../utils/response";

/**
 * Handles product creation for vendors.
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const profile = await VendorService.getProfile(req.user!.id);
    if (!profile) return sendError(res, 404, "Vendor profile not found");

    const product = await ProduceService.createProduce(profile.id, req.body);
    return sendResponse(res, 201, "Product created successfully", product);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};

/**
 * Retrieves all marketplace products with filtering and pagination.
 */
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProduceService.getAllProduce(req.query);
    return sendResponse(res, 200, "Products retrieved successfully", products);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};

/**
 * Retrieves detailed information for a specific product.
 */
export const getProductDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const product = await ProduceService.getProduceById(id);
    if (!product) return sendError(res, 404, "Product not found");
    return sendResponse(res, 200, "Product details retrieved", product);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};

/**
 * Handles product update requests for vendors.
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const profile = await VendorService.getProfile(req.user!.id);
    if (!profile) return sendError(res, 404, "Vendor profile not found");

    const product = await ProduceService.updateProduce(id, profile.id, req.body);
    return sendResponse(res, 200, "Product updated successfully", product);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};

/**
 * Handles product deletion requests for vendors.
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const profile = await VendorService.getProfile(req.user!.id);
    if (!profile) return sendError(res, 404, "Vendor profile not found");

    await ProduceService.deleteProduce(id, profile.id);
    return sendResponse(res, 200, "Product deleted successfully");
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};
