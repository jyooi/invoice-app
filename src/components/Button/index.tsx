"use client";

import tw, { styled, css } from "twin.macro";
import Image from "next/image";
import AddIconSvg from "../../image/Icons/add_icon.svg";
import { Spinner } from "../Spinner";

type ButtonProps = {
  variant: "primary" | "secondary" | "tertiary" | "alert" | "long";
  iconBefore?: React.ReactNode;
  addIcon?: boolean;
  label: string;
  fullWidth?: boolean;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
};

const Label = styled.span(() => [
  tw`text-lg font-bold`,
  css`
    letter-spacing: -0.25px;
  `,
  css`
    line-height: 24px;
  `,
]);

const ButtonGroup = styled.button(
  ({
    variant,
    fullWidth,
  }: {
    variant: ButtonProps["variant"];
    fullWidth: ButtonProps["fullWidth"];
  }) => [
    variant === "primary" && tw`bg-01 hover:bg-02 text-white`,

    variant === "secondary" &&
      tw`text-07 bg-13 hover:bg-05 dark:bg-04 dark:text-05 dark:hover:bg-white`,

    variant === "tertiary" &&
      tw`text-06 bg-14 hover:bg-08 dark:text-05 dark:hover:bg-03`,

    variant === "alert" && tw`text-white bg-09 hover:bg-10`,

    variant === "long" && tw`text-07 bg-13 hover:bg-05`,

    fullWidth && tw`w-full`,

    tw`h-12 rounded-5xl flex items-center justify-center p-2`,
  ]
);

export const Button = ({
  iconBefore,
  label,
  addIcon,
  variant = "primary",
  onClick,
  fullWidth,
  type = "button",
  isLoading,
}: ButtonProps) => {
  return (
    <ButtonGroup
      variant={variant}
      onClick={onClick}
      fullWidth={fullWidth}
      type={type}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {iconBefore ? (
            <>{iconBefore}</>
          ) : addIcon ? (
            <Image src={AddIconSvg as string} alt="add-icon" />
          ) : null}
          <Label tw="p-4">{label}</Label>
        </>
      )}
    </ButtonGroup>
  );
};
