/* eslint-disable @typescript-eslint/unbound-method */
import { type MutableRefObject, useRef } from "react";
import { usePopover, Overlay, DismissButton } from "@react-aria/overlays";
import { type DatePickerState } from "react-stately";
import { type Placement } from "react-aria";
import tw, { styled } from "twin.macro";
type PropType = {
  state: DatePickerState;
  children: React.ReactNode;
  triggerRef: MutableRefObject<null>;
  placement: Placement;
};

const Container = styled.div(() => [
  tw`absolute top-full z-50 mt-2 rounded-md border border-gray-300 bg-white p-8 shadow-lg bg-red-50`,
]);

export function Popover(props: PropType) {
  const ref = useRef(null);
  const { state, children } = props;

  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef: ref,
    },
    state
  );

  // Add a hidden <DismissButton> component at the end of the popover
  // to allow screen reader users to dismiss the popup easily.
  return (
    <Overlay>
      <div {...underlayProps} tw="fixed inset-0" />
      <Container {...popoverProps} ref={ref}>
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </Container>
    </Overlay>
  );
}
