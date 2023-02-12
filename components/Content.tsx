import Feed from "./Feed";
import Story from "./Story";

export default function Content() {
  return (
    <div className="grow-[5] mt-20 md:mt-10">
      <div className=" max-w-md  mx-auto">
        <Story />
        <Feed />
      </div>
    </div>
  );
}
