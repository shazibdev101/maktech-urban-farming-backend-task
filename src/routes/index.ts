import { Router } from "express";
import authRoutes from "./auth.routes";
import vendorRoutes from "./vendor.routes";
import certificationRoutes from "./certification.routes";
import produceRoutes from "./produce.routes";
import rentalRoutes from "./rental.routes";
import orderRoutes from "./order.routes";
import communityRoutes from "./community.routes";
import trackingRoutes from "./tracking.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/vendors", vendorRoutes);
router.use("/certifications", certificationRoutes);
router.use("/produce", produceRoutes);
router.use("/rental", rentalRoutes);
router.use("/orders", orderRoutes);
router.use("/community", communityRoutes);
router.use("/tracking", trackingRoutes);

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API working ✅",
  });
});

export default router;