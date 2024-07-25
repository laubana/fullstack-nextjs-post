import Posts from "@components/Posts/Posts";
import { getPosts } from "@services/posts";

export const generateMetadata = async () => {
  const posts = await getPosts();

  return {
    title: `${posts.length} Posts`,
  };
};

export default async () => {
  const posts = await getPosts();

  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
};
