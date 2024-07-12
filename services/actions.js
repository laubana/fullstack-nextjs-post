"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const { storePost, updatePostLikeStatus } = require("@services/posts");

const isEmpty = (text) => {
  return !text || text.trim() === "";
};

// TODO
// 169
// export const handlePost = async (_, formData) => {
export const handlePost = async (formData) => {
  const post = {
    title: formData.get("title"),
    content: formData.get("content"),
    image: formData.get("image"),
    userId: 1,
  };

  if (
    isEmpty(post.title) ||
    isEmpty(post.content) ||
    !post.image ||
    post.image.size === 0
  ) {
    return { status: "error", message: "Invalid Input" };
  }

  await storePost(post);
  revalidatePath("/feed", "page");
  redirect("/feed");
};

export const handleToggle = async (postId) => {
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/feed", "page");
};
