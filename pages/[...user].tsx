import darkMode from "@/atoms/darkModeAtom";
import PostsGrid from "@/components/PostsGrid";
import Sidebar from "@/components/Sidebar";
import useAuth from "@/hooks/useAuth";
import usePost from "@/hooks/usePost";
import windowWidth from "@/hooks/useWidth";
import Image from "next/image";
import { useEffect } from "react";
import { BsGrid3X3 } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { useRecoilState } from "recoil";
import noUser from "../public/no-profile.jpg";

export default function user() {
  const { user } = useAuth();
  const [mode, setMode] = useRecoilState(darkMode);
  const { posts } = usePost();
  useEffect(() => {
    mode !== false
      ? document.querySelector("body")?.classList.add("dark")
      : document.querySelector("body")?.classList.remove("dark");
  }, [mode]);
  console.log(posts);
  return (
    <div className="flex">
      <div>{<Sidebar windowWidth={windowWidth()} />}</div>
      <div className="px-2 md:px-10 pt-10 max-w-[935px] w-full mx-auto space-y-20">
        <div className="flex">
          <div className="grow mr-7 ">
            <Image
              className=" rounded-[100%] max-w-[150px] mx-auto"
              src={user ? user.photoURL! : noUser}
              width={150}
              height={150}
              alt="user avatar"
            />
          </div>
          {/* Right side */}
          <div className="grow-[2] space-y-4">
            <div className="flex gap-6 items-center">
              <h1 className="text-lg font-normal ">{user?.displayName}</h1>
              <button className="bg-gray-100 hover:bg-gray-200 text-[14px]  font-medium px-4 py-1 rounded-sm">
                Edit profile
              </button>
              <FiSettings className="menuIcon" />
            </div>
            <div className="flex gap-10 items-center">
              <div>
                <span className="font-medium mr-2">54</span>
                <span>posts</span>
              </div>
              <div>
                <span className="font-medium mr-2">1339</span>
                <span>followers</span>
              </div>
              <div>
                <span className="font-medium mr-2">842</span>
                <span>following</span>
              </div>
            </div>
            <div>
              <p>
                No one cares about your story until you win, so win
                <br />
                1.81
                <br />
                Software developer Ui/ux designer Photographer
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-2 mb-2 items-center">
            <BsGrid3X3 className="h-4 w-4" />
            <h2 className="font-medium text-lg">Posts</h2>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-8">
            {posts.map((post) => (
              <PostsGrid key={post.id} image={post.data().image} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
