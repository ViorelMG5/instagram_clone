import { db } from "@/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  createContext,
  FormEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useAuth from "./useAuth";

interface PostInteractionsContextProps {
  addComment: (comment: string, id: string) => Promise<void>;
  removeComment: (commentId: string, postId: string) => Promise<void>;
  togglePostLike: (liked: boolean, id: string) => Promise<void>;
  toggleCommentLike: (commentLike: boolean, id: string) => Promise<void>;
}

interface PostInteractionProviderProps {
  children: React.ReactNode;
}
export const CommentsContext = createContext<PostInteractionsContextProps>({
  addComment: async () => {},
  removeComment: async () => {},
  togglePostLike: async () => {},
  toggleCommentLike: async () => {},
});

export const PostInteractionsProvider = ({
  children,
}: PostInteractionProviderProps) => {
  const { user } = useAuth();

  const addComment = async (comment: string, id: string) => {
    const commentToSend = comment;
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      user: user?.displayName,
      id: id,
      timestamp: serverTimestamp(),
    });
  };

  const removeComment = async (commentId: string, postId: string) => {
    await deleteDoc(doc(db, "posts", postId, "comments", commentId));
  };

  const togglePostLike = async (liked: boolean, id: string) => {
    if (!user) return;
    liked
      ? await setDoc(doc(db, "posts", id, "likes", user.uid), {
          username: user.displayName,
          avatarPhoto: user.photoURL,
        })
      : await deleteDoc(doc(db, "posts", id, "likes", user.uid));
  };

  const toggleCommentLike = async (commentLike: boolean, id: string) => {
    if (!user) return;
    commentLike
      ? await setDoc(doc(db, "posts", id, "commentLikes", user.uid), {
          username: user.displayName,
          avatarPhoto: user.photoURL,
        })
      : await deleteDoc(doc(db, "posts", id, "commentLikes", user.uid));
  };

  const memoedValues = useMemo(
    () => ({ addComment, removeComment, togglePostLike, toggleCommentLike }),
    []
  );

  return (
    <CommentsContext.Provider value={memoedValues}>
      {children}
    </CommentsContext.Provider>
  );
};

export default function usePostInteractions() {
  return useContext(CommentsContext);
}
