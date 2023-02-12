import useAuth from "@/hooks/useAuth";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiLock } from "react-icons/ci";
import logo from "../public/Instagram_logo.png";

interface Input {
  email: string;
}
export default function Reset() {
  const { resetPassword, user } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = ({ email }) => {
    resetPassword(email);
  };

  if (user !== null) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Reset Password</title>
        <meta name="description" content="Reset password" />
      </Head>
      <header className="flex justify-center bg-white">
        <Image className="max-w-[200px]" src={logo} alt="Insta logo" />
      </header>
      <main className="bg-gray-100 min-h-screen pt-[10vh] pb-10">
        <div className="max-w-[500px] w-full p-5 mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-5 text-center md:px-10 border space-y-5 rounded bg-white flex flex-col items-center"
          >
            <CiLock className="w-[15vw] h-[15vw] min-w-[90px] min-h-[90px] max-w-[120px] max-h-[120px] rounded-full border border-black p-5" />
            <h1 className="font-semibold text-xl">Trouble Logging In?</h1>
            <p>
              Enter your email and we'll send you a link to get back into your
              account
            </p>
            <input
              required
              className="basic-input w-full"
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />
            <button type="submit" className="btn-primary">
              Send Login Link
            </button>
          </form>
          <button
            onClick={() => router.push("/login")}
            className="w-full bg-gray-200 font-semibold py-3 hover:text-gray-500"
          >
            Back To Login
          </button>
        </div>
      </main>
    </>
  );
}
