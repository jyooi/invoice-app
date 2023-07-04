"use client";
import { type CalendarState } from "@react-stately/calendar";
import { type CalendarDate } from "@internationalized/date";
import { useRef } from "react";
import { useCalendarCell, useFocusRing, mergeProps } from "react-aria";
import tw, { styled } from "twin.macro";
type PropType = {
  date: CalendarDate;
  state: CalendarState;
};

const TableCell = styled.td(({ isFocus }: { isFocus: boolean }) => [
  isFocus ? tw`z-10` : tw`z-0`,
  tw`relative py-0.5`,
]);

const FormattedDateContainer = styled.div(
  ({
    isSelected,
    isInvalid,
    isDisabled,
  }: {
    isSelected: boolean;
    isInvalid: boolean;
    isDisabled: boolean;
  }) => [
    tw`h-10 w-10 outline-none`,
    isSelected && (isInvalid ? tw`bg-08` : tw`text-02 hover:text-white`),
    isDisabled && tw`appearance-none`,
  ]
);

const FormattedDate = styled.div(
  ({
    isDisabled,
    isInvalid,
    isSelected,
    isFocusVisible,
  }: {
    isDisabled: boolean;
    isInvalid: boolean;
    isSelected: boolean;
    isFocusVisible: boolean;
  }) => [
    tw`flex h-full w-full items-center justify-center rounded-full text-sm font-bold `,
    isDisabled && !isInvalid && tw`text-gray-400 `,
    isFocusVisible && tw`group-focus:z-20 ring-2 ring-violet-600 ring-offset-2`,
    isSelected && !isDisabled && isInvalid
      ? tw`hover:bg-red-400`
      : tw`hover:bg-01`,
    !isSelected && !isDisabled && tw`hover:bg-02 hover:text-white`,
  ]
);
export function CalendarCell({ state, date }: PropType) {
  const ref = useRef(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
    isInvalid,
  } = useCalendarCell({ date }, state, ref);

  // The start and end date of the selected range will have
  // an emphasized appearance.

  // We add rounded corners on the left for the first day of the month,
  // the first day of each week, and the start date of the selection.
  // We add rounded corners on the right for the last day of the month,
  // the last day of each week, and the end date of the selection.

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <TableCell {...cellProps} isFocus={isFocusVisible}>
      <FormattedDateContainer
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={`group`}
        isSelected={isSelected}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
      >
        <FormattedDate
          className={`group`}
          isFocusVisible={isFocusVisible}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          isSelected={isSelected}
        >
          {formattedDate}
        </FormattedDate>
      </FormattedDateContainer>
    </TableCell>
  );
}
