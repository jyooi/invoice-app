"use client";
import { useDialog } from "react-aria";
import React from "react";

type PropType = {
  children: React.ReactNode;
};

export function Dialog({ children, ...props }: PropType) {
  const ref = React.useRef<HTMLInputElement>(null);
  const { dialogProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref}>
      {children}
    </div>
  );
}
