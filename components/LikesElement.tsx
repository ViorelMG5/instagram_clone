import useAuth from "@/hooks/useAuth";
import { Modal } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import noUser from "../public/no-profile.jpg";
import { useState } from "react";

interface Props {
  likes: DocumentData | Like[];
}

interface Like {
  id: string;
  data: () => {
    username: string;
    avatarPhoto: string;
  };
}

export default function LikesElement({ likes }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const likeList =
    likes.length === 0 ? (
      ""
    ) : (
      <div>
        <span> Liked by</span>
        {likes.map((like: Like) => (
          <span className="font-medium" key={like.id}>
            {like.data().username}
          </span>
        ))}
      </div>
    );

  const likeModal = (
    <>
      <div className="flex gap-4 " onClick={handleOpen}>
        <span className="font-medium cursor-pointer">{likes.length} Likes</span>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-white rounded-xl h-fit max-w-[90vw] md:max-w-[426px] absolute top-0 bottom-0 left-0 right-0 m-auto">
          <h2 className="text-center font-medium py-3 border-b">Likes</h2>
          <ul>
            {likes.map((like: Like) => (
              <li key={like.id}>
                <Link
                  href={like.data().username}
                  className="flex items-center gap-2 p-4"
                >
                  <Image
                    src={like.data().avatarPhoto || noUser}
                    alt={`${like.data().username} profile picture`}
                    width={40}
                    height={40}
                    className="rounded-[100%] w-[40px] h-[40px] object-cover"
                  />
                  <span className="font-medium">{like.data().username}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
  return (
    <span className="block my-2  text-[14px] space-x-1">
      {likes.length < 1 ? likeList : likeModal}
    </span>
  );
}
