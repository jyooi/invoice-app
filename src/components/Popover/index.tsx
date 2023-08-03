"use client";

import { Popover } from "@headlessui/react";
import ChevronDownSvg from "../../image/Icons/purple_chevron_down_icon.svg";
import ChevronUpSvg from "../../image/Icons/purple_chevron_up_icon.svg";
import Image from "next/image";
import tw, { styled, css } from "twin.macro";

const PopOverButton = styled(Popover.Button)(() => [
  tw`flex items-center gap-[14px]`,

  css`
    font-size: 15px;
    font-weight: 700;
    line-height: 15px;
    letter-spacing: -0.25px;
    outline: none;
  `,
]);

const PopOverPanel = styled(Popover.Panel)(() => [
  [
    tw`bg-white rounded-lg dark:bg-04 inline-block mt-[22px]`,
    css`
      box-shadow: 0px 10px 20px 0px rgba(72, 84, 159, 0.25);
      position: absolute;
      left: -40px;
    `,
  ],
]);

type PropType = { label: string; children: React.ReactNode };

export function PopOver({ label, children }: PropType) {
  return (
    <Popover tw="relative">
      {({ open }) => (
        /* Use the `open` state to conditionally change the direction of the chevron icon. */
        <>
          <PopOverButton>
            {label}
            <Image
              src={open ? (ChevronUpSvg as string) : (ChevronDownSvg as string)}
              alt="chevronDown"
            />
          </PopOverButton>
          <PopOverPanel>{children}</PopOverPanel>
        </>
      )}
    </Popover>
  );
}
