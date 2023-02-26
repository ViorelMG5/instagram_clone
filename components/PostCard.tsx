import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { TbSend } from "react-icons/tb";
import { FormEvent, useEffect, useRef, useState } from "react";
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
import { db } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import LikesElement from "./LikesElement";
import CommentsList from "./CommentsList";
import usePostInteractions from "@/hooks/usePostInteractions";
import { MdDeleteOutline } from "react-icons/md";
interface Props {
  avatar: string;
  username: string;
  postImage: string;
  time: string;
  postDescription: string;
  userId: string;
  id: string;
}
export default function PostCard({
  avatar,
  username,
  postImage,
  userId,
  id,
  time,
  postDescription,
}: Props) {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [showHeart, setShowHeart] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addComment, togglePostLike, removePost } = usePostInteractions();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setComment("");
    addComment(comment, id);
  };

  useEffect(() => {
    const handleLikes = () => {
      togglePostLike(liked, id);
    };
    handleLikes();
  }, [liked]);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    );
  }, [db, id]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);

  const handleClickChatBubble = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleDoubleClick = () => {
    setLiked(!liked);
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 1000);
  };

  return (
    <div
      className="border-b pb-5"
      onClick={() => {
        console.log(id);
      }}
    >
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2 ">
          <Image
            src={avatar}
            width={40}
            height={40}
            className="rounded-full border-2 w-[40px] h-[40px] object-cover border-white dark:border-[#121212] cursor-pointer"
            alt="post"
          />
          <span className="font-semibold cursor-pointer">{username} </span>
        </div>
        {username === user?.displayName && (
          <MdDeleteOutline
            className="cursor-pointer w-5 h-5 text-gray-500"
            onClick={() => removePost(id)}
          />
        )}
      </div>
      <div className="mt-3 relative pt-[100%]">
        <AiFillHeart
          className={`absolute opacity-0 transition-all	duration-700 z-10 top-0 left-0 right-0 bottom-0 m-auto w-10  h-10 fill-white ${
            showHeart && "opacity-100 w-20 h-20"
          } ${liked && "!fill-red-500"}`}
        />

        <Image
          onDoubleClick={handleDoubleClick}
          width={1000}
          height={1000}
          src={postImage}
          alt="post"
          className="absolute h-full w-full top-0 left-0 object-contain"
        />
      </div>
      <div className="mt-3 flex justify-between">
        <div className="flex items-center gap-3">
          {liked ? (
            <AiFillHeart
              onClick={() => setLiked(!liked)}
              className="w-7 h-7 cursor-pointer fill-red-500"
            />
          ) : (
            <AiOutlineHeart
              onClick={() => setLiked(!liked)}
              className="w-7 h-7 cursor-pointer "
            />
          )}
          <ChatBubbleOvalLeftIcon
            onClick={handleClickChatBubble}
            className="w-7 h-7 scale-x-[-1] cursor-pointer"
          />
          <TbSend className="w-7 h-7" />
        </div>
        <BiBookmark className="w-7 h-7" />
      </div>
      <LikesElement likes={likes} />
      <div className="space-y-1">
        <p>
          <span className="font-semibold cursor-pointer mr-2">{username}</span>
          {postDescription}{" "}
        </p>
        <CommentsList comments={comments} id={id} />
      </div>
      <form className="mt-3 relative" onSubmit={handleSubmit}>
        <input
          value={comment}
          ref={inputRef}
          onChange={(e) => setComment(e.target.value)}
          className="w-full outline-none "
          placeholder="Add a comment ..."
        />
        {comment.length !== 0 && (
          <button
            type="submit"
            className="absolute right-0 text-[#0095F6] font-semibold"
          >
            Post
          </button>
        )}
      </form>
    </div>
  );
}
