"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { isEmpty } from "@helpers/string";

const { storePost, updatePostLikeStatus } = require("@services/posts");

export const handlePost = async (_, formData) => {
  const post = {
    title: formData.get("title"),
    content: formData.get("content"),
    image: formData.get("image"),
    authorName: formData.get("authorName"),
  };

  if (
    isEmpty(post.title) ||
    isEmpty(post.content) ||
    isEmpty(post.authorName) ||
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
  await updatePostLikeStatus(postId);
  revalidatePath("/feed", "page");
};
