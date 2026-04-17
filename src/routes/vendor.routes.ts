import { Router } from "express";
import * as VendorController from "../controllers/vendor.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

// Protect all vendor routes
router.use(authMiddleware);

router.get("/profile", roleMiddleware(["VENDOR"]), VendorController.getMyProfile);
router.put("/profile", roleMiddleware(["VENDOR"]), VendorController.updateMyProfile);
router.post("/certifications", roleMiddleware(["VENDOR"]), VendorController.applyForCertification);

export default router;
