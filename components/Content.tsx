import useAuth from "@/hooks/useAuth";
import Feed from "./Feed";
import Story from "./Story";

export default function Content() {
  return (
    <div className="grow-[5] mt-12 md:mt-10">
      <div className=" max-w-md  mx-auto px-2 md:px-0">
        <Story />
        <Feed />
      </div>
    </div>
  );
}
