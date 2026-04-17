import { Router } from "express";
import * as OrderController from "../controllers/order.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

router.use(authMiddleware);

// Customer routes
router.post("/", OrderController.placeOrder);
router.get("/my-orders", OrderController.getMyOrders);

// Vendor routes
router.get("/vendor-orders", roleMiddleware(["VENDOR"]), OrderController.getVendorOrders);
router.patch("/:id/status", roleMiddleware(["VENDOR"]), OrderController.updateStatus);

export default router;
