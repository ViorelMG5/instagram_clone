import { db, storage } from "@/firebase";
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
import { deleteObject, ref } from "firebase/storage";
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
  removePost: (postId: string) => Promise<void>;
  addComment: (comment: string, id: string) => Promise<void>;
  removeComment: (commentId: string, postId: string) => Promise<void>;
  addPostLike: (id: string) => Promise<void>;
  removePostLike: (id: string) => Promise<void>;
  addCommentLike: (id: string) => Promise<void>;
  removeCommentLike: (id: string) => Promise<void>;
}

interface PostInteractionProviderProps {
  children: React.ReactNode;
}
export const CommentsContext = createContext<PostInteractionsContextProps>({
  removePost: async () => {},
  addComment: async () => {},
  removeComment: async () => {},
  addPostLike: async () => {},
  removePostLike: async () => {},
  addCommentLike: async () => {},
  removeCommentLike: async () => {},
});

export const PostInteractionsProvider = ({
  children,
}: PostInteractionProviderProps) => {
  const { user } = useAuth();

  const removePost = async (postId: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, "posts", postId));
      const imageRef = ref(storage, `posts/${postId}/image`);
      await deleteObject(imageRef);
    }
  };
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

  const addPostLike = async (id: string) => {
    if (!user) return;
    await setDoc(doc(db, "posts", id, "likes", user.uid), {
      username: user.displayName,
      avatarPhoto: user.photoURL,
    });
  };

  const removePostLike = async (id: string) => {
    if (!user) return;
    await deleteDoc(doc(db, "posts", id, "likes", user.uid));
  };

  const addCommentLike = async (id: string) => {
    if (!user) return;
    await setDoc(doc(db, "posts", id, "commentsLikes", user.uid), {
      username: user.displayName,
      avatarPhoto: user.photoURL,
    });
  };
  const removeCommentLike = async (id: string) => {
    if (!user) return;
    await deleteDoc(doc(db, "posts", id, "commentsLikes", user.uid));
  };

  const memoedValues = useMemo(
    () => ({
      removePost,
      addComment,
      removeComment,
      addPostLike,
      removePostLike,
      addCommentLike,
      removeCommentLike,
    }),
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
