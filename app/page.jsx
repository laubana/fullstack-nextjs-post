import { Suspense } from "react";
import Loader from "@components/Loader/Loader";
import Posts from "@components/Posts/Posts";
import { getPosts } from "@services/posts";

const LatestPosts = async () => {
  const latestPosts = await getPosts(2);

  return <Posts posts={latestPosts} />;
};

export default async () => {
  return (
    <>
      <h1>Welcome back!</h1>
      <p>Here's what you might've missed.</p>
      <section id="latest-posts">
        <Suspense fallback={<Loader />}>
          <LatestPosts />
        </Suspense>
      </section>
    </>
  );
};
