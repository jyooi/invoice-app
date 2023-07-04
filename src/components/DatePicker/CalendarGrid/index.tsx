"use client";
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useCalendarGrid, useLocale } from "react-aria";
import { getWeeksInMonth } from "@internationalized/date";
import { CalendarCell } from "../CalendarCell";
import { type CalendarState } from "react-stately";

type PropType = {
  state: CalendarState;
};

export function CalendarGrid({ state, ...props }: PropType) {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps} cellPadding="0" tw="flex-1">
      <thead {...headerProps} tw="text-gray-500">
        <tr>
          {weekDays.map((day, index) => (
            <th tw="text-center" key={index}></th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
