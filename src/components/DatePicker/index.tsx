"use client";
import { useRef } from "react";
import { type DatePickerStateOptions, useDatePickerState } from "react-stately";
import {
  type AriaDatePickerProps,
  type DateValue,
  useDatePicker,
} from "react-aria";
import { Calendar } from "./Calendar";
import { Popover } from "./PopOver";
import { Dialog } from "../Dialog";
import { DateField } from "./DateField";
import calendarIcon from "../../image/Icons/calendar_icon.svg";
import Image from "next/image";
import { FieldButton } from "./FieldButton";
import { Label } from "../Label";

export const DatePicker = (
  props: DatePickerStateOptions<DateValue> | AriaDatePickerProps<DateValue>
) => {
  const state = useDatePickerState({
    ...props,
    shouldCloseOnSelect: false,
  });
  const ref = useRef(null);
  const { groupProps, fieldProps, buttonProps, dialogProps, calendarProps } =
    useDatePicker(props, state, ref);

  return (
    <div tw="relative inline-flex flex-col text-left w-full mt-1">
      <Label>{props.label}</Label>
      <div
        {...groupProps}
        ref={ref}
        tw="flex justify-between relative flex h-12 w-full items-center rounded border bg-white dark:(bg-03 border-04) transition-colors group-focus-within:border-violet-600 group-hover:border-gray-400 pl-5 
          font-bold border-05 hover:border-01 group-focus-within:group-hover:border-violet-600"
      >
        <div className="group" tw="">
          <DateField {...fieldProps} />
          {state.validationState === "invalid" && (
            <>╳</>
            // <ExclamationIcon className="absolute right-1 h-6 w-6 text-red-500" />
          )}
        </div>
        <FieldButton
          buttonProps={buttonProps}
          isPressed={state.isOpen}
          tw="border-0 outline-none"
        >
          <Image src={calendarIcon as string} alt="calendar icon" />
        </FieldButton>
      </div>
      {state.isOpen && (
        <Popover triggerRef={ref} state={state} placement="bottom start">
          <Dialog {...dialogProps}>
            <Calendar {...calendarProps} />
          </Dialog>
        </Popover>
      )}
    </div>
  );
};
