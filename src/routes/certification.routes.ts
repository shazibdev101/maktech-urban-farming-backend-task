import { Router } from "express";
import * as CertificationController from "../controllers/certification.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

router.use(authMiddleware);

// Only ADMIN can approve/reject certifications
router.patch("/:id/approve", roleMiddleware(["ADMIN"]), CertificationController.approveCertification);

export default router;
