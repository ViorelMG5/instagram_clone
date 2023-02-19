import darkMode from "@/atoms/darkModeAtom";
import PostsGrid from "@/components/PostsGrid";
import Sidebar from "@/components/Sidebar";
import UserPagePanel from "@/components/UserPagePanel";
import useAuth from "@/hooks/useAuth";
import usePost from "@/hooks/usePost";
import windowWidth from "@/hooks/useWidth";
import { useEffect } from "react";
import { BsGrid3X3 } from "react-icons/bs";
import { useRecoilState } from "recoil";

export default function user() {
  const [mode, setMode] = useRecoilState(darkMode);
  const { posts } = usePost();
  const { user } = useAuth();
  const filteredPosts = posts.filter(
    (post) => post.data().userId === user?.uid
  );
  useEffect(() => {
    mode !== false
      ? document.querySelector("body")?.classList.add("dark")
      : document.querySelector("body")?.classList.remove("dark");
  }, [mode]);
  return (
    <div className="flex">
      <div>{<Sidebar windowWidth={windowWidth()} />}</div>
      <div className="px-2 md:px-10 pt-10 max-w-[935px] w-full mx-auto space-y-20">
        <UserPagePanel postLength={filteredPosts.length} />
        <div>
          <div className="flex gap-2 mb-2 items-center">
            <BsGrid3X3 className="h-4 w-4" />
            <h2 className="font-medium text-lg">Posts</h2>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostsGrid key={post.id} image={post.data().image} />
              ))
            ) : (
              <span>No posts yet</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
