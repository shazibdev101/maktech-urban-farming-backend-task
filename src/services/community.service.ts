import prisma from "../lib/prisma";

export const createPost = async (userId: string, content: string) => {
  return await prisma.communityPost.create({
    data: {
      userId,
      postContent: content,
    },
  });
};

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

export const addComment = async (userId: string, postId: string, content: string) => {
  return await prisma.comment.create({
    data: {
      userId,
      postId,
      content,
    },
  });
};
