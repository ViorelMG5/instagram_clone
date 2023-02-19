import Image from "next/image";
import avatar from "../public/avatar.jpg";
interface Props {
  storySeen: boolean | null;
}
export default function StoryIcon({ storySeen }: Props) {
  return (
    <li className="flex flex-col justify-center items-center cursor-pointer">
      <div className={`${storySeen && "hasStory"}`}>
        <Image
          src={avatar}
          alt="user avatar"
          width={60}
          className="rounded-full border-1 border-dark"
        />
      </div>
      <span className="text-[13px]">viorelbinciu</span>
    </li>
  );
}
