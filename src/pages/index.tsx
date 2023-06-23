"use client";
import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useTheme } from "next-themes";
import { today, getLocalTimeZone } from "@internationalized/date";
import { DatePicker } from "~/components/DatePicker";
const Home: NextPage = () => {
  const { theme, setTheme } = useTheme();
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title tw="text-4xl">Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main tw="flex min-h-screen flex-col items-center justify-center  from-[#2e026d] to-[#15162c]">
        <div>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            toggle
          </button>

          <div tw="flex flex-col items-center gap-2">
            <p tw="text-2xl ">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
          <br />
          <br />
          <br />
        </div>
        {/* <DatePicker label="Trip dates" minValue={today(getLocalTimeZone())} /> */}
        {/* <Select options={[{ id: "1", name: "hello world" }]} value={""} /> */}
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div tw="flex flex-col items-center justify-center gap-4">
      <p tw="text-center text-2xl ">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        tw="rounded-full bg-white/10 px-10 py-3 font-semibold  no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
