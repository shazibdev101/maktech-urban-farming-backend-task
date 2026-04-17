import { Router } from "express";
import * as ProduceController from "../controllers/produce.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

// Public routes
router.get("/", ProduceController.getAllProducts);
router.get("/:id", ProduceController.getProductDetails);

// Protected routes (Vendor only)
router.post("/", authMiddleware, roleMiddleware(["VENDOR"]), ProduceController.createProduct);
router.put("/:id", authMiddleware, roleMiddleware(["VENDOR"]), ProduceController.updateProduct);
router.delete("/:id", authMiddleware, roleMiddleware(["VENDOR"]), ProduceController.deleteProduct);

export default router;
