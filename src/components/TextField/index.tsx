"use client";
import tw, { styled, css } from "twin.macro";

const TextInput = styled.input(() => [
  tw`border-05 border rounded h-12 pl-5 pr-1`,
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

const Label = styled.label(
  () => [tw` text-07 text-base dark:text-05`],
  css`
    letter-spacing: -0.1px;
    line-height: 15px;
    padding-bottom: 9px;
  `
);

const TextFieldGroup = styled.div(() => [tw`flex flex-col caret-01`]);

type PropType = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export const TextField = ({ label, onChange, value }: PropType) => {
  return (
    <TextFieldGroup>
      <Label>{label}</Label>
      <TextInput onChange={onChange} value={value} />
    </TextFieldGroup>
  );
};
