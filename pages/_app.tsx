import { AuthProvider } from "@/hooks/useAuth";
import { PostProvider } from "@/hooks/usePost";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
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
