import Image from "next/image";
import logo from "../public/Instagram_logo.png";
import logoBw from "../public/logobw.png";
import { MdHomeFilled, MdOutlineExplore } from "react-icons/md";
import { FiSend, FiSearch } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import noUser from "../public/no-profile.jpg";
import useAuth from "@/hooks/useAuth";
import BasicMenu from "./BasicMenu";
import Link from "next/link";
import AddPostModal from "./addPostModal";

interface SidebarProps {
  windowWidth: number;
}

export default function Sidebar({ windowWidth }: SidebarProps) {
  const { logout, user } = useAuth();

  const brand = (
    <Link href="/">
      {windowWidth > 1280 ? (
        <Image
          className="w-[100px] mb-7"
          src={logo}
          alt="instagram clone logo"
        />
      ) : (
        <Image
          className="w-[40px] p-2 mb-7 invert-dark"
          src={logoBw}
          alt="instagram clone logo"
        />
      )}
    </Link>
  );

  return (
    <div className="md:p-5 border-r border-[#909193] md:flex md:flex-col md:h-screen md:sticky md:top-0 md:items-center">
      {windowWidth > 768 && brand}
      <ul
        className={`md:space-y-4  md:static z-20 md:block bg-white  bg-dark    border-t md:border-t-0 py-1 md:py-0 left-0 fixed bottom-0 flex items-center justify-evenly w-full ${
          windowWidth < 1280 && "hideIcons"
        }`}
      >
        <li className="menuitem">
          <MdHomeFilled className="menuIcon" /> <span>Home</span>
        </li>
        <li className="menuitem">
          <FiSearch className="menuIcon" /> <span>Search</span>
        </li>
        <li className="menuitem">
          <MdOutlineExplore className="menuIcon" /> <span>Explore</span>
        </li>
        <li className="menuitem">
          <FiSend className="menuIcon" /> <span>Message</span>
        </li>
        {windowWidth > 768 && (
          <li className="menuitem">
            <AiOutlineHeart className="menuIcon" /> <span>Notification</span>
          </li>
        )}
        <li className="menuitem">
          <AddPostModal />
        </li>
        <li className="menuitem">
          <Link href={`${user?.displayName}`}>
            <Image
              className="menuIcon rounded-xl"
              src={user ? user.photoURL! : noUser}
              width={100}
              height={100}
              alt="user avatar"
            />
          </Link>
          <span>Profile</span>
        </li>
      </ul>
      {windowWidth > 768 && <BasicMenu logout={logout} />}
    </div>
  );
}
