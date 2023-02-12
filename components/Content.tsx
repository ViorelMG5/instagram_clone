import useAuth from "@/hooks/useAuth";
import Feed from "./Feed";
import Story from "./Story";

export default function Content() {
  const { logout } = useAuth();
  return (
    <div className="grow-[5] mt-20 md:mt-10">
      <div className=" max-w-md  mx-auto">
        <Story />
        <Feed />
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
