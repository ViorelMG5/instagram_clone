import { useRef, useState } from "react";
import StoryIcon from "./StoryIcon";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function Story() {
  const [story, setStory] = useState<boolean | null>(true);
  const [isMoved, setIsMoved] = useState(false);
  const rowRef = useRef<HTMLUListElement>(null);

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
        className=" flex gap-3 overflow-x-scroll   scrollbar-hide"
      >
        <StoryIcon storySeen={story} />
      </ul>
      <MdKeyboardArrowRight
        onClick={() => handleClick("right")}
        className="absolute -top-3 bottom-0 right-2 bg-[#909193]/50 rounded-xl z-40 m-auto h-7 w-7 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
      />
    </div>
  );
}
