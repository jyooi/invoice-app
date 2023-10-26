"use client";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import ChevronDownSvgIcon from "../../image/Icons/purple_chevron_down_icon.svg";
import tw, { styled, css } from "twin.macro";
import { HeadingS } from "../Typography";
import { Label } from "../Label";

const ListButton = styled(Listbox.Button)(() => [
  tw`relative w-full cursor-default pl-5 text-left border border-05 rounded border border-05 hover:border-01 h-12`,
  tw`dark:border-04 dark:bg-03 text-white`,
  css`
    padding-top: 18px;
    padding-bottom: 15px;
  `,
]);

const ListOptions = styled(Listbox.Options)(() => [
  tw`absolute mt-6 max-h-48 w-full overflow-hidden rounded-md text-base shadow-lg ring-1 ring-black ring-opacity-5  hover:overflow-y-auto`,
  css`
    /* width */
    ::-webkit-scrollbar {
      width: 2px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #7c5dfa;
    }
  `,
]);

const ListBoxContainer = styled.div(() => [tw`w-full h-12`]);

const ListOption = styled(Listbox.Option)(() => [
  tw`h-12 z-[113]`,
  tw`relative cursor-default select-none bg-white`,
  tw`border-b dark:border-b-03 dark:bg-03`,
]);

const SelectedLabel = styled(HeadingS)(() => [
  tw`h-full w-full py-2 pl-5 pr-4 flex items-center`,
  tw`dark:text-05 hover:text-01 dark:hover:text-01`,
]);

type PropType = {
  setSelected: (value: string) => void;
  selected: string | undefined;
  options?: Option[];
  label?: string;
};

export type Option = {
  key: string;
  value: unknown;
};

export function Select({ options, setSelected, selected, label }: PropType) {
  return (
    <ListBoxContainer>
      <Label>{label}</Label>
      <Listbox value={selected} onChange={setSelected}>
        <div tw="relative mt-1">
          <ListButton>
            <HeadingS variant>
              {options?.find((option) => option.value == selected)?.key}
            </HeadingS>
            <span tw="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <Image
                src={ChevronDownSvgIcon as string}
                alt="chevron_down_icon"
              />
            </span>
          </ListButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListOptions>
              {options?.map(({ key, value }) => (
                <ListOption key={key} value={value}>
                  <SelectedLabel variant>{key}</SelectedLabel>
                </ListOption>
              ))}
            </ListOptions>
          </Transition>
        </div>
      </Listbox>
    </ListBoxContainer>
  );
}
