import useAuth from "@/hooks/useAuth";
import noUser from "../public/no-profile.jpg";
import Image from "next/image";
import "firebase/compat/database";
import SuggestionList from "./SuggestionList";
import Link from "next/link";

export default function SecondaryBar() {
  const { user } = useAuth();

  return (
    <div className="grow-[1] mt-12 md:mt-10 pr-3">
      <Link href={user?.displayName!} className="flex items-center gap-4">
        <Image
          className="rounded-[100%] w-[60px] h-[60px] object-cover "
          src={user?.photoURL || noUser}
          width={60}
          height={60}
          alt={`${user?.displayName} profile`}
        />
        <div className="text-[14px]">
          <p className="font-medium">{user?.displayName}</p>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </Link>
      <div className="mt-5 max-w-[300px]">
        <h2 className="font-medium text-[#AEAEAE] text-[16px]">
          Suggested for you
        </h2>
        <SuggestionList />
      </div>
    </div>
  );
}
