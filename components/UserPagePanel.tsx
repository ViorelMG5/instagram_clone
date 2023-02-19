import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { FiSettings } from "react-icons/fi";
import noUser from "../public/no-profile.jpg";
import windowWidth from "@/hooks/useWidth";

interface Props {
  postLength: number;
}
export default function UserPagePanel({ postLength }: Props) {
  const { user } = useAuth();
  const bio = <div> Bio is coming soon...</div>;

  return (
    <div>
      <div className="flex">
        <div className="grow mr-7 ">
          <Image
            className=" rounded-[100%] max-w-[120px] min-w-[70px] max-h-[120px] w-full h-fullobject-cover mx-auto"
            src={user ? user.photoURL! : noUser}
            width={150}
            height={150}
            alt="user avatar"
          />
        </div>
        {/* Right side */}
        <div className="grow-[2] space-y-4">
          <div className="flex gap-6 items-center">
            <h1 className="text-lg font-normal ">{user?.displayName}</h1>
            <button className="bg-gray-100 hover:bg-gray-200 text-[14px]  font-medium px-4 py-1 rounded-sm">
              Edit profile
            </button>
          </div>

          <div className="flex gap-4 flex-wrap md:gap-10 items-center ">
            <div>
              <span className="font-medium mr-2">{postLength}</span>
              <span>posts</span>
            </div>
            <div>
              <span className="font-medium mr-2">1339</span>
              <span>followers</span>
            </div>
            <div>
              <span className="font-medium mr-2">842</span>
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
