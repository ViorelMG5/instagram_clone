import PostCard from "./PostCard";
import usePost from "@/hooks/usePost";

export default function Feed() {
  const { posts } = usePost();

  return (
    <div className="mt-8 space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          userId={post.data().userId}
          id={post.id}
          postDescription={post.data().postdescription}
          avatar={post.data().profileImg}
          username={post.data().username}
          postImage={post.data().image}
          time={post.data().timestamp}
        />
      ))}
    </div>
  );
}
