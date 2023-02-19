import darkMode from "@/atoms/darkModeAtom";
import { AuthProvider } from "@/hooks/useAuth";
import { PostContext, PostProvider } from "@/hooks/usePost";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { RecoilRoot, useRecoilState } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <PostProvider>
          <Component {...pageProps} />
        </PostProvider>
      </AuthProvider>
    </RecoilRoot>
  );
}
