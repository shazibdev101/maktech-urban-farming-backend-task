import { Request, Response } from "express";
import * as CommunityService from "../services/community.service";
import { sendResponse, sendError } from "../utils/response";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const post = await CommunityService.createPost(req.user!.id, content);
    return sendResponse(res, 201, "Post created successfully", post);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};

export const getFeed = async (req: Request, res: Response) => {
  try {
    const posts = await CommunityService.getAllPosts();
    return sendResponse(res, 200, "Community feed retrieved", posts);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};

export const commentOnPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string }; // postId
    const { content } = req.body;
    const comment = await CommunityService.addComment(req.user!.id, id, content);
    return sendResponse(res, 201, "Comment added", comment);
  } catch (error: any) {
    return sendError(res, 400, error.message);
  }
};
