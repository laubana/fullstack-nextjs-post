"use client";

import Image from "next/image";
import { useOptimistic } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { formatDate } from "@helpers/format";
import { handleToggle } from "@services/actions";

const imageLoader = (config) => {
  return config.src;
};

const Post = ({ post, onToggle }) => {
  return (
    <article className="post">
      <div className="post-image">
        <Image
          src={post.imageUrl}
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
              Shared by {post.authorName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form action={onToggle.bind(null, post._id)}>
              <button className="button transparent">
                {post.isLiked ? (
                  <FaHeart size={24} color="#e32195" cursor="pointer" />
                ) : (
                  <FaRegHeart size={24} color="#e32195" cursor="pointer" />
                )}
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
  const [optimizedPosts, action] = useOptimistic(posts, (oldValues, postId) =>
    oldValues.filter((oldValue) => {
      if (oldValue.id === postId) {
        if (oldValue.isLiked) {
          return { ...oldValue, isLiked: false };
        } else {
          return { ...oldValue, isLiked: true };
        }
      } else {
        return oldValue;
      }
    })
  );

  const handleToogle = async (postId) => {
    action(postId);
    await handleToggle(postId);
  };

  if (!optimizedPosts || optimizedPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {optimizedPosts.map((optimizedPost) => (
        <li key={optimizedPost._id}>
          <Post post={optimizedPost} onToggle={handleToogle} />
        </li>
      ))}
    </ul>
  );
};
