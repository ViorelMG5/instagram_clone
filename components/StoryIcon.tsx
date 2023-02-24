import Image from "next/image";
import noUser from "../public/no-profile.jpg";

interface Props {
  storySeen: boolean | null;
}
export default function StoryIcon({ storySeen }: Props) {
  return (
    <li className="flex flex-col justify-center items-center cursor-pointer">
      <div className={`${storySeen && "hasStory"}`}>
        <Image
          src={noUser}
          alt="user avatar"
          width={60}
          className="rounded-full border-1 dark:border-[#121212]"
        />
      </div>
      <span className="text-[13px]">no user</span>
    </li>
  );
}
