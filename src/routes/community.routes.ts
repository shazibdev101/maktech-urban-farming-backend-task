import { Router } from "express";
import * as CommunityController from "../controllers/community.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.get("/", CommunityController.getFeed);

// Protected routes
router.post("/", authMiddleware, CommunityController.createPost);
router.post("/:id/comments", authMiddleware, CommunityController.commentOnPost);

export default router;
