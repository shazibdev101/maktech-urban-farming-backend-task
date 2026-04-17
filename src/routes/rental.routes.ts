import { Router } from "express";
import * as RentalController from "../controllers/rental.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

// Public routes
router.get("/", RentalController.getAllSpaces);
router.get("/:id", RentalController.getSpaceDetails);

// Protected routes (Vendor only)
router.post("/", authMiddleware, roleMiddleware(["VENDOR"]), RentalController.createRentalSpace);
router.put("/:id", authMiddleware, roleMiddleware(["VENDOR"]), RentalController.updateRentalSpace);
router.delete("/:id", authMiddleware, roleMiddleware(["VENDOR"]), RentalController.deleteRentalSpace);

export default router;
