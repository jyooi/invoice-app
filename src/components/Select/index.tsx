import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import ChevronDownSvgIcon from "../../image/Icons/purple_chevron_down_icon.svg";
import tw, { styled, css } from "twin.macro";
import { HeadingS } from "../Typography";
const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

const ListButton = styled(Listbox.Button)(() => [
  tw`relative w-full cursor-default bg-white pl-5 text-left border border-05 rounded border border-05 hover:border-01`,
  tw`dark:border-04 dark:bg-03 text-white`,
  css`
    padding-top: 18px;
    padding-bottom: 15px;
  `,
]);

const ListOptions = styled(Listbox.Options)(() => [
  tw`absolute mt-6 max-h-48 w-full overflow-hidden rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 hover:overflow-y-auto`,
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
      border-radius: 4px;
    }
  `,
]);

const ListOption = styled(Listbox.Option)(() => [
  tw`h-12 border-b border-05 `,
  tw`relative cursor-default select-none`,
  tw`dark:border-03`,
]);

const SelectedLabel = styled(HeadingS)(({ active }: { active: boolean }) => [
  active && tw`hover:text-01`,
  tw`h-full w-full py-2 pl-5 pr-4 flex items-center`,
  tw`dark:bg-03 dark:text-05`,
]);

export function Select() {
  const [selected, setSelected] = useState(people[0]);

  return (
    <div tw="fixed top-16 w-52 ">
      <Listbox value={selected} onChange={setSelected}>
        <div tw="relative mt-1">
          <ListButton tw="">
            <HeadingS variant>{selected?.name}</HeadingS>
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
              {people.map((person, personIdx) => (
                <ListOption key={personIdx} value={person}>
                  {({ active }) => (
                    <>
                      <SelectedLabel variant active={active}>
                        {person.name}
                      </SelectedLabel>
                    </>
                  )}
                </ListOption>
              ))}
            </ListOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
