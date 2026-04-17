import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/test", (req, res) => res.json({ message: "auth routes working" }));

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", authMiddleware, AuthController.getMe);

export default router;
