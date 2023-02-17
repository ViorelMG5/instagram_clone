import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineSmile } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { TbSend } from "react-icons/tb";
interface Props {
  avatar: string;
  username: string;
  postImage: string;
  time: string;
}
export default function PostCard({ avatar, username, postImage, time }: Props) {
  return (
    <div className="border-b pb-5">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <Image
            src={avatar}
            width={40}
            height={40}
            className="rounded-full border-2 border-white border-dark cursor-pointer"
            alt="post"
          />
          <span className="font-semibold cursor-pointer">{username} </span>
          {/* <span className="text-gray-500 text-sm">{time}</span> */}
        </div>
        <BsThreeDots className="cursor-pointer" />
      </div>
      <div className="mt-3 relative pt-[100%]">
        <Image
          width={1000}
          height={1000}
          src={postImage}
          alt="post"
          className="absolute h-full w-full top-0 left-0 object-cover"
        />
      </div>
      <div className="mt-3 flex justify-between">
        <div className="flex items-center gap-3">
          <AiOutlineHeart className="menuIcon" />
          <ChatBubbleOvalLeftIcon className="menuIcon scale-x-[-1]" />
          <TbSend className="menuIcon" />
        </div>
        <BiBookmark className="menuIcon" />
      </div>
      <span className="block mt-3 font-semibold text-[13px]">
        Liked by 230{" "}
      </span>
      <div className="space-y-1">
        <p>
          <span className="font-semibold cursor-pointer mr-2">
            viorelbinciu
          </span>
          _ JUICE WRLD!!! Taken too soon. R.I.P. I wanted to give homage to a
          truly amazing artist that didn’t get enough time on this earth.
        </p>
        <div className="flex justify-between items-center space-x-2">
          <p>
            <span className="font-semibold cursor-pointer mr-2">
              cristidaniel
            </span>
            Mare om, mare jale la pomana lui...
          </p>
          <AiOutlineHeart className="w-5 h-5 text-gray-400 shrink-0" />
        </div>
        <div className="flex justify-between items-center space-x-2">
          <p>
            <span className="font-semibold cursor-pointer mr-2">
              viorelbinciu
            </span>
            Stai cuminte ca te potcovesc{" "}
          </p>
        </div>
        <div className="flex justify-between items-center space-x-2">
          <p>
            <span className="font-semibold cursor-pointer mr-2">
              adrianfluca
            </span>
            Cateodata stau si ma gandesc, alteori ma gandesc mergand...
          </p>
          <AiOutlineHeart className="w-5 h-5 text-gray-400 shrink-0" />
        </div>
      </div>
      <form className="mt-3 relative">
        <input
          className="w-full outline-none "
          placeholder="Add a comment ..."
        />
        <AiOutlineSmile className="absolute right-0 top-0 bottom-0 my-auto text-gray-500 cursor-pointer" />
      </form>
    </div>
  );
}
