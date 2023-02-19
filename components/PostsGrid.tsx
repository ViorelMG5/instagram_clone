import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import Image from "next/image";

interface Props {
  image: string;
}
export default function PostsGrid({ image }: Props) {
  return (
    <div className="relative pt-[100%] cursor-pointer">
      <Image
        className="absolute top-0 bottom-0 w-full h-full object-cover"
        src={image}
        alt="user post photo"
        width={200}
        height={200}
      />
    </div>
  );
}
