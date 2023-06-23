"use client";
import { useRef } from "react";
import tw, { styled } from "twin.macro";
import { useCalendarState } from "react-stately";
import {
  useCalendar,
  useLocale,
  useButton,
  useFocusRing,
  mergeProps,
  type CalendarProps,
} from "react-aria";

import { createCalendar } from "@internationalized/date";
import { CalendarGrid } from "../CalendarGrid";
import { HeadingS } from "../../Typography";
import { type DateValue } from "@react-types/calendar";

const CalendarContainer = styled.div(() => [tw`flex items-center pb-4`]);

const Button = styled.button(
  ({
    isDisabled,
    isFocusVisible,
  }: {
    isDisabled: boolean;
    isFocusVisible: boolean;
    children: React.ReactNode;
  }) => [
    tw`rounded-full p-2 outline-none`,
    isDisabled && tw`text-gray-400`,
    !isDisabled && tw`hover:bg-violet-100 active:bg-violet-200`,
    isFocusVisible && tw`ring-2 ring-purple-600 ring-offset-2`,
  ]
);

export function Calendar(props: CalendarProps<DateValue>) {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state);

  return (
    <div {...calendarProps} ref={ref}>
      <CalendarContainer>
        <CalendarButton {...prevButtonProps}>
          {/* <ChevronLeftIcon w={6} h={6} /> */}
        </CalendarButton>
        <HeadingS>{title}</HeadingS>
        <CalendarButton {...nextButtonProps}>
          {/* <ChevronRightIcon w={6} h={6} /> */}
        </CalendarButton>
      </CalendarContainer>
      <CalendarGrid state={state} />
    </div>
  );
}

type CalendarButtonPropType = {
  isDisabled?: boolean;
  children: React.ReactNode;
};

function CalendarButton(props: CalendarButtonPropType) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <Button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      isFocusVisible={isFocusVisible}
      disabled={props.isDisabled ?? false}
      isDisabled={props.isDisabled ?? false}
    >
      {props.children}
    </Button>
  );
}
