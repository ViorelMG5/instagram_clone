import Image from "next/image";
import { AiFillFacebook } from "react-icons/ai";
import phoneFrame from "../public/images/loginPhone.png";
import logo from "../public/Instagram_logo.png";
import googleIcon from "../public/images/google.png";
import microsoftIcon from "../public/images/microsoft.png";
import Link from "next/link";
import windowWidth from "@/hooks/useWidth";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { signIn, signInWithFacebook, signUp, user, loading } = useAuth();
  const [login, setLogin] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) =>
    login ? await signIn(email, password) : await signUp(email, password);

  if (user !== null && user.displayName !== null) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Welcome to Instagram</title>
        <meta name="description" content="Login to instagram clone" />
      </Head>
      <main>
        <div className="bg-gray-100 min-h-screen pt-[10vh] pb-10">
          <div className="flex items-center justify-center">
            {windowWidth() > 991 && (
              <Image
                className="object-contain min-h-[60vh] min-w-[30vw]"
                src={phoneFrame}
                alt="main login image"
                width={400}
              />
            )}
            <div className="max-w-[500px] w-full p-5">
              <div className="p-5 md:px-10 border rounded bg-white ">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className=" flex flex-col items-center">
                    <Image
                      src={logo}
                      alt="instagram logo"
                      width={200}
                      className="my-5"
                    />
                    <div className="space-y-3 flex flex-col w-full">
                      <input
                        className="basic-input"
                        type="email"
                        required
                        placeholder="Email"
                        {...register("email")}
                      />
                      <input
                        required
                        className="basic-input"
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                      />
                      <button
                        type="submit"
                        onClick={() => setLogin(true)}
                        className="btn-primary"
                      >
                        Log in
                      </button>
                    </div>
                    <button
                      onClick={() => setLogin(false)}
                      type="submit"
                      className="text-[15px] mt-5 "
                    >
                      Don't have an account?{" "}
                      <span className="font-semibold text-[#42A9E4]">
                        Sign up.
                      </span>
                    </button>
                  </div>
                </form>
                <div className="flex flex-col items-center">
                  <div className="my-4 flex items-center gap-2 w-full">
                    <span className="divider"></span>
                    OR
                    <span className="divider"></span>
                  </div>
                  {windowWidth() > 767 ? (
                    <button
                      onClick={signInWithFacebook}
                      className="flex items-center gap-1"
                    >
                      <AiFillFacebook className="menuIcon text-blue-900" />
                      Connect with Facebook
                    </button>
                  ) : (
                    <button
                      onClick={() => alert("disabled on mobile resolution")}
                      className="flex items-center gap-1"
                    >
                      <AiFillFacebook className="menuIcon text-blue-900" />
                      Connect with Facebook
                    </button>
                  )}
                  <Link
                    href="/reset-password"
                    className="text-[13px] mt-5 text-gray-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className="w-full text-center mt-5 max-w-[500px] ">
                <span>Install the app</span>
                <div className="flex items-center justify-center gap-2 mt-5">
                  <Image
                    className=" w-[45%] sm:w-[30%] h-[50px] cursor-pointer"
                    height={50}
                    src={googleIcon}
                    alt="download instagram from google play"
                  />
                  <Image
                    className="w-[45%] sm:w-[30%] h-[50px] cursor-pointer "
                    src={microsoftIcon}
                    alt="download instagram from microsoft store"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-5 flex-wrap mt-10 px-5 lg:px-20 justify-center ">
            <Link href="#">Meta</Link>
            <Link href="#">About</Link>
            <Link href="#">Jobs</Link>
            <Link href="#">Help</Link>
            <Link href="#">API</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms and conditions</Link>
            <Link href="#">Top accounts</Link>
            <Link href="#">Location</Link>
            <Link href="#">Instagram Lite</Link>
            <Link href="#">Contracts</Link>
            <Link href="#">Directory </Link>
            <Link href="#">Language </Link>
          </div>
          {loading && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-[#ffffff99]">
              <Loader />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
