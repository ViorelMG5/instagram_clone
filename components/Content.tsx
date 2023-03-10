import useAuth from "@/hooks/useAuth";
import Feed from "./Feed";
import Story from "./Story";

export default function Content() {
  return (
    <div className="grow-[3] mt-20 md:mt-10">
      <div className=" max-w-md  mx-auto px-2 mb-20 md:px-0">
        <Story />
        <Feed />
      </div>
    </div>
  );
}
