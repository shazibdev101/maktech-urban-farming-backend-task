import { Router } from "express";
import * as TrackingController from "../controllers/tracking.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/dashboard", TrackingController.getDashboard);
router.post("/plants", TrackingController.addPlant);
router.patch("/plants/:id", TrackingController.updatePlant);

export default router;
