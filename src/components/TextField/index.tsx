"use client";
import tw, { styled, css } from "twin.macro";
import { Label } from "../Label";
import { type HTMLInputTypeAttribute } from "react";
import { type FieldError } from "react-hook-form";

const TextInput = styled.input(
  ({ errorOutline }: { errorOutline?: boolean }) => [
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
    errorOutline && tw`border-red-500`,
  ]
);

const ErrorMessage = styled.div(() => [
  tw`relative text-red-500 text-[10px] font-bold h-5`,
]);

const TextFieldGroup = styled.span(() => [tw`flex flex-col caret-01 w-full`]);

type PropType = {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute;
  error?: FieldError | undefined;
  ref?: null;
};

export const TextField = (props: PropType) => {
  return (
    <TextFieldGroup>
      {props.label && <Label>{props.label} </Label>}
      <TextInput
        errorOutline={Boolean(props.error?.type)}
        onChange={props.onChange}
        {...props}
      />
      <ErrorMessage>
        {props.error?.type === "required" && "Required"}
      </ErrorMessage>
    </TextFieldGroup>
  );
};
