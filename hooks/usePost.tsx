import { db } from "@/firebase";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { useContext, useEffect, useMemo, useState } from "react";
import { createContext } from "react";

interface PostContextProps {
  posts: QueryDocumentSnapshot<DocumentData>[];
}
interface PostProviderProps {
  children: React.ReactNode;
}

export const PostContext = createContext<PostContextProps>({
  posts: [],
});

export const PostProvider = ({ children }: PostProviderProps) => {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );

    return () => unsubscribe();
  }, []);

  const postContextValue = useMemo(() => ({ posts }), [posts]);

  return (
    <PostContext.Provider value={postContextValue}>
      {children}
    </PostContext.Provider>
  );
};

export default function usePost() {
  return useContext(PostContext);
}
