import tw, { styled, css } from "twin.macro";

export const Label = styled.label(
  () => [tw` text-07 text-base dark:text-05`],
  css`
    letter-spacing: -0.1px;
    line-height: 15px;
    padding-bottom: 9px;
  `
);
