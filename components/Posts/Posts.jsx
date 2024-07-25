"use client";

import Image from "next/image";
import { Like, Unlike } from "@components/Icon";
import { handleToggle } from "@services/actions";
import { formatDate } from "@services/format";

const imageLoader = (config) => {
  return config.src;
};

// TODO
// 179
// const Post = ({ post, onToggle }) => {
const Post = ({ post }) => {
  return (
    <article className="post">
      <div className="post-image">
        <Image
          src={post.image}
          loader={imageLoader}
          fill
          unoptimized
          sizes="10vw"
          alt={post.title}
          quality={100}
        />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form action={handleToggle.bind(null, post.id)}>
              <button className="button transparent">
                {post.isLiked ? <Unlike /> : <Like />}
              </button>
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
};

export default ({ posts }) => {
  // TODO
  // 179
  // const [state, action] = useOptimistic(posts, (oldValues, postId) =>
  //   oldValues.filter((oldValue) => {
  //     if (oldValue.id === postId) {
  //       if (oldValue.isLiked) {
  //         return { ...oldValue, isLiked: false, likes: oldValue.likes - 1 };
  //       } else {
  //         return { ...oldValue, isLiked: true, likes: oldValue.likes + 1 };
  //       }
  //     } else {
  //       return oldValue;
  //     }
  //   })
  // );

  // const handleToogle = async (postId) => {
  //   action(postId);
  //   handleToggle(postId);
  // };

  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
};
