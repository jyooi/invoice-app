import React from "react";

import tw, { styled } from "twin.macro";

const Container = styled.div(() => [
  tw`desktop:(h-full bg-11 dark:bg-[#141625])`,
  tw`tablet:(h-full bg-11 dark:bg-[#141625])`,
  tw`bg-11 dark:bg-[#141625]`,
]);

const AppBackground = ({ children }: { children: React.ReactNode }) => (
  <Container>{children}</Container>
);

export default AppBackground;
