/* eslint-disable @typescript-eslint/unbound-method */
import { type MutableRefObject, useRef } from "react";
import { usePopover, Overlay, DismissButton } from "@react-aria/overlays";
import { type DatePickerState } from "react-stately";
import { type Placement } from "react-aria";
import tw, { styled, css } from "twin.macro";
type PropType = {
  state: DatePickerState;
  children: React.ReactNode;
  triggerRef: MutableRefObject<null>;
  placement: Placement;
};

const Container = styled.div(() => [
  tw`absolute top-full z-50 mt-2 bg-white `,
  tw`dark:bg-04`,

  css`
    box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25);
    border-radius: 8px;
    padding: 26px 18.5px 31px 18.5px;
  `,
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
