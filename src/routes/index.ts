import { Router } from "express";
import authRoutes from "./auth.routes";
import vendorRoutes from "./vendor.routes";
import certificationRoutes from "./certification.routes";
import produceRoutes from "./produce.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/vendors", vendorRoutes);
router.use("/certifications", certificationRoutes);
router.use("/produce", produceRoutes);

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API working ✅",
  });
});

export default router;