"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import tw, { styled, css } from "twin.macro";
import BrandLogo from "../../image/Icons/brand_logo.svg";
import AvatarSampleImageSvg from "../../image/avatar_sample_image.svg";
import MoonIconsSvg from "../../image/Icons/moon_icon.svg";
import { useTheme } from "next-themes";
// Write me a nav bar that able to stick to the right of the page when in on desktop size

// and able to be a hamburger menu when on mobile size

const Container = styled.nav(() => [
  tw`h-20 bg-14 desktop:(flex justify-between items-center flex-col sticky h-full top-0 float-left flex-nowrap) tablet:(flex justify-between items-center flex-row flex-nowrap) mobile:([height:72px] flex justify-between items-center flex-row flex-nowrap) `, // responsive query
]);

const RightNavItemContainer = styled.div(() => [
  tw`desktop:(flex items-center flex-col justify-evenly) tablet:(flex items-center flex-row justify-evenly) mobile:(flex items-center flex-row justify-evenly)`,
  css`
    width: 100%;
    max-width: 105px;
    height: 100%;
    max-height: 105px;
  `,
]);

const RightNavItem = styled.div(() => []);

const RoundAvatar = styled(Image)(() => [
  tw`desktop:(w-10 h-10 rounded-full) desktop:(w-8 h-8 rounded-full) desktop:(w-8 h-8 rounded-full)`,
]);

const BorderLine = styled.div(() => [
  tw`bg-15 desktop:([height:1px] w-full) tablet:([width:1px] h-full) mobile:([width:1px] h-full)`,
]);

// write me a avatar on tailwindcss

// const  = styled.div(() => [])

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Container>
      <Link href="/">
        <Image
          src={BrandLogo as string}
          alt={"brand_logo"}
          tw="mobile:([height:72px] w-full)"
        />
      </Link>

      <RightNavItemContainer>
        <RightNavItem
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Image src={MoonIconsSvg as string} alt="moon-icon" />
        </RightNavItem>
        <BorderLine />
        <RoundAvatar
          src={AvatarSampleImageSvg as string}
          alt="avatar sample Image"
        />
      </RightNavItemContainer>
    </Container>
  );
};
