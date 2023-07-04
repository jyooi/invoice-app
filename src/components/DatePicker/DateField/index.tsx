"use client";

import { useRef } from "react";
import { type DateSegment } from "react-stately";
import { type DateFieldState, useDateFieldState } from "react-stately";
import {
  type AriaDatePickerProps,
  type DateValue,
  useDateField,
  useDateSegment,
  useLocale,
} from "react-aria";
import { createCalendar } from "@internationalized/date";
import tw, { styled } from "twin.macro";

export function DateField(props: AriaDatePickerProps<DateValue>) {
  const { locale } = useLocale();

  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);
  const { fieldProps } = useDateField(props, state, ref);

  return (
    <div {...fieldProps} ref={ref} tw="flex">
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
}

const DateFieldContainer = styled.div(({ editable }: { editable: boolean }) => [
  tw`box-content rounded-sm px-0.5 text-right tabular-nums outline-none focus:bg-violet-600 focus:text-white  `,
  editable ? "text-gray-500" : "text-gray-800",
]);

function DateSegment({
  segment,
  state,
}: {
  segment: DateSegment;
  state: DateFieldState;
}) {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <DateFieldContainer
      className="group"
      {...segmentProps}
      ref={ref}
      editable={!segment.isEditable}
      style={{
        ...segmentProps.style,
      }}
    >
      <span
        aria-hidden="true"
        tw="block w-full text-center  text-gray-500 group-focus:text-white "
        style={{
          visibility: segment.isPlaceholder ? undefined : "hidden",
          height: segment.isPlaceholder ? undefined : 0,
          pointerEvents: "none",
        }}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? "" : segment.text}
    </DateFieldContainer>
  );
}
