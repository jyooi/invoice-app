"use client";
import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "~/components/Button";
const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Always do navigations after the first render
    sessionData?.user?.name &&
      void router.push("/invoice", undefined, { shallow: true });
  }, [sessionData, router]);

  return (
    <>
      <Head>
        <title tw="text-4xl">This is an demo t3 stack</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
        {/* Umami tracking */}
        <script
          async
          src="https://analytics.eu.umami.is/script.js"
          data-website-id="0991677d-5fd9-4857-b564-bb98d1761972"
        />
      </Head>
      <main tw="flex h-screen flex-col items-center justify-center  from-[#2e026d] to-[#15162c]">
        <AuthShowcase />
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData, status } = useSession();

  return (
    <div tw="flex flex-col items-center justify-center gap-4">
      <p tw="text-center text-2xl ">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <Button
        variant="primary"
        isLoading={status === "loading" ? true : false}
        label={sessionData ? "Sign out" : "Sign in"}
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      />
    </div>
  );
};
