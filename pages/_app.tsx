import { AuthProvider } from "@/hooks/useAuth";
import { PostProvider } from "@/hooks/usePost";
import { PostInteractionsProvider } from "@/hooks/usePostInteractions";
import { WidthProvider } from "@/hooks/useWidth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot, useRecoilState } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <WidthProvider>
        <AuthProvider>
          <PostInteractionsProvider>
            <PostProvider>
              <Component {...pageProps} />
            </PostProvider>
          </PostInteractionsProvider>
        </AuthProvider>
      </WidthProvider>
    </RecoilRoot>
  );
}
