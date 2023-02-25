import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { FiSettings } from "react-icons/fi";
import noUser from "../public/no-profile.jpg";
import windowWidth from "@/hooks/useWidth";

interface Props {
  postLength: number;
  followers: number;
  following: number;
}
export default function UserPagePanel({
  postLength,
  followers,
  following,
}: Props) {
  const { user } = useAuth();
  const bio = <div> Bio is coming soon...</div>;

  return (
    <div>
      <div className="flex">
        <div className="grow mr-4 md:mr-7 ">
          <Image
            className=" rounded-[100%] max-w-[60px] md:max-w-[120px]   max-h-[60px]  md:max-h-[120px] w-full h-full object-cover mx-auto"
            src={user ? user.photoURL! : noUser}
            width={150}
            height={150}
            alt="user avatar"
          />
        </div>
        {/* Right side */}
        <div className="grow-[2] space-y-4">
          <div className="flex gap-2 md:gap-6 items-center">
            <h1 className="text-lg font-normal ">{user?.displayName}</h1>
            <button className="edit-button">Edit profile</button>
          </div>

          <div className="flex gap-4 flex-wrap md:gap-10 items-center ">
            <div>
              <span className="font-medium mr-1">{postLength}</span>
              <span>posts</span>
            </div>
            <div>
              <span className="font-medium mr-1">{followers}</span>
              <span>followers</span>
            </div>
            <div>
              <span className="font-medium mr-1">{following}</span>
              <span>following</span>
            </div>
          </div>
          {windowWidth() > 767 && bio}
        </div>
      </div>
      {windowWidth() < 767 && <div className="pl-4 mt-4">{bio}</div>}
    </div>
  );
}
