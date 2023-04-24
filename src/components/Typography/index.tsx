import tw, { styled, css } from "twin.macro";

export const HeadingL = styled.h3(() => [
  tw`text-2xl font-bold text-08 dark:text-white`,
  css`
    line-height: 33px;
    letter-spacing: -1.125px;
  `,
]);

export const HeadingM = styled.h4(() => [
  tw`text-xl font-bold text-08 dark:text-white`,
  css`
    line-height: 22px;
    letter-spacing: -0.75px;
  `,
]);

export const HeadingS = styled.h5(({ variant }: { variant?: boolean }) => [
  tw`text-lg font-bold text-08 dark:text-white`,
  css`
    letter-spacing: -0.25px;
  `,
  variant
    ? css`
        line-height: 15px;
      `
    : css`
        line-height: 24px;
      `,
]);

export const Body = styled.p(({ variant }: { variant?: boolean }) => [
  tw`text-base font-normal text-08 dark:text-white`,

  variant
    ? css`
        line-height: 15px;
        letter-spacing: -0.25px;
      `
    : css`
        line-height: 18px;
        letter-spacing: -0.1px;
      `,
]);
