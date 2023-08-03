import React from "react";

import tw, { styled } from "twin.macro";

const Container = styled.div(() => [tw`bg-11 dark:bg-[#141625]`]);

export const AppBackground = ({ children }: { children: React.ReactNode }) => (
  <Container>{children}</Container>
);
