import { db, storage } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import usePost from "@/hooks/usePost";
import user from "@/pages/[...user]";
import Modal from "@mui/material/Modal";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsPlusSquare } from "react-icons/bs";

interface Inputs {
  description: string;
}
export default function AddPostModal() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ description }) => {
    const docRef = await addDoc(collection(db, "posts"), {
      userId: user?.uid,
      username: user?.displayName,
      postdescription: description,
      profileImg: user?.photoURL,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(
      imageRef,
      imagePreview ? imagePreview : "",
      "data_url"
    ).then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "posts", docRef.id), { image: downloadUrl });
    });
    handleClose();
    setImagePreview(null);
    reset();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files && e.target.files[0].size > 1000000) {
      alert("Size must be lower than 1mb");
      return;
    }
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      const image = readerEvent.target?.result as string;
      setImagePreview(image);
    };
  };
  return (
    <div>
      <div className="flex gap-4 " onClick={handleOpen}>
        <BsPlusSquare className="menuIcon rouned-md" /> <span>Post</span>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-white rounded-xl h-fit max-w-[90vw] md:max-w-[626px] absolute top-0 bottom-0 left-0 right-0 m-auto">
          <h2 className="text-center font-medium py-3 border-b">New post</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-3 md:p-8 min-h-[40vh] "
          >
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  width={100}
                  height={100}
                  alt="Preview"
                  className="object-contain w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <AiOutlineCloudUpload className="w-14 h-14 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG or JPG (max 1mb)
                  </p>
                </div>
              )}
              <input
                id="dropzone-file"
                type="file"
                accept=".png, .svg, .jpg"
                required
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <label className="mt-4 block">
              Description
              <textarea
                className="border rouned-md w-full min-h-[10vh] p-2 focus:outline-none"
                {...register("description")}
              />
            </label>
            <button type="submit" className="btn-primary mt-4">
              Post
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
