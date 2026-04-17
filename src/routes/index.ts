import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/auth/me", authMiddleware, AuthController.getMe);

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API working ✅",
  });
});

export default router;