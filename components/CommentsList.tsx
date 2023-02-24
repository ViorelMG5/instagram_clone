import { db } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  QueryDocumentSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRecoilValue } from "recoil";

interface Comment {
  id: string;
  data: () => {
    comment: string;
    id: string;
    timestamp: string;
    user: string;
  };
}
interface Props {
  comments: DocumentData | Comment[];
  userId: string;
  id: string;
}

export default function CommentsList({ comments, userId, id }: Props) {
  const { user } = useAuth();
  const [commentLike, setCommentLike] = useState(false);
  const [commentLikes, setCommentLikes] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);

  useEffect(() => {
    const handleComments = async () => {
      if (!user) return;
      commentLike
        ? await setDoc(doc(db, "posts", id, "commentLikes", user.uid), {
            username: user.displayName,
            avatarPhoto: user.photoURL,
          })
        : await deleteDoc(doc(db, "posts", id, "commentLikes", user.uid));
    };
    handleComments();
  }, [commentLike]);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "commentLikes"), (snapshot) =>
      setCommentLikes(snapshot.docs)
    );
  }, [db, id]);

  return (
    comments.length > 0 &&
    comments.map((comment: Comment) => (
      <div
        key={comment.id}
        className="flex justify-between items-center space-x-2"
      >
        <p>
          <span className="font-semibold cursor-pointer mr-2">
            {comment.data().user}
          </span>
          {comment.data().comment}
        </p>

        {commentLike ? (
          <AiFillHeart
            onClick={() => setCommentLike(!commentLike)}
            className="w-5 h-5 fill-red-500"
          />
        ) : (
          <AiOutlineHeart
            onClick={() => setCommentLike(!commentLike)}
            className="w-5 h-5 text-gray-400 shrink-0 cursor-pointer"
          />
        )}
      </div>
    ))
  );
}
