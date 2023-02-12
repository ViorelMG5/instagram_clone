import Image from "next/image";
import logo from "../public/Instagram_logo.png";
import logoBw from "../public/logobw.png";
import avatar from "../public/avatar.jpg";
import { MdHomeFilled, MdOutlineExplore } from "react-icons/md";
import { BsPlusSquare } from "react-icons/bs";
import { FiSend, FiSearch } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";

interface SidebarProps {
  windowWidth: number;
}

export default function Sidebar({ windowWidth }: SidebarProps) {
  const brand =
    windowWidth > 1280 ? (
      <Image className="w-[100px] mb-7" src={logo} alt="instagram clone logo" />
    ) : (
      <Image
        className="w-[40px] p-2 mb-7 "
        src={logoBw}
        alt="instagram clone logo"
      />
    );

  return (
    <div className="md:p-5 border-r">
      {windowWidth > 768 && brand}
      <ul
        className={`md:space-y-4 md:static z-20 md:block bg-white border-t md:border-t-0 py-1 md:py-0 left-0 fixed bottom-0 flex items-center justify-evenly w-full ${
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
          <BsPlusSquare className="menuIcon" /> <span>Post</span>
        </li>
        <li className="menuitem">
          <Image
            className="menuIcon rounded-xl"
            src={avatar}
            alt="user avatar"
          />
          <span>Post</span>
        </li>
      </ul>
    </div>
  );
}
