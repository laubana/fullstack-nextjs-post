import dbConfig from "@configs/dbConfig";
import { uploadImage } from "@helpers/s3";
import Post from "@models/Post";

export async function getPosts(number) {
  await dbConfig.connect();

  const existingPosts = await Post.find().limit(number).lean();

  return JSON.parse(JSON.stringify(existingPosts));
}

export async function storePost(post) {
  await dbConfig.connect();

  const imageUrl = await uploadImage(post.image);

  post.imageUrl = imageUrl;

  const newPost = await Post.create(post);

  return newPost;
}

export async function updatePostLikeStatus(postId) {
  await dbConfig.connect();

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    [{ $set: { isLiked: { $not: "$isLiked" } } }],
    { new: true }
  ).lean();

  return updatedPost;
}
