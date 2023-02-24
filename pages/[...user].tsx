import PostsGrid from "@/components/PostsGrid";
import Sidebar from "@/components/Sidebar";
import UserPagePanel from "@/components/UserPagePanel";
import { db } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import usePost from "@/hooks/usePost";
import windowWidth from "@/hooks/useWidth";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { BsGrid3X3 } from "react-icons/bs";

export default function user() {
  const { posts } = usePost();
  const { user } = useAuth();
  const [currentUser, setCurrentUser] =
    useState<QueryDocumentSnapshot<DocumentData>[]>();
  const usersRef = collection(db, "users");

  const filteredPosts = posts.filter(
    (post) => post.data().userId === user?.uid
  );

  useEffect(() => {
    const setUser = onSnapshot(usersRef, (snapshot) => {
      const filteredUser = snapshot.docs.filter(
        (item) => item.data().username === user?.displayName
      );
      setCurrentUser(filteredUser);
    });
    return () => setUser();
  }, [user]);

  console.log(currentUser && currentUser[0].data());

  return (
    <div className="flex">
      <div>{<Sidebar windowWidth={windowWidth()} />}</div>
      <div className="px-2 md:px-10 pt-10 max-w-[935px] w-full mx-auto space-y-20">
        <UserPagePanel
          postLength={filteredPosts.length}
          followers={
            (currentUser && currentUser[0].data().followers.length) || 0
          }
          following={
            (currentUser && currentUser[0].data().following.length) || 0
          }
        />
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
