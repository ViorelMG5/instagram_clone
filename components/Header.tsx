import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import logoBw from "../public/logobw.png";

export default function Header() {
  return (
    <header className="px-5 py-1 fixed z-30 top-0 w-full bg-white flex justify-between items-center border-b-2">
      <Image
        src={logoBw}
        alt="instagram clone logo"
        className="p-3"
        width={50}
      />
      <div className="relative ml-auto mr-4 text-gray-600">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
        />
        <button
          type="submit"
          className="absolute right-3 top-0 bottom-0 m-auto "
        >
          <FiSearch className="menuIcon text-gray-500" />
        </button>
      </div>

      <AiOutlineHeart className="menuIcon" />
    </header>
  );
}
