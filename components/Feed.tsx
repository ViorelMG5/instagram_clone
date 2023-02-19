import PostCard from "./PostCard";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import usePost, { PostProvider } from "@/hooks/usePost";

export default function Feed() {
  const { posts } = usePost();

  return (
    <div className="mt-8 space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          userId={post.data().userId}
          id={post.id}
          postDescription={post.data().postdescription}
          avatar={post.data().profileImg}
          username={post.data().username}
          postImage={post.data().image}
          time={post.data().timestamp}
        />
      ))}
    </div>
  );
}
