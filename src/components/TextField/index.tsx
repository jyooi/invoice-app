"use client";
import tw, { styled, css } from "twin.macro";
import { Label } from "../Label";
import { type HTMLInputTypeAttribute } from "react";

const TextInput = styled.input(({ error }: { error?: boolean }) => [
  tw`border-05 border rounded h-12 w-full`,
  tw`focus-visible:outline-02 focus-visible:border-0`,
  tw`dark:bg-03 dark:border-04 focus-visible:dark:outline-0`, // Dark config
  tw`text-lg text-08 font-bold dark:text-white outline-0`, // textfield font
  css`
    :focus-visible {
      outline-style: solid;
    }

    line-height: 15px;
    letter-spacing: -0.25px;
  `,
  error && tw`border-red-500`,
]);

const TextFieldGroup = styled.div(() => [tw`flex flex-col caret-01 w-full`]);

type PropType = {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute;
  error?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any;
};

export const TextField = (props: PropType) => {
  return (
    <TextFieldGroup>
      {props.label && <Label>{props.label}</Label>}
      <TextInput error={props.error} onChange={props.onChange} {...props} />
    </TextFieldGroup>
  );
};
