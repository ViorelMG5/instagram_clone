import { auth } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import { getStorage, ref } from "firebase/storage";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import logo from "../public/Instagram_logo.png";

type Inputs = {
  displayName: string;
  phoneNumber: string;
  profilePic: string;
};

export default function SetUser() {
  const storage = getStorage();

  // Create a reference to 'mountains.jpg'
  const mountainsRef = ref(storage, "profile.jpg");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { user, addUsername } = useAuth();
  console.log(user);
  const onSubmit: SubmitHandler<Inputs> = async ({
    displayName,
    // phoneNumber,
  }) => {
    addUsername(displayName);
  };

  console.log(watch("profilePic"));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" flex flex-col items-center">
        <Image src={logo} alt="instagram logo" width={200} className="my-5" />
        <div className="space-y-3 flex flex-col w-full">
          <input
            className="basic-input"
            type="text"
            required
            placeholder="Username"
            {...register("displayName")}
          />
          <input
            className="basic-input"
            type="file"
            required
            {...register("profilePic")}
          />
          {/* <input
            required
            className="basic-input"
            type="password"
            placeholder="Phone Number"
            {...register("phoneNumber")}
          /> */}
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
