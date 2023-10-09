"use client";
import tw, { styled, css } from "twin.macro";
import { Label } from "../Label";

const TextInput = styled.input(() => [
  tw`border-05 border rounded h-12 w-full`,
  tw`focus-visible:outline-02 focus-visible:border-0`,
  tw`dark:bg-03 dark:border-04 focus-visible:dark:outline-0`, // Dark config
  tw`text-lg text-08 font-bold dark:text-white`, // textfield font
  css`
    :focus-visible {
      outline-style: solid;
    }

    line-height: 15px;
    letter-spacing: -0.25px;
  `,
]);

const TextFieldGroup = styled.div(() => [
  tw`flex flex-col caret-01 mb-[25px] w-full`,
]);

type PropType = {
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export const TextField = (props: PropType) => {
  return (
    <TextFieldGroup>
      <Label>{props.label}</Label>
      <TextInput onChange={props.onChange} value={props.value} {...props} />
    </TextFieldGroup>
  );
};
