"use client";

import tw, { styled, css } from "twin.macro";
import { Button } from "~/components/Button";

const Container = styled.div(() => [
  tw`bg-blue-50 dark:bg-03 w-screen p-[24px]`,
  tw`desktop:(hidden) tablet:(hidden) flex justify-evenly sticky bottom-0 `,

  css`
    box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
  `,
]);

const MobileStickyActionBar = () => {
  return (
    <Container>
      <Button variant="secondary" label="Edit" onClick={() => null} />
      <Button variant="alert" label="Delete" onClick={() => null} />
      <Button variant="primary" label="Mark as Paid" onClick={() => null} />
    </Container>
  );
};

export default MobileStickyActionBar;
