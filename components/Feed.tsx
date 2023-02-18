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

export default function Feed() {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  console.log(posts);
  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, []);

  return (
    <div className="mt-8 space-y-4">
      {posts.map((post) => (
        <>
          <PostCard
            userId={post.data().userId}
            id={post.id}
            postDescription={post.data().postdescription}
            avatar={post.data().profileImg}
            username={post.data().username}
            postImage={post.data().image}
            time={post.data().timestamp}
          />
        </>
      ))}
    </div>
  );
}
