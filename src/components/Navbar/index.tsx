"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import tw, { styled } from "twin.macro";
import BrandLogo from "../../image/Icons/brand_logo.svg";
import AvatarSampleImageSvg from "../../image/avatar_sample_image.svg";
import MoonIconsSvg from "../../image/Icons/moon_icon.svg";
import { useTheme } from "next-themes";
import { signIn, useSession, signOut } from "next-auth/react";
import { Button } from "../Button";
// Write me a nav bar that able to stick to the right of the page when in on desktop size

// and able to be a hamburger menu when on mobile size

const Container = styled.nav(() => [
  tw`bg-14 desktop:(h-20 flex justify-between items-center flex-col sticky h-screen top-0 float-left flex-nowrap rounded-tr-[20px] rounded-br-[20px]) tablet:(h-20) flex justify-between items-center flex-row flex-nowrap`, // responsive query
  tw`z-[102]`,
]);

const RightNavItemContainer = styled.div(() => [
  tw`desktop:(flex items-center flex-col justify-evenly) flex items-center flex-row justify-evenly`,
  tw`desktop:(h-full w-full max-h-[141px]) tablet:(h-full w-full max-w-[141px]) h-full w-full max-w-[105px]`,
]);

const RightNavItem = styled.div(() => []);

const RoundAvatar = styled(Image)(() => [
  tw`desktop:(w-10 h-10 rounded-full) w-8 h-8 rounded-full`,
]);

const BorderLine = styled.div(() => [
  tw`bg-15 desktop:([height:1px] w-full) [width:1px] h-full`,
]);

export const Navbar = () => {
  const { data: sessionData } = useSession();
  const { theme, setTheme } = useTheme();

  return (
    <Container>
      <Link href="/">
        <Image
          src={BrandLogo as string}
          alt={"brand_logo"}
          tw="[height:72px] w-full desktop:(w-20 h-20) tablet:(w-20 h-20)"
        />

        {sessionData && (
          <Button
            variant="primary"
            tw="text-sm"
            label={sessionData ? "Sign out" : "Sign in"}
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          />
        )}
      </Link>

      <RightNavItemContainer>
        <RightNavItem
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Image src={MoonIconsSvg as string} alt="moon-icon" />
        </RightNavItem>
        <BorderLine />

        {sessionData && (
          <RoundAvatar
            width={32}
            height={32}
            src={
              sessionData && sessionData?.user?.image
                ? sessionData.user.image ?? ""
                : (AvatarSampleImageSvg as string)
            }
            alt="avatar sample Image"
          />
        )}
      </RightNavItemContainer>
    </Container>
  );
};
