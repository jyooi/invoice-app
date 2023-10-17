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
import { SSRProvider } from "react-aria";
import { FormProvider, useForm } from "react-hook-form";

const MyApp: AppType<{
  session: Session | null;
  emotionCache?: EmotionCache;
}> = ({
  Component,
  pageProps: { session, emotionCache = clientSideEmotionCache, ...pageProps },
}) => {
  const methods = useForm();
  return (
    <SSRProvider>
      <CacheProvider value={emotionCache}>
        <SessionProvider session={session}>
          <GlobalStyles />
          <ThemeProvider attribute="class">
            <AppBackground>
              <Layout>
                <FormProvider {...methods}>
                  <Component {...pageProps} />
                </FormProvider>
              </Layout>
            </AppBackground>
          </ThemeProvider>
        </SessionProvider>
      </CacheProvider>
    </SSRProvider>
  );
};

export default api.withTRPC(MyApp);
