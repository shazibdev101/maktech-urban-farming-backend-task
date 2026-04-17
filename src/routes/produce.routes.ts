import { Router } from "express";
import * as ProduceController from "../controllers/produce.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { validate } from "../middleware/validate.middleware";
import { createProduceSchema } from "../validations/produce.validation";

const router = Router();

// Public routes
router.get("/", ProduceController.getAllProducts);
router.get("/:id", ProduceController.getProductDetails);

// Protected routes (Vendor only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["VENDOR"]),
  validate(createProduceSchema),
  ProduceController.createProduct
);
router.put("/:id", authMiddleware, roleMiddleware(["VENDOR"]), ProduceController.updateProduct);
router.delete("/:id", authMiddleware, roleMiddleware(["VENDOR"]), ProduceController.deleteProduct);

export default router;
