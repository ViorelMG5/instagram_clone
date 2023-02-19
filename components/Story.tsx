import { useRef, useState } from "react";
import StoryIcon from "./StoryIcon";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import useAuth from "@/hooks/useAuth";

export default function Story() {
  const [seen, setSeen] = useState<boolean | null>(true);
  const [isMoved, setIsMoved] = useState(false);
  const rowRef = useRef<HTMLUListElement>(null);
  const { user } = useAuth();

  // const docRef = await addDoc(collection(db, 'stories'), {
  //   username: user?.displayName,

  // })

  // const handleAddStory = async () => {
  //   await addDoc(collection(db, 'stories', id,'story' ), {

  //   })
  // }

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };
  return (
    <div className="relative group">
      <MdKeyboardArrowLeft
        onClick={() => handleClick("left")}
        className={`absolute -top-3 bottom-0  bg-[#909193]/50 rounded-xl  left-2 z-40 m-auto h-7 w-7 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
          !isMoved && "hidden"
        }`}
      />
      <ul
        ref={rowRef}
        className=" flex gap-3 overflow-x-scroll  scrollbar-hide "
      >
        <StoryIcon storySeen={seen} />
        <p className="mt-4 uppercase text-gray-400 font-medium">Coming soon</p>
      </ul>
      <MdKeyboardArrowRight
        onClick={() => handleClick("right")}
        className="absolute -top-3 bottom-0 right-2 bg-[#909193]/50 rounded-xl z-40 m-auto h-7 w-7 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
      />
    </div>
  );
}
