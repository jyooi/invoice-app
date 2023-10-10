import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import GlobalStyles from "../styles/GlobalStyles";
import { api } from "~/utils/api";
import "../styles/fonts/league/league.css";
import { CacheProvider, type EmotionCache } from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";
import Layout from "../components/Layout";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

import { ThemeProvider } from "next-themes";
import AppBackground from "../components/AppBackground";

const MyApp: AppType<{
  session: Session | null;
  emotionCache?: EmotionCache;
}> = ({
  Component,
  pageProps: { session, emotionCache = clientSideEmotionCache, ...pageProps },
}) => {
  return (
    <>
      <CacheProvider value={emotionCache}>
        <SessionProvider session={session}>
          <GlobalStyles />
          <ThemeProvider attribute="class">
            <AppBackground>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AppBackground>
          </ThemeProvider>
        </SessionProvider>
      </CacheProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
