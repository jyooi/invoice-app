"use client";

import React, { useRef } from "react";
import { type AriaButtonProps, useButton } from "react-aria";
import tw, { styled } from "twin.macro";

const Button = styled.button(() => [
  tw`
  -ml-px rounded-r-md border px-2 outline-none  group-focus-within:border-violet-600 group-focus-within:group-hover:border-violet-600
`,
]);

type PropType = {
  buttonProps: AriaButtonProps<"button">;
  isPressed: boolean;
  children: React.ReactNode;
  tw: string;
};

export function FieldButton(props: PropType) {
  const ref = useRef<HTMLButtonElement>(null);

  const { buttonProps } = useButton(props.buttonProps, ref);
  return (
    <Button className="group" {...buttonProps} ref={ref} tw="border-0">
      {props.children}
    </Button>
  );
}
