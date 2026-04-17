import prisma from "../lib/prisma";

/**
 * Creates a new post in the community forum.
 * @param userId - ID of the user creating the post.
 * @param content - Content text of the post.
 */
export const createPost = async (userId: string, content: string) => {
  return await prisma.communityPost.create({
    data: {
      userId,
      postContent: content,
    },
  });
};

/**
 * Retrieves all community posts including authors and nested comments.
 * Ordered by most recent.
 */
export const getAllPosts = async () => {
  return await prisma.communityPost.findMany({
    include: {
      user: {
        select: { name: true }
      },
      comments: {
        include: {
          user: { select: { name: true } }
        }
      }
    },
    orderBy: { postDate: "desc" },
  });
};

/**
 * Adds a comment to an existing forum post.
 * @param userId - ID of the user commenting.
 * @param postId - ID of the post being commented on.
 * @param content - Comment text.
 */
export const addComment = async (userId: string, postId: string, content: string) => {
  return await prisma.comment.create({
    data: {
      userId,
      postId,
      content,
    },
  });
};
