import { db } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import usePost from "@/hooks/usePost";
import usePostInteractions from "@/hooks/usePostInteractions";
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
import { MdDeleteOutline } from "react-icons/md";

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
  id: string;
}

export default function CommentsList({ comments, id }: Props) {
  const { user } = useAuth();
  console.log(user);
  const [commentLike, setCommentLike] = useState(false);
  const [commentLikes, setCommentLikes] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const { removeComment, toggleCommentLike } = usePostInteractions();

  useEffect(() => {
    const handleCommentsLike = () => {
      toggleCommentLike(commentLike, id);
    };
    handleCommentsLike();
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
        <div className="gap-4 flex items-center">
          {user?.displayName === comment.data().user && (
            <MdDeleteOutline
              className="w-5 h-5 text-gray-400 shrink-0 cursor-pointer"
              onClick={() => {
                removeComment(comment.id, id);
              }}
            />
          )}

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
      </div>
    ))
  );
}
