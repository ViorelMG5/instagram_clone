import PostCard from "./PostCard";
import {
  collection,
  DocumentData,
  onSnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";

export default function Feed() {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  console.log(posts);

  useEffect(() => {
    onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs);
    });
  }, []);

  return (
    <div className="mt-8 space-y-4">
      {posts.map((post) => (
        <PostCard
          avatar={post.data().profileImg}
          username={post.data().username}
          postImage={post.data().image}
          time={post.data().timestamp}
        />
      ))}
    </div>
  );
}
