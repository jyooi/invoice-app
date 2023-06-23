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

export const DatePicker = (
  props: DatePickerStateOptions<DateValue> | AriaDatePickerProps<DateValue>
) => {
  const state = useDatePickerState({
    ...props,
    shouldCloseOnSelect: false,
  });
  const ref = useRef(null);
  const {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref);

  return (
    <div tw="relative inline-flex flex-col text-left">
      <span {...labelProps} tw="text-sm text-gray-800">
        {props.label}
      </span>
      <div {...groupProps} ref={ref} tw="flex">
        <div
          className="group"
          tw="relative flex items-center rounded-l-md border border-gray-300 bg-white p-1 pr-10 transition-colors group-focus-within:border-violet-600 group-hover:border-gray-400 group-focus-within:group-hover:border-violet-600"
        >
          <DateField {...fieldProps} />
          {state.validationState === "invalid" && (
            <>╳</>
            // <ExclamationIcon className="absolute right-1 h-6 w-6 text-red-500" />
          )}
        </div>
        <FieldButton buttonProps={buttonProps} isPressed={state.isOpen}>
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
