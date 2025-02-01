import { connect } from "@configs/db";
import { uploadImage } from "@helpers/s3";
import Post from "@models/Post";

export async function getPosts(number) {
  await connect();

  const existingPosts = await Post.find().limit(number).lean();

  return existingPosts.map((existingPost) => ({
    ...existingPost,
    _id: existingPost._id.toString(),
  }));
}

export async function storePost(post) {
  await connect();

  const imageUrl = await uploadImage(post.image);

  post.imageUrl = imageUrl;

  const newPost = await Post.create(post);

  return newPost;
}

export async function updatePostLikeStatus(postId) {
  await connect();

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    [{ $set: { isLiked: { $not: "$isLiked" } } }],
    { new: true }
  );

  return updatedPost;
}
