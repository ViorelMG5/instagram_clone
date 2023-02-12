import Image from "next/image";
import avatar from "../public/avatar.jpg";
interface Props {
  hasStory: boolean | null;
}
export default function StoryIcon({ hasStory }: Props) {
  return (
    <li className="flex flex-col justify-center items-center">
      <div className={`${hasStory && "hasStory"}`}>
        <Image
          src={avatar}
          alt="user avatar"
          width={60}
          className="rounded-full border-2 border-white"
        />
      </div>
      <span className="text-[13px]">viorelbinciu</span>
    </li>
  );
}
