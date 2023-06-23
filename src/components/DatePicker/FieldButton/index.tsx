"use client";

import React, { useRef } from "react";
import { type AriaButtonProps, useButton } from "react-aria";
import tw, { styled } from "twin.macro";

const Button = styled.button(({ isPressed }: { isPressed: boolean }) => [
  tw`
  -ml-px rounded-r-md border px-2 outline-none transition-colors group-focus-within:border-violet-600 group-focus-within:group-hover:border-violet-600
`,

  isPressed || isPressed
    ? tw`border-gray-400 bg-gray-200`
    : tw`border-gray-300 bg-gray-50 group-hover:border-gray-400`,
]);

type PropType = {
  buttonProps: AriaButtonProps<"button">;
  isPressed: boolean;
  children: React.ReactNode;
};

export function FieldButton(props: PropType) {
  const ref = useRef<HTMLButtonElement>(null);

  const { buttonProps } = useButton(props.buttonProps, ref);
  return (
    <Button
      className="group"
      {...buttonProps}
      ref={ref}
      isPressed={props.isPressed}
    >
      {props.children}
    </Button>
  );
}
